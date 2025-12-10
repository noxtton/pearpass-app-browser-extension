import React, { useState } from 'react'

import { EyeClosedIcon } from '../../../shared/icons/EyeClosedIcon'
import { EyeIcon } from '../../../shared/icons/EyeIcon'
import { LockCircleIcon } from '../../../shared/icons/LockCircleIcon'
import { ButtonRoundIcon } from '../ButtonRoundIcon'
import { NoticeText } from '../NoticeText'

/**
 * @param {{
 *  value: string,
 *  placeholder?: string,
 *  onChange: (value: string) => void,
 *  disabled: boolean,
 *  error: string,
 * }} props
 */
export const InputPasswordPearPass = ({
  value,
  placeholder,
  onChange,
  disabled,
  error
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleChange = (e) => {
    if (disabled) {
      return
    }

    onChange?.(e.target.value)
  }

  return (
    <div
      className={`relative flex w-full items-center gap-2 rounded-lg border px-[10px] py-[5px] ${error ? 'border-errorred-mode1' : 'border-grey300-mode1'}`}
    >
      <div className="flex shrink-0 items-center self-stretch">
        <LockCircleIcon size="24" />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex w-full flex-1 items-center overflow-x-auto whitespace-nowrap">
          <input
            className={`font-inter text-white-mode1 placeholder:text-grey100-mode1 w-full bg-transparent text-base font-normal ${disabled ? 'pointer-events-none' : ''} focus:outline-none`}
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            disabled={disabled}
          />
        </div>
        {error && (
          <div className="text-errorred-mode1 text-sm">
            <NoticeText text={error} type="error" />
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-2 self-center">
        <ButtonRoundIcon
          rounded="md"
          startIcon={isPasswordVisible ? EyeClosedIcon : EyeIcon}
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        />
      </div>
    </div>
  )
}
