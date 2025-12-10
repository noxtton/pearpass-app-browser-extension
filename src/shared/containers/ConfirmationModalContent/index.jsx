import { t } from '@lingui/core/macro'

import { ButtonPrimary } from '../../../shared/components/ButtonPrimary'
import { ButtonSecondary } from '../../../shared/components/ButtonSecondary'
import { useModal } from '../../../shared/context/ModalContext'
import { ModalContent } from '../ModalContent'

/**
 * @param {{
 *    title?: string
 *    text?: string
 *    primaryAction: () => void
 *    secondaryAction: () => void
 *    primaryLabel?: string
 *    secondaryLabel?: string
 * }} props
 */
export const ConfirmationModalContent = ({
  title = t`Are you sure?`,
  text = t`Are you sure you want to proceed?`,
  primaryAction,
  secondaryAction,
  primaryLabel = t`Confirm`,
  secondaryLabel = t`Cancel`
}) => {
  const { closeModal } = useModal()

  return (
    <ModalContent
      onClose={closeModal}
      headerChildren={
        <div className="text-white-mode1 text-sm font-normal">{title}</div>
      }
    >
      <div className="text-white-mode1 pt-1 text-sm font-normal">{text}</div>

      <div className="flex items-center gap-4 pt-5">
        <ButtonPrimary onClick={primaryAction}>{primaryLabel}</ButtonPrimary>
        <ButtonSecondary onClick={secondaryAction}>
          {secondaryLabel}
        </ButtonSecondary>
      </div>
    </ModalContent>
  )
}
