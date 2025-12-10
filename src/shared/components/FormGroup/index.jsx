import React, { useState } from 'react'

import { ArrowDownIcon } from '../../../shared/icons/ArrowDownIcon'
import { ArrowUpIcon } from '../../../shared/icons/ArrowUpIcon'

/**
 * @param {{
 *  title: string,
 *  isCollapse: boolean
 *  children: React.ReactNode
 *  defaultOpenState?: boolean
 * }} props
 */
export const FormGroup = ({
  title,
  isCollapse,
  children,
  defaultOpenState = true
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpenState)

  if (!children) {
    return null
  }

  return (
    <div className="group flex w-full flex-col gap-2.5">
      {title?.length > 0 && isCollapse && (
        <div
          className="text-grey100-mode1 inline-flex cursor-pointer items-center gap-1.5 self-start text-xs font-normal"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
          {title}
        </div>
      )}

      {isOpen && <div className="w-full">{children}</div>}
    </div>
  )
}
