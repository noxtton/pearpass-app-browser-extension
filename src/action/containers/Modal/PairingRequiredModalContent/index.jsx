import { useState } from 'react'

import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'

import { ButtonPrimary } from '../../../../shared/components/ButtonPrimary'
import { ModalCard } from '../../../../shared/components/ModalCard'
import { useToast } from '../../../../shared/context/ToastContext'
import { secureChannelMessages } from '../../../../shared/services/messageBridge'
import { logger } from '../../../../shared/utils/logger'

/**
 *
 * @param {Object} props
 * @param {Function} props.onPairSuccess
 */
export const PairingRequiredModalContent = ({ onPairSuccess }) => {
  const { setToast } = useToast()
  const [pairingToken, setPairingToken] = useState('')
  const [identity, setIdentity] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchIdentity = async () => {
    if (!pairingToken || pairingToken.trim().length < 10) {
      setToast({
        message: t`Please enter a valid pairing token from the desktop app`
      })
      return
    }

    setLoading(true)
    try {
      const res = await secureChannelMessages.getIdentity(pairingToken.trim())
      if (res?.success && res?.identity) {
        setIdentity(res.identity)
        setToast({
          message: t`Identity verified! Please confirm to complete pairing.`
        })
      } else if (res?.error?.includes('InvalidPairingToken')) {
        throw new Error(t`Invalid pairing token. Please check and try again.`)
      } else {
        throw new Error(t`Failed to get identity`)
      }
    } catch (error) {
      logger.error('Failed to fetch identity:', error)
      setToast({
        message:
          error.message ||
          (error.code === 'TIMEOUT'
            ? t`Request timed out. Please try again.`
            : t`Failed to get identity. Please ensure the desktop app is running.`)
      })
    } finally {
      setLoading(false)
    }
  }

  const confirmPair = async () => {
    if (!identity) {
      setToast({ message: t`Please fetch identity first` })
      return
    }
    setLoading(true)
    try {
      const res = await secureChannelMessages.confirmPair(identity)
      if (res?.ok) {
        setToast({ message: t`Paired successfully!` })
        onPairSuccess()
      } else {
        throw new Error(t`Pairing failed`)
      }
    } catch (error) {
      logger.error('Failed to confirm pairing:', error)
      setToast({
        message:
          error.code === 'TIMEOUT'
            ? t`Request timed out. Please try again.`
            : t`Pairing failed. Please verify the desktop app is configured correctly.`
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <ModalCard>
      <span className="font-inter text-white-mode1 text-2xl font-semibold">
        <Trans>Complete Pairing</Trans>
      </span>

      <span className="font-inter text-white-mode1 text-center text-base font-light">
        <Trans>Enter pairing token from desktop app</Trans>
      </span>

      <span className="font-inter text-grey200-mode1 text-center text-xs">
        <Trans>Settings → Advanced → Extension Pairing</Trans>
      </span>

      <input
        type="text"
        value={pairingToken}
        onChange={(e) => setPairingToken(e.target.value)}
        placeholder="XXXXXX-YYYY"
        className="bg-grey600-mode1 text-white-mode1 focus:ring-primary400-mode1 w-full rounded-lg p-3 font-mono text-sm focus:border-transparent focus:ring-2 focus:outline-none"
        disabled={loading}
        autoFocus
      />

      {identity && (
        <div className="w-full rounded-lg bg-green-500/10 p-2">
          <div className="text-white-mode1 text-sm font-medium">
            <Trans>✓ Verified</Trans>
          </div>
          <div
            className="truncate font-mono text-xs text-green-400"
            title={identity.fingerprint}
          >
            {identity.fingerprint?.slice(0, 32)}...
          </div>
        </div>
      )}

      <div className="mt-2 flex w-full items-center justify-center gap-2">
        {!identity ? (
          <ButtonPrimary
            disabled={loading || !pairingToken}
            onClick={fetchIdentity}
          >
            <Trans>{loading ? t`Processing...` : t`Verify`}</Trans>
          </ButtonPrimary>
        ) : (
          <ButtonPrimary disabled={loading} onClick={confirmPair}>
            <Trans>{t`Complete`}</Trans>
          </ButtonPrimary>
        )}
      </div>
    </ModalCard>
  )
}
