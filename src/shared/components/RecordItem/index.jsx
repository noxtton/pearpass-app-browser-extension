import React from 'react'

import { generateAvatarInitials } from 'pear-apps-utils-avatar-initials'

import { RecordAvatar } from '../../../shared/components/RecordAvatar'
import { RECORD_COLOR_BY_TYPE } from '../../../shared/constants/recordColorByType'

/**
 * @param {{
 *    websiteDomain?: string
 *    isFavorite?: boolean
 *    folder?: string
 *    type?: 'note' | 'creditCard' | 'custom' | 'identity' | 'login'
 *    title?: string
 *    isSelected?: boolean,
 *    onClick?: () => void
 * }} props
 */
export const RecordItem = ({
  websiteDomain,
  title,
  isFavorite,
  type,
  folder,
  isSelected = false,
  onClick
}) => (
  <div className="flex items-center gap-[10px]" onClick={onClick}>
    <RecordAvatar
      websiteDomain={websiteDomain}
      initials={generateAvatarInitials(title)}
      isSelected={isSelected}
      isFavorite={isFavorite}
      color={RECORD_COLOR_BY_TYPE[type]}
    />

    <div className="text-white-mode1 font-inter flex flex-col justify-start text-[16px] font-normal">
      <span>{title}</span>

      <p className="text-grey100-mode1 text-[12px]">{folder}</p>
    </div>
  </div>
)
