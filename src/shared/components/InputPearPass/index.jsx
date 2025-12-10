import React from 'react'

import { NoticeText } from '../NoticeText'

/**
 * @param {{
 *  value: string,
 *  onChange: (value: string) => void,
 *  placeholder: string,
 *  disabled: boolean,
 *  error: string,
 * }} props
 */
export const InputPearPass = ({
  placeholder,
  value,
  onChange,
  disabled,
  error
}) => {
  const handleChange = (e) => {
    if (disabled) {
      return
    }

    onChange?.(e.target.value)
  }

  return (
    <div
      className={`relative flex w-full items-center gap-2 rounded-lg border p-[10px] ${error ? 'border-errorred-mode1' : 'border-grey300-mode1'} `}
    >
      <div className="flex flex-1 flex-col">
        <div className="relative flex w-full items-center overflow-x-auto whitespace-nowrap">
          <input
            type="text"
            value={value}
            onChange={handleChange}
            disabled={disabled}
            placeholder={placeholder}
            className={`font-inter placeholder:text-grey100-mode1 text-white-mode1 w-full bg-transparent text-base font-normal ${disabled ? 'pointer-events-none' : ''} focus:outline-none`}
          />
        </div>
        {error && (
          <div className="text-errorred-mode1 text-sm">
            <NoticeText text={error} type="error" />
          </div>
        )}
      </div>
    </div>
  )
}
