import { t } from '@lingui/core/macro'

import { ButtonPrimary } from '../../../shared/components/ButtonPrimary'
import { ButtonSecondary } from '../../../shared/components/ButtonSecondary'

/**
 * @param {{
 *  onConfirm: () => void,
 *  onCancel: () => void,
 *  confirmLabel: string,
 *  cancelLabel: string,
 *  isConfirmDisabled: boolean,
 *  isCancelDisabled: boolean
 * }} props
 */
export const CardButtons = ({
  onConfirm,
  onCancel,
  confirmLabel = t`Confirm`,
  cancelLabel = t`Cancel`,
  isConfirmDisabled = false,
  isCancelDisabled = false
}) => (
  <div className="flex justify-between">
    <ButtonSecondary onClick={onCancel} disabled={isCancelDisabled}>
      {cancelLabel}
    </ButtonSecondary>

    <ButtonPrimary onClick={onConfirm} disabled={isConfirmDisabled}>
      {confirmLabel}
    </ButtonPrimary>
  </div>
)
