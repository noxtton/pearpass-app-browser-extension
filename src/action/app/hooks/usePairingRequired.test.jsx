// usePairingRequired.test.js
import React from 'react'

import { renderHook, act } from '@testing-library/react'

import { usePairingRequired } from './usePairingRequired'
import {
  VAULT_CLIENT_EVENTS,
  BACKGROUND_MESSAGE_TYPES
} from '../../../shared/constants/nativeMessaging'
import * as useModalModule from '../../../shared/context/ModalContext'

// ---- Mock the modal content component so we can easily assert the element type
jest.mock('../../containers/Modal/PairingRequiredModalContent', () => {
  const React = require('react')
  const MockComp = () => null
  MockComp.displayName = 'PairingRequiredModalContent'
  return { PairingRequiredModalContent: MockComp }
})

// ---- Stubs for useModal we can assert against
const setModalMock = jest.fn()
const closeModalMock = jest.fn()
const closeAllModalsMock = jest.fn()

jest.spyOn(useModalModule, 'useModal').mockReturnValue({
  setModal: setModalMock,
  closeModal: closeModalMock,
  closeAllModals: closeAllModalsMock
})

// ---- Provide a fake chrome.runtime
beforeAll(() => {
  global.chrome = {
    runtime: {
      onMessage: {
        addListener: jest.fn(),
        removeListener: jest.fn()
      }
    }
  }
})

afterEach(() => {
  jest.clearAllMocks()
})

// ---- Mock the client with an in-memory handler registry
jest.mock('../../../shared/client', () => {
  const handlers = new Map()
  return {
    client: {
      on: jest.fn((event, handler) => handlers.set(event, handler)),
      off: jest.fn((event) => handlers.delete(event)),
      __emit: (event, payload) => handlers.get(event)?.(payload)
    }
  }
})

describe('usePairingRequired', () => {
  test('calls closeAllModals and setModal when VAULT_CLIENT_EVENTS.PAIRING_REQUIRED fires', () => {
    const { client } = require('../../../shared/client')

    renderHook(() => usePairingRequired())

    act(() => {
      client.__emit(VAULT_CLIENT_EVENTS.PAIRING_REQUIRED, {
        reason: 'client event'
      })
    })

    expect(closeAllModalsMock).toHaveBeenCalledTimes(1)
    expect(setModalMock).toHaveBeenCalledTimes(1)

    // assert on setModal args
    const [el, opts] = setModalMock.mock.calls[0]
    expect(React.isValidElement(el)).toBe(true)
    // We mocked the component; verify it's the expected type
    expect(el.type.displayName).toBe('PairingRequiredModalContent')
    expect(opts).toEqual({ closeable: false })
  })

  test('calls closeAllModals and setModal when chrome.runtime PAIRING_REQUIRED message arrives', () => {
    renderHook(() => usePairingRequired())

    const addListener = global.chrome.runtime.onMessage.addListener
    expect(addListener).toHaveBeenCalledTimes(1)

    const handler = addListener.mock.calls[0][0]

    act(() => {
      handler({
        type: BACKGROUND_MESSAGE_TYPES.PAIRING_REQUIRED,
        reason: 'chrome message'
      })
    })

    expect(closeAllModalsMock).toHaveBeenCalledTimes(1)
    expect(setModalMock).toHaveBeenCalledTimes(1)

    const [el, opts] = setModalMock.mock.calls[0]
    expect(React.isValidElement(el)).toBe(true)
    expect(el.type.displayName).toBe('PairingRequiredModalContent')
    expect(opts).toEqual({ closeable: false })
  })

  test('onPairSuccess from modal closes modal and reloads', () => {
    const { client } = require('../../../shared/client')
    const reload = jest.fn()
    delete window.location
    // minimal location mock
    // @ts-ignore
    window.location = { reload }

    renderHook(() => usePairingRequired())

    act(() => {
      client.__emit(VAULT_CLIENT_EVENTS.PAIRING_REQUIRED, {
        reason: 'client event'
      })
    })

    const [el] = setModalMock.mock.calls[0]
    // pick the prop and call it
    act(() => {
      el.props.onPairSuccess()
    })

    expect(closeModalMock).toHaveBeenCalledTimes(1)
    expect(reload).toHaveBeenCalledTimes(1)
  })
})
