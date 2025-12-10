import { useEffect, useState } from 'react'

import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { useCountDown } from 'pear-apps-lib-ui-react-hooks'
import { generateQRCodeSVG } from 'pear-apps-utils-qr'
import { colors } from 'pearpass-lib-ui-theme-provider'
import {
  authoriseCurrentProtectedVault,
  useInvite,
  useVault
} from 'pearpass-lib-vault'

import { ButtonLittle } from '../../../shared/components/ButtonLittle'
import { ButtonRoundIcon } from '../../../shared/components/ButtonRoundIcon'
import { CardWarning } from '../../../shared/components/CardWarningText'
import { useModal } from '../../../shared/context/ModalContext'
import { useRouter } from '../../../shared/context/RouterContext'
import { useToast } from '../../../shared/context/ToastContext'
import { useCopyToClipboard } from '../../../shared/hooks/useCopyToClipboard'
import { BackIcon } from '../../../shared/icons/BackIcon'
import { CopyIcon } from '../../../shared/icons/CopyIcon'
import { TimeIcon } from '../../../shared/icons/TimeIcon'
import { XIcon } from '../../../shared/icons/XIcon'
import { VaultPasswordForm } from '../../containers/VaultPasswordForm'

export const AddDevice = () => {
  const { navigate } = useRouter()
  const { closeModal } = useModal()
  const [qrSvg, setQrSvg] = useState('')
  const { createInvite, deleteInvite, data } = useInvite()

  const [isProtected, setIsProtected] = useState(true)
  const { data: vaultData, isVaultProtected } = useVault()
  const expireTime = useCountDown({
    initialSeconds: 120,
    onFinish: closeModal
  })

  const { setToast } = useToast()

  const { copyToClipboard, isCopied } = useCopyToClipboard({
    onCopy: () => {
      setToast({
        message: t`Copied to clipboard`,
        icon: CopyIcon
      })
    }
  })

  useEffect(() => {
    createInvite()

    return () => {
      deleteInvite()
    }
  }, [])

  useEffect(() => {
    if (data?.publicKey) {
      generateQRCodeSVG(data.publicKey, { type: 'svg', margin: 0 }).then(
        setQrSvg
      )
    }
  }, [data])

  useEffect(() => {
    const checkProtection = async () => {
      const result = await isVaultProtected(vaultData?.id)
      setIsProtected(result)
    }
    checkProtection()
  }, [vaultData])

  if (isProtected) {
    return (
      <div className="bg-grey500-mode1 flex h-full w-full flex-col items-center gap-3 px-6 py-5 pb-2.5">
        <div className="flex w-full items-center justify-start gap-2.5 text-[18px] font-bold text-white">
          <ButtonLittle
            onClick={() => navigate('vault')}
            variant="secondary"
            startIcon={XIcon}
          />

          <Trans>Insert Vault’s password</Trans>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <div className="flex flex-col items-start gap-[10px]">
            <span className="text-grey100-mode1 font-inter text-xs font-normal">
              {t`Unlock with the ${vaultData.name ?? vaultData.id} Vault password`}
            </span>
          </div>
          <div className="">
            <VaultPasswordForm
              className={'items-center'}
              onSubmit={async (password) => {
                if (await authoriseCurrentProtectedVault(password)) {
                  setIsProtected(false)
                }
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-grey500-mode1 flex h-full w-full flex-col items-center justify-between gap-2.5 px-6 py-5 pb-2.5">
      <div className="flex w-full items-center justify-start gap-2.5 text-[18px] font-bold text-white">
        <ButtonRoundIcon
          onClick={() => navigate('vault')}
          variant="secondary"
          startIcon={BackIcon}
        />

        <Trans>Add Device</Trans>
      </div>

      <div className="bg-grey400-mode1 flex items-center justify-center gap-2 rounded-[10px] p-[7px_10px]">
        <div className="text-white-mode1 font-inter flex items-center gap-0.5 text-sm font-medium">
          <Trans>This link will expire in</Trans>
          <span className="text-primary400-mode1">{expireTime}</span>
        </div>

        <div className="flex-shrink-0">
          <TimeIcon color={colors.primary400.mode1} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="text-white-mode1 font-inter text-sm font-medium">
          <Trans>Scan this QR code</Trans>
        </div>

        <div
          className="bg-white-mode1 h-[136px] w-[136px] rounded-[10px] p-2"
          dangerouslySetInnerHTML={{ __html: qrSvg }}
        />
      </div>

      <div
        className="bg-grey400-mode1 flex max-w-full cursor-pointer flex-col items-center gap-1.5 rounded-[10px] px-2.5 py-1.5"
        onClick={() => copyToClipboard(data?.publicKey)}
      >
        <div className="flex gap-2">
          <div className="text-white-mode1 font-inter text-sm font-medium">
            <Trans>Copy account link</Trans>
          </div>

          <div className="flex-shrink-0">
            <CopyIcon color={colors.primary400.mode1} />
          </div>
        </div>

        <div className="text-grey200-mode1 font-inter max-w-full truncate text-base font-medium">
          {isCopied ? <Trans>Copied!</Trans> : data?.publicKey}
        </div>
      </div>

      <CardWarning
        text={t`Caution: You’re generating a secure invitation to sync another device with your vault. Treat this invite with the same confidentiality as your password.`}
      />
    </div>
  )
}
