import { useEffect, useState } from 'react'

import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'

import { ButtonSecondary } from '../../components/ButtonSecondary'
import { useToast } from '../../context/ToastContext'

/**
 * Component for displaying and copying the browser extension ID
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS classes for the container
 */
export const ExtensionIdDisplay = ({ className = '' }) => {
  const { setToast } = useToast()
  const [extensionId, setExtensionId] = useState('')

  useEffect(() => {
    if (chrome?.runtime?.id) {
      setExtensionId(chrome.runtime.id)
    }
  }, [])

  const copyExtensionId = () => {
    if (extensionId) {
      navigator.clipboard.writeText(extensionId)
      setToast({ message: 'Extension ID copied to clipboard!' })
    }
  }

  return (
    <div
      className={`bg-grey600-mode1 flex w-full items-center justify-between gap-2 rounded-lg p-3 ${className}`}
    >
      <code className="text-white-mode1 font-mono text-xs break-all">
        {extensionId || t`Loading...`}
      </code>
      {extensionId && (
        <ButtonSecondary onClick={copyExtensionId} className="shrink-0">
          <Trans>Copy</Trans>
        </ButtonSecondary>
      )}
    </div>
  )
}
