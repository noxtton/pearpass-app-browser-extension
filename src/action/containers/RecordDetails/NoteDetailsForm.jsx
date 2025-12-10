import { useEffect, useMemo } from 'react'

import { t } from '@lingui/core/macro'
import { useForm } from 'pear-apps-lib-ui-react-hooks'

import { FormGroup } from '../../../shared/components/FormGroup'
import { TextArea } from '../../../shared/components/TextArea'
import { useToast } from '../../../shared/context/ToastContext'
import { useCopyToClipboard } from '../../../shared/hooks/useCopyToClipboard'
import { CopyIcon } from '../../../shared/icons/CopyIcon'
import { CustomFields } from '../CustomFields'

/**
 *
 * @param {Object} props
 * @param {Object} props.initialRecord
 * @param {Object} [props.initialRecord.data]
 * @param {string} [props.initialRecord.data.note]
 * @param {Array} [props.initialRecord.data.customFields]
 * @param {string} [props.initialRecord.folder]
 *
 */
export const NoteDetailsForm = ({ initialRecord }) => {
  const { setToast } = useToast()

  const { copyToClipboard } = useCopyToClipboard({
    onCopy: () => {
      setToast({
        message: t`Copied to clipboard`,
        icon: CopyIcon
      })
    }
  })

  const initialValues = useMemo(
    () => ({
      note: initialRecord?.data?.note ?? '',
      customFields: initialRecord?.data?.customFields ?? [],
      folder: initialRecord?.folder
    }),
    [initialRecord]
  )

  const { register, registerArray, setValues, values } = useForm({
    initialValues: initialValues
  })

  const { value: list, registerItem } = registerArray('customFields')

  useEffect(() => {
    setValues(initialValues)
  }, [initialValues, setValues])

  const handleCopy = (value) => {
    if (!value?.length) {
      return
    }

    copyToClipboard(value)
  }

  return (
    <div className="flex w-full flex-col gap-4 overflow-auto">
      <FormGroup>
        {!!values?.note?.length && (
          <TextArea
            readonly
            onClick={handleCopy}
            {...register('note')}
            placeholder={t`Write a note...`}
          />
        )}
      </FormGroup>

      <CustomFields
        areInputsDisabled
        customFields={list}
        register={registerItem}
      />
    </div>
  )
}
