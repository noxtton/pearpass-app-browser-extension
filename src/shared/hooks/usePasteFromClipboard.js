import { useCallback } from 'react'

import { t } from '@lingui/core/macro'

import { useToast } from '../context/ToastContext'

/**
 * @returns {{
 *   pasteFromClipboard: () => Promise<string|null>
 * }}
 */

export const usePasteFromClipboard = () => {
  const { setToast } = useToast()

  const pasteFromClipboard = useCallback(async () => {
    try {
      let text = ''
      if (typeof navigator !== 'undefined' && navigator?.clipboard?.readText) {
        text = await navigator.clipboard.readText()
      } else {
        throw new Error('Clipboard API not available')
      }

      if (!text?.length) {
        setToast({
          message: t`No text found in clipboard`
        })
        return null
      }

      setToast({
        message: t`Pasted from clipboard!`
      })

      return text
    } catch {
      setToast({
        message: t`Failed to paste from clipboard`
      })
      return null
    }
  }, [setToast])

  return { pasteFromClipboard }
}
