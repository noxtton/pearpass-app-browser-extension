import React from 'react'

/**
 * @param {{
 *  children: React.ReactNode,
 *  disabled?: boolean
 * }} props
 */
export const CompoundField = ({ children, disabled }) => (
  <div
    className={`bg-grey400-dark border-grey100-dark rounded-[10px] border px-[10px] py-[8px] hover:${disabled ? 'border-grey100-dark' : 'border-primary300-mode1'} `}
  >
    {children}
  </div>
)
