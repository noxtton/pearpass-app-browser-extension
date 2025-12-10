import {
  registerNavigationHandler,
  handleVaultError,
  registerModalHandlers,
  resetSyncFailedModalState
} from './globalVaultErrorHandler'
import {
  ERROR_CODES,
  VAULT_NAVIGATION
} from '../shared/constants/nativeMessaging'
import { logger } from '../shared/utils/logger'

jest.mock('../shared/utils/logger', () => ({
  logger: {
    error: jest.fn()
  }
}))

describe('globalVaultErrorHandler', () => {
  let mockNavigationHandler
  let mockModalHandlers

  beforeEach(() => {
    jest.clearAllMocks()
    resetSyncFailedModalState()
    mockNavigationHandler = jest.fn()
    mockModalHandlers = {
      showSyncFailedModal: jest.fn()
    }
  })

  describe('registerNavigationHandler', () => {
    it('should register a navigation handler that gets called on a desktop connection error', () => {
      const error = { code: ERROR_CODES.DESKTOP_APP_UNAVAILABLE }
      const onRetry = jest.fn()

      registerNavigationHandler(mockNavigationHandler)
      registerModalHandlers(mockModalHandlers)

      handleVaultError(error, onRetry)

      expect(mockNavigationHandler).toHaveBeenCalledTimes(1)
      expect(mockNavigationHandler).toHaveBeenCalledWith(
        VAULT_NAVIGATION.WELCOME_ROUTE,
        {
          params: { state: VAULT_NAVIGATION.MASTER_PASSWORD_STATE }
        }
      )
      expect(logger.error).toHaveBeenCalled()
      expect(mockModalHandlers.showSyncFailedModal).toHaveBeenCalledWith(
        onRetry
      )
    })

    it('should not call the navigation handler if it is not registered', () => {
      const error = { code: ERROR_CODES.DESKTOP_APP_UNAVAILABLE }
      const onRetry = jest.fn()

      // Unregister by setting to null, simulating initial state
      registerNavigationHandler(null)
      registerModalHandlers(mockModalHandlers)

      handleVaultError(error, onRetry)

      expect(mockNavigationHandler).not.toHaveBeenCalled()
      expect(logger.error).toHaveBeenCalled()
      expect(mockModalHandlers.showSyncFailedModal).toHaveBeenCalledWith(
        onRetry
      )
    })
  })
})
