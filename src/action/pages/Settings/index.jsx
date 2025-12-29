import { useState, useEffect } from 'react'

import { t } from '@lingui/core/macro'
import { Trans, useLingui } from '@lingui/react/macro'
import {
  sendGoogleFormFeedback,
  sendSlackFeedback
} from 'pear-apps-lib-feedback'
import { Validator } from 'pear-apps-utils-validator'
import { PRIVACY_POLICY, TERMS_OF_USE } from 'pearpass-lib-constants'

import { version } from '../../../../public/manifest.json'
import { useLanguageOptions } from '../../../hooks/useLanguageOptions'
import { ButtonRoundIcon } from '../../../shared/components/ButtonRoundIcon'
import { ButtonSecondary } from '../../../shared/components/ButtonSecondary'
import { CardSingleSetting } from '../../../shared/components/CardSingleSetting'
import { InputField } from '../../../shared/components/InputField'
import { Select } from '../../../shared/components/Select'
import { SwitchWithLabel } from '../../../shared/components/SwitchWithLabel'
import { TextArea } from '../../../shared/components/TextArea'
import {
  GOOGLE_FORM_KEY,
  GOOGLE_FORM_MAPPING,
  SLACK_WEBHOOK_URL_PATH
} from '../../../shared/constants/feedback'
import { LOCAL_STORAGE_KEYS } from '../../../shared/constants/storage'
import { useRouter } from '../../../shared/context/RouterContext'
import { useToast } from '../../../shared/context/ToastContext'
import { useCopyToClipboard } from '../../../shared/hooks/useCopyToClipboard'
import { BackIcon } from '../../../shared/icons/BackIcon'
import {
  getAutofillEnabled,
  setAutofillEnabled
} from '../../../shared/utils/autofillSetting'
import { isPasswordChangeReminderDisabled } from '../../../shared/utils/isPasswordChangeReminderDisabled'
import { logger } from '../../../shared/utils/logger'

