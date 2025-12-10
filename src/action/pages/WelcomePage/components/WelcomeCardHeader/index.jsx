import React from 'react'

import { ButtonRoundIcon } from '../../../../../shared/components/ButtonRoundIcon'
import { BackIcon } from '../../../../../shared/icons/BackIcon'

/**
 *
 * @param {Object} props
 * @param {React.ReactNode} props.title
 * @param {React.ReactNode} props.description
 * @param {Function} props.onBack
 *
 */
export const WelcomeCardHeader = ({ title, description, onBack }) => (
  <div className="flex w-full flex-col items-center gap-[5px]">
    <div className="flex w-full items-center gap-[28px]">
      {onBack && <ButtonRoundIcon startIcon={BackIcon} onClick={onBack} />}

      <span className="text-white-mode1 font-inter flex-1 pr-[58px] text-center text-[20px] font-medium">
        {title}
        <br />
      </span>
    </div>
    {description && (
      <span className="text-white-mode1 text-center text-[16px] font-light">
        {description}
      </span>
    )}
  </div>
)
