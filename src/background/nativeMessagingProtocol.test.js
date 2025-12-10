import { TextEncoder } from 'util'

import { unwrapMessage } from './nativeMessagingProtocol'
import {
  NATIVE_MESSAGING_CONFIG,
  NATIVE_MESSAGING_ERRORS
} from '../shared/constants/nativeMessaging'
import { logger } from '../shared/utils/logger'
global.TextEncoder = TextEncoder

jest.mock('../shared/utils/logger', () => ({
  logger: {
    error: jest.fn()
  }
}))

describe('unwrapMessage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should correctly unwrap a valid message and return the message payload', () => {
    const messagePayload = { action: 'ping', data: 'test' }
    const wrappedMessage = {
      length: 31, // Calculated length of JSON.stringify(messagePayload)
      message: messagePayload
    }

    const result = unwrapMessage(wrappedMessage)

    expect(result).toEqual(messagePayload)
    expect(logger.error).not.toHaveBeenCalled()
  })

  it('should return null and log an error if the wrapped message has an invalid structure', () => {
    const invalidMessages = [
      null,
      undefined,
      {},
      { length: 10 },
      { message: 'test' },
      { length: '10', message: 'test' }
    ]

    invalidMessages.forEach((invalidMessage) => {
      const result = unwrapMessage(invalidMessage)
      expect(result).toBeNull()
      expect(logger.error).toHaveBeenCalledWith(
        NATIVE_MESSAGING_CONFIG.PROTOCOL_PREFIX,
        NATIVE_MESSAGING_ERRORS.INVALID_MESSAGE_STRUCTURE
      )
      jest.clearAllMocks()
    })
  })

  it('should return null and log an error if the message length does not match the provided length', () => {
    const messagePayload = { data: 'test' }
    const actualLength = 15 // Real length of JSON.stringify(messagePayload)
    const incorrectLength = 10
    const wrappedMessage = {
      length: incorrectLength,
      message: messagePayload
    }

    const result = unwrapMessage(wrappedMessage)

    expect(result).toBeNull()
    expect(logger.error).toHaveBeenCalledWith(
      NATIVE_MESSAGING_CONFIG.PROTOCOL_PREFIX,
      `${NATIVE_MESSAGING_ERRORS.LENGTH_MISMATCH} - expected: ${incorrectLength}, actual: ${actualLength}`
    )
  })

  it('should correctly handle messages with unicode characters', () => {
    const messagePayload = { data: '123' }
    // JSON.stringify({data:"123"}) is '{"data":"123"}'
    // The byte length is 16
    const actualLength = new TextEncoder().encode(
      JSON.stringify(messagePayload)
    ).length
    const wrappedMessage = {
      length: actualLength,
      message: messagePayload
    }

    const result = unwrapMessage(wrappedMessage)

    expect(result).toEqual(messagePayload)
    expect(logger.error).not.toHaveBeenCalled()
  })
})
