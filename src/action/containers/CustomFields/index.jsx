import { t } from '@lingui/core/macro'

import { ButtonRoundIcon } from '../../../shared/components/ButtonRoundIcon'
import { FormGroup } from '../../../shared/components/FormGroup'
import { InputField } from '../../../shared/components/InputField'
import { CommonFileIcon } from '../../../shared/icons/CommonFileIcon'
import { DeleteIcon } from '../../../shared/icons/DeleteIcon'

/**
 * @param {{
 *  register: (name: string, index: number) => any,
 *  customFields?: {
 *    id: string,
 *    type: 'note',
 *    props: any
 *  }[],
 *  onClick?: () => void,
 *  areInputsDisabled: boolean,
 *  removeItem?: (index: number) => void
 * }} props
 */
export const CustomFields = ({
  customFields,
  register,
  areInputsDisabled,
  removeItem,
  onClick
}) => (
  <>
    {customFields?.map((customField, index) => {
      if (customField.type === 'note') {
        return (
          <FormGroup key={customField.id}>
            <InputField
              label={t`Note`}
              placeholder={t`Add note`}
              variant="outline"
              icon={CommonFileIcon}
              onClick={onClick}
              readonly={areInputsDisabled}
              additionalItems={
                !areInputsDisabled && (
                  <ButtonRoundIcon
                    variant="secondary"
                    startIcon={DeleteIcon}
                    onClick={() => removeItem?.(index)}
                  />
                )
              }
              {...register('note', index)}
            />
          </FormGroup>
        )
      }
      return null
    })}
  </>
)
