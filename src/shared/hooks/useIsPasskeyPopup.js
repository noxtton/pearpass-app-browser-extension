import { PASSKEY_PAGES } from '../constants/passkey'
import { useRouter } from '../context/RouterContext'

/**
 * Detects if we're in a passkey flow (either on a passkey page or authenticating for passkey).
 * @returns {boolean} True if we're in a passkey flow
 */
export function useIsPasskeyPopup() {
  const { currentPage, state } = useRouter()

  return PASSKEY_PAGES.includes(currentPage) || state?.inPasskeyFlow === true
}
