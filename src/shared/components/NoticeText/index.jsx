import React from 'react'

import { ErrorIcon } from '../../../shared/icons/ErrorIcon'
import { OkayIcon } from '../../../shared/icons/OkayIcon'
import { YellowErrorIcon } from '../../../shared/icons/YellowErrorIcon'

const getIconByType = (type) => {
  switch (type) {
    case 'success':
      return <OkayIcon size="10" />
    case 'error':
      return <ErrorIcon size="10" />
    case 'warning':
      return <YellowErrorIcon size="10" />
    default:
      return null
  }
}

const getTextColor = (type) => {
  switch (type) {
    case 'success':
      return 'text-primary400-mode1'
    case 'error':
      return 'text-errorred-mode1'
    case 'warning':
      return 'text-erroryellow-mode1'
    default:
      return 'text-white'
  }
}

/**
 * @param {{
 *  text: string
 *  type: 'success' | 'error' | 'warning'
 * }} props
 */
export const NoticeText = ({ text, type = 'success' }) => (
  <div className="flex items-center gap-1.5">
    {getIconByType(type)}
    <div className={`font-inter text-[10px] font-medium ${getTextColor(type)}`}>
      {text}
    </div>
  </div>
)
