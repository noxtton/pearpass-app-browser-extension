import React, { useMemo } from 'react'

import { colors } from 'pearpass-lib-ui-theme-provider'
import { getDefaultFavicon } from 'pearpass-lib-vault'

import { CheckIcon } from '../../../shared/icons/CheckIcon'
import { StarIcon } from '../../../shared/icons/StarIcon'
import { extractDomainName } from '../../utils/extractDomainName'

/**
 * @param {{
 *  websiteDomain: string,
 *  initials: string,
 *  size?: 'md' | 'sm',
 *  isSelected?: boolean,
 *  isFavorite?: boolean,
 *  color: string
 * }} props
 */
export const RecordAvatar = ({
  websiteDomain,
  initials,
  size = 'md',
  isSelected = false,
  isFavorite = false,
  color
}) => {
  const isSmall = size === 'sm'

  const avatarSrc = useMemo(() => {
    if (!websiteDomain) {
      return null
    }

    const website = extractDomainName(websiteDomain)
    const avatarBuffer = getDefaultFavicon(website) || null
    return avatarBuffer ? URL.createObjectURL(new Blob([avatarBuffer])) : null
  }, [websiteDomain])

  if (isSelected) {
    return (
      <div
        className={`bg-primary400-mode1 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[10px] p-[5px]`}
      >
        <CheckIcon size="24" color={colors.black.mode1} />
      </div>
    )
  }

  return (
    <div
      className={`relative flex items-center justify-center ${isSmall ? 'h-[21px] rounded-[7px]' : 'h-[30px] rounded-[10px]'} bg-secondary400-mode1 aspect-square p-[2.5px]`}
    >
      {avatarSrc ? (
        <img
          src={avatarSrc}
          alt="avatar"
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <div
          className={`font-inter text-center font-bold ${isSmall ? 'text-[12px]' : 'text-[16px]'} `}
          style={{ color }}
        >
          {initials}
        </div>
      )}

      {isFavorite && (
        <div className="absolute -right-[6px] -bottom-[7px]">
          <StarIcon
            size="18px"
            color={colors.primary400.mode1}
            fill={isFavorite}
          />
        </div>
      )}
    </div>
  )
}
