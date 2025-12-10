import { renderHook, act } from '@testing-library/react'
import { useUserData, useVault, useVaults } from 'pearpass-lib-vault'

import { useRedirect } from './useRedirect'
import { useRouter } from '../../../shared/context/RouterContext'

jest.mock('pearpass-lib-vault', () => ({
  useUserData: jest.fn(),
  useVault: jest.fn(),
  useVaults: jest.fn()
}))
jest.mock('../../../shared/context/RouterContext', () => ({
  useRouter: jest.fn()
}))
jest.mock('../../../shared/context/ModalContext', () => ({
  useModal: jest.fn(() => ({
    setModal: jest.fn(),
    closeModal: jest.fn()
  }))
}))

// Mock the native messaging client used by the hook
jest.mock('../../../shared/client', () => ({
  client: {
    checkAndHandleAvailability: jest.fn(() =>
      Promise.resolve({ available: true })
    )
  }
}))

describe('useRedirect', () => {
  let mockNavigate

  beforeEach(() => {
    mockNavigate = jest.fn()
    useRouter.mockReturnValue({ navigate: mockNavigate })
    useUserData.mockReturnValue({
      isLoading: false,
      data: {},
      refetch: jest.fn()
    })
    useVault.mockReturnValue({ isLoading: false, refetch: jest.fn() })
    useVaults.mockReturnValue({ isLoading: false, refetch: jest.fn() })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return isLoading as true when any loading state is true', () => {
    useUserData.mockReturnValue({
      isLoading: true,
      data: {},
      refetch: jest.fn()
    })
    const { result } = renderHook(() => useRedirect())
    expect(result.current.isLoading).toBe(true)
  })

  it('should navigate to "welcome" with state "masterPassword" when availability check fails', async () => {
    const refetchUser = jest.fn()
    useUserData.mockReturnValue({
      isLoading: false,
      data: {},
      refetch: refetchUser
    })
    useVault.mockReturnValue({ isLoading: false, refetch: jest.fn() })
    useVaults.mockReturnValue({ isLoading: false, refetch: jest.fn() })

    const { client } = require('../../../shared/client')
    client.checkAndHandleAvailability.mockRejectedValueOnce(
      new Error('not available')
    )

    await act(async () => {
      renderHook(() => useRedirect())
    })

    expect(mockNavigate).toHaveBeenCalledWith('welcome', {
      params: { state: 'masterPassword' }
    })
  })

  it('should navigate to "vault" when userData conditions are met', async () => {
    const refetchVault = jest.fn()
    const refetchMasterVault = jest.fn()

    useUserData.mockReturnValue({
      isLoading: false,
      data: { hasPasswordSet: true, isLoggedIn: true, isVaultOpen: true },
      refetch: () =>
        Promise.resolve({
          hasPasswordSet: true,
          isLoggedIn: true,
          isVaultOpen: true
        })
    })
    useVault.mockReturnValue({ isLoading: false, refetch: refetchVault })
    useVaults.mockReturnValue({ isLoading: false, refetch: refetchMasterVault })

    await act(async () => {
      renderHook(() => useRedirect())
    })

    expect(refetchVault).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledWith('vault', {
      state: { recordType: 'all' }
    })
  })

  it('should navigate to "welcome" with state "vaults" when user is logged in but vault is not open', async () => {
    const refetchMasterVault = jest.fn()

    useUserData.mockReturnValue({
      isLoading: false,
      data: { hasPasswordSet: true, isLoggedIn: true, isVaultOpen: false },
      refetch: () =>
        Promise.resolve({
          hasPasswordSet: true,
          isLoggedIn: true,
          isVaultOpen: false
        })
    })
    useVault.mockReturnValue({ isLoading: false, refetch: jest.fn() })
    useVaults.mockReturnValue({ isLoading: false, refetch: refetchMasterVault })

    await act(async () => {
      renderHook(() => useRedirect())
    })

    expect(refetchMasterVault).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledWith('welcome', {
      params: { state: 'vaults' }
    })
  })

  it('should navigate to "welcome" with state "masterPassword" when user has not set a password', async () => {
    useUserData.mockReturnValue({
      isLoading: false,
      data: { hasPasswordSet: false, isLoggedIn: false, isVaultOpen: false },
      refetch: () =>
        Promise.resolve({
          hasPasswordSet: false,
          isLoggedIn: false,
          isVaultOpen: false
        })
    })
    useVault.mockReturnValue({ isLoading: false, refetch: jest.fn() })
    useVaults.mockReturnValue({ isLoading: false, refetch: jest.fn() })

    await act(async () => {
      renderHook(() => useRedirect())
    })

    expect(mockNavigate).toHaveBeenCalledWith('welcome', {
      params: { state: 'masterPassword' }
    })
  })
})
