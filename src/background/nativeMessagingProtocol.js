import {
  NATIVE_MESSAGING_CONFIG,
  NATIVE_MESSAGING_ERRORS
} from '../shared/constants/nativeMessaging'
import { logger } from '../shared/utils/logger'

const isValidWrappedMessage = (wrapped) =>
  wrapped &&
  typeof wrapped === 'object' &&
  wrapped.message &&
  typeof wrapped.length === 'number'

const calculateMessageLength = (message) => {
  const json = JSON.stringify(message)
  return new TextEncoder().encode(json).length
}

export function wrapMessage(message) {
  const originalLength = calculateMessageLength(message)
  return {
    length: originalLength,
    message: message
  }
}

export function unwrapMessage(wrapped) {
  if (!isValidWrappedMessage(wrapped)) {
    logger.error(
      NATIVE_MESSAGING_CONFIG.PROTOCOL_PREFIX,
      NATIVE_MESSAGING_ERRORS.INVALID_MESSAGE_STRUCTURE
    )
    return null
  }

  const actualLength = calculateMessageLength(wrapped.message)
  if (actualLength !== wrapped.length) {
    logger.error(
      NATIVE_MESSAGING_CONFIG.PROTOCOL_PREFIX,
      `${NATIVE_MESSAGING_ERRORS.LENGTH_MISMATCH} - expected: ${wrapped.length}, actual: ${actualLength}`
    )
    return null
  }

  return wrapped.message
}

export function isWrappedMessage(message) {
  return (
    message &&
    typeof message === 'object' &&
    'length' in message &&
    'message' in message
  )
}
