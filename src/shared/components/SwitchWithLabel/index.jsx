import React from 'react'

import { Switch } from '../Switch'

/**
 * @param {{
 *  isOn?: boolean,
 *  onChange?: (isOn: boolean) => void
 *  label?: string,
 *  isLabelBold?: boolean,
 *  description?: string
 *  disabled?: boolean
 * }} props
 */
export const SwitchWithLabel = ({
  isOn,
  onChange,
  label,
  isLabelBold,
  description,
  disabled = false
}) => {
  const toggleSwitch = () => {
    if (!disabled) onChange?.(!isOn)
  }

  return (
    <div
      onClick={toggleSwitch}
      className="flex w-full cursor-pointer items-center justify-between"
    >
      <div className="flex-col">
        <div
          className={`font-inter text-sm ${isLabelBold ? 'font-semibold' : 'font-normal'} text-white-mode1`}
        >
          {label}
        </div>
        {description && (
          <div className="text-[12px] text-white/70">{description}</div>
        )}
      </div>
      <Switch isOn={isOn} />
    </div>
  )
}
