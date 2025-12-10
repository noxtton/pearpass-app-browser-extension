import { logger } from './logger.js'
import {
  redirectToPasskeySelection,
  shouldReturnToPasskeySelection
} from './passkeyNavigation.js'

// Mock the logger module
jest.mock('./logger.js', () => ({
  logger: {
    error: jest.fn(),
    log: jest.fn(),
    warn: jest.fn()
  }
}))

describe('shouldReturnToPasskeySelection', () => {
  it('returns true when returnToPasskey is true in router state', () => {
    const routerState = { returnToPasskey: true }
    expect(shouldReturnToPasskeySelection(routerState)).toBe(true)
  })

  it('returns false when returnToPasskey is false in router state', () => {
    const routerState = { returnToPasskey: false }
    expect(shouldReturnToPasskeySelection(routerState)).toBe(false)
  })

  it('returns false when routerState is null', () => {
    expect(shouldReturnToPasskeySelection(null)).toBe(false)
  })

  it('returns false when routerState is undefined', () => {
    expect(shouldReturnToPasskeySelection()).toBe(false)
  })

  it('returns false when returnToPasskey is not present in router state', () => {
    const routerState = { someOtherProp: 'value' }
    expect(shouldReturnToPasskeySelection(routerState)).toBe(false)
  })
})

describe('redirectToPasskeySelection', () => {
  // Mock logger.error to test error handling
  beforeEach(() => {
    jest.clearAllMocks()
    logger.error = jest.fn()
  })

  it('navigates with correct parameters when both navigate and passkeyParams are provided', () => {
    const mockNavigate = jest.fn()
    const passkeyParams = {
      page: 'getPasskey',
      serializedPublicKey: 'abc123',
      requestId: 'req1',
      requestOrigin: 'example.com',
      tabId: '456'
    }

    redirectToPasskeySelection(mockNavigate, passkeyParams)

    expect(mockNavigate).toHaveBeenCalledWith('getPasskey', {
      state: {
        serializedPublicKey: 'abc123',
        requestId: 'req1',
        requestOrigin: 'example.com',
        tabId: '456'
      }
    })
    expect(logger.error).not.toHaveBeenCalled()
  })

  it('logs error and returns when navigate is null', () => {
    const passkeyParams = {
      page: 'getPasskey',
      serializedPublicKey: 'abc123',
      requestId: 'req1',
      requestOrigin: 'example.com',
      tabId: '456'
    }

    redirectToPasskeySelection(null, passkeyParams)

    expect(logger.error).toHaveBeenCalledWith(
      'redirectToPasskeySelection requires both navigate and passkeyParams'
    )
  })

  it('logs error and returns when passkeyParams is null', () => {
    const mockNavigate = jest.fn()

    redirectToPasskeySelection(mockNavigate, null)

    expect(mockNavigate).not.toHaveBeenCalled()
    expect(logger.error).toHaveBeenCalledWith(
      'redirectToPasskeySelection requires both navigate and passkeyParams'
    )
  })

  it('logs error and returns when both parameters are null', () => {
    redirectToPasskeySelection(null, null)

    expect(logger.error).toHaveBeenCalledWith(
      'redirectToPasskeySelection requires both navigate and passkeyParams'
    )
  })
})
