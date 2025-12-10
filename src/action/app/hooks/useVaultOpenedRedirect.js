import { useRouter } from '../../../shared/context/RouterContext'
import {
  shouldReturnToPasskeySelection,
  redirectToPasskeySelection
} from '../../../shared/utils/passkeyNavigation'

/**
 * Hook that handles navigation after a vault is successfully opened.
 * Centralizes the logic for redirecting to passkey pages or default vault view.
 *
 * @returns {Function} navigateAfterVaultOpened - Function to call after vault is opened
 */
export const useVaultOpenedRedirect = () => {
  const { navigate, state: routerState } = useRouter()

  const navigateAfterVaultOpened = () => {
    // Check if we should return to passkey selection after vault is opened
    if (shouldReturnToPasskeySelection(routerState)) {
      redirectToPasskeySelection(navigate, routerState)
    } else {
      navigate('vault', { state: { recordType: 'all' } })
    }
  }

  return navigateAfterVaultOpened
}
