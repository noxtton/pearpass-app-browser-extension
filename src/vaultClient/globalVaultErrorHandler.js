import {
  DISCONNECTION_ERROR_MESSAGES,
  ERROR_CODES,
  VAULT_ERROR_MESSAGES,
  VAULT_NAVIGATION
} from '../shared/constants/nativeMessaging'
import { logger } from '../shared/utils/logger'

let modalHandlers = null
let navigationHandler = null
let isSyncFailedModalShown = false

export function isDesktopConnectionError(error) {
  return (
    error.code === ERROR_CODES.DESKTOP_APP_UNAVAILABLE ||
    error.code === ERROR_CODES.NATIVE_HOST_DISCONNECTED ||
    error.code === ERROR_CODES.CONNECTION_FAILED ||
    error.message?.includes(VAULT_ERROR_MESSAGES.DESKTOP_CONNECTION_ERROR) ||
    error.message?.includes(DISCONNECTION_ERROR_MESSAGES.REQUEST_TIMEOUT) ||
    error.message?.includes(
      DISCONNECTION_ERROR_MESSAGES.NATIVE_HOST_DISCONNECTED
    )
  )
}

export function registerModalHandlers(handlers) {
  modalHandlers = handlers
}

export function registerNavigationHandler(handler) {
  navigationHandler = handler
}

export function handleVaultError(error, onRetry) {
  logger.error(VAULT_ERROR_MESSAGES.VAULT_OPERATION_ERROR, error)

  if (
    isDesktopConnectionError(error) &&
    modalHandlers &&
    !isSyncFailedModalShown
  ) {
    isSyncFailedModalShown = true

    if (navigationHandler) {
      navigationHandler(VAULT_NAVIGATION.WELCOME_ROUTE, {
        params: { state: VAULT_NAVIGATION.MASTER_PASSWORD_STATE }
      })
    }

    modalHandlers.showSyncFailedModal(onRetry)
    return true
  }

  return false
}

export function resetSyncFailedModalState() {
  isSyncFailedModalShown = false
}