export const Settings = () => {
  const { navigate } = useRouter()
  const { setToast } = useToast()
  const { i18n } = useLingui()
  const { languageOptions } = useLanguageOptions()
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [language, setLanguage] = useState(i18n.locale)
  const [isPasswordReminderDisabled, setIsPasswordReminderDisabled] = useState(
    isPasswordChangeReminderDisabled()
  )
  const [isAutofillEnabled, setIsAutoFillEnabled] = useState(true)
  const { isCopyToClipboardEnabled, handleCopyToClipboardSettingChange } =
    useCopyToClipboard()

  useEffect(() => {
    getAutofillEnabled().then((isEnabled) => setIsAutoFillEnabled(isEnabled))
  }, [])

  const handleLanguageChange = (selected) => {
    setLanguage(selected.value)
    i18n.activate(selected.value)
  }

  const emailValidator = Validator.string().email(t`Invalid email format`)

  const validateEmail = (emailValue) => {
    if (!emailValue) {
      setEmailError('')
      return true
    }
    const error = emailValidator.validate(emailValue)
    setEmailError(error || '')
    return !error
  }

  const handleEmailChange = (val) => {
    setEmail(val)
    if (emailError || val) {
      validateEmail(val)
    }
  }

  const handleReportProblem = async () => {
    if (!message?.length || isLoading) {
      return
    }

    if (email && !validateEmail(email)) {
      return
    }

    try {
      setIsLoading(true)

      const payload = {
        message,
        topic: 'BUG_REPORT',
        app: 'DESKTOP',
        operatingSystem: navigator?.userAgentData?.platform,
        deviceModel: navigator?.platform,
        appVersion: version
      }

      await sendSlackFeedback({
        webhookUrPath: SLACK_WEBHOOK_URL_PATH,
        ...payload
      })

      await sendGoogleFormFeedback({
        formKey: GOOGLE_FORM_KEY,
        mapping: GOOGLE_FORM_MAPPING,
        ...payload
      })

      setMessage('')
      setIsLoading(false)

      setToast({
        message: t`Feedback sent`
      })
    } catch (error) {
      setIsLoading(false)

      setToast({
        message: t`Something went wrong, please try again`
      })

      logger.error('Error sending feedback:', error)
    }
  }

  const selectedLangItem = languageOptions.find((l) => l.value === language)

  const handlePasswordChangeReminder = (isEnabled) => {
    if (!isEnabled) {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.PASSWORD_CHANGE_REMINDER_ENABLED,
        'false'
      )
    } else {
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.PASSWORD_CHANGE_REMINDER_ENABLED
      )
    }

    setIsPasswordReminderDisabled(!isEnabled)
  }

  const handleAutofillChange = (isEnabled) => {
    setAutofillEnabled(isEnabled)
    setIsAutoFillEnabled(isEnabled)
  }

  return (
    <div className="bg-grey400-mode1 flex h-full w-full flex-col gap-1.5 px-5 pt-7 pb-2">
      <div className="flex w-full flex-none items-center justify-start gap-2.5 text-[18px] font-bold text-white">
        <ButtonRoundIcon
          onClick={() => navigate('vault')}
          variant="secondary"
          startIcon={BackIcon}
        />
        <Trans>Settings</Trans>
      </div>

      <div className="flex w-full flex-1 flex-col gap-6 overflow-auto pt-2">
        <CardSingleSetting title={t`Language`}>
          <Select
            items={languageOptions}
            selectedItem={selectedLangItem}
            onItemSelect={handleLanguageChange}
            placeholder={t`Select`}
          />
        </CardSingleSetting>

        <CardSingleSetting title={t`Privacy & Preferences`}>
          <div className="flex flex-col gap-[10px]">
            <SwitchWithLabel
              isOn={!isPasswordReminderDisabled}
              label={t`Reminders`}
              description={t`Enable the reminders to change your passwords`}
              onChange={handlePasswordChangeReminder}
            />
            <SwitchWithLabel
              isOn={isAutofillEnabled}
              label={t`Autofill`}
              description={t`Enable the autofill in the browser extension`}
              onChange={handleAutofillChange}
            />
            <SwitchWithLabel
              isOn={isCopyToClipboardEnabled}
              label={t`Copy to clipboard`}
              description={t`When clicking a password you copy that into your clipboard`}
              onChange={handleCopyToClipboardSettingChange}
            />
          </div>
        </CardSingleSetting>

        <CardSingleSetting title={t`Report a problem`}>
          <div className="font-inter mb-[15px] text-[12px] text-white">
            {t`Tell us what's going wrong and leave your email so we can follow up with you.`}
          </div>
          <form
            className="flex flex-col gap-[15px]"
            onSubmit={(e) => {
              e.preventDefault()
              handleReportProblem()
            }}
          >
            <TextArea
              value={message}
              onChange={(val) => setMessage(val)}
              variant="report"
              placeholder={t`Write your issue...`}
            />
            <InputField
              value={email}
              onChange={handleEmailChange}
              variant="report"
              placeholder={t`Write your email...`}
              error={emailError}
            />
            <div className="self-start">
              <ButtonSecondary type="submit">{t`Send`}</ButtonSecondary>
            </div>
          </form>
        </CardSingleSetting>

        <CardSingleSetting title={t`Version`}>
          <div className="flex w-full items-center justify-start gap-2.5 text-[18px] font-bold text-white">
            {version}
          </div>
        </CardSingleSetting>

        <div className="mt-auto mb-4 flex w-full items-center justify-end gap-2.5 text-[14px]">
          <a
            className="text-primary200-mode1 hover:text-primary300-mode1 underline"
            target="_blank"
            href={TERMS_OF_USE}
          >
            {t`Terms of Use`}
          </a>
          <a
            className="text-primary200-mode1 hover:text-primary300-mode1 underline"
            target="_blank"
            href={PRIVACY_POLICY}
          >
            {t`Privacy Statement`}
          </a>
        </div>
      </div>
    </div>
  )
}
