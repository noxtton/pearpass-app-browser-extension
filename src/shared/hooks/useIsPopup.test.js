import { useIsPasskeyPopup } from './useIsPasskeyPopup'
import { PASSKEY_POPUP_PATH_PREFIX } from '../constants/passkey'

describe('useIsPasskeyPopup hook', () => {
  const originalLocation = window.location

  afterEach(() => {
    jest.spyOn(window, 'location', 'get').mockRestore()
  })

  it('returns false when pathname does not start with PASSKEY_POPUP_PATH_PREFIX', () => {
    const fakeLoc = { ...originalLocation, pathname: '/not-passkey/foo' }
    jest.spyOn(window, 'location', 'get').mockReturnValue(fakeLoc)

    expect(useIsPasskeyPopup()).toBe(false)
  })

  it('returns true when pathname starts with PASSKEY_POPUP_PATH_PREFIX', () => {
    const fakeLoc = {
      ...originalLocation,
      pathname: `${PASSKEY_POPUP_PATH_PREFIX}.html/123`
    }
    jest.spyOn(window, 'location', 'get').mockReturnValue(fakeLoc)

    expect(useIsPasskeyPopup()).toBe(true)
  })
})
