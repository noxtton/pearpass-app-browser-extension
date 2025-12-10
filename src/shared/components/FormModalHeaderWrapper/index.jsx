import React from 'react'

/**
 * @param {{
 *  children: import('react').ReactNode,
 *  buttons?: import('react').ReactNode
 * }} props
 */
export const FormModalHeaderWrapper = ({ children, buttons }) => (
  <div className="flex flex-none items-center justify-between">
    <div className="flex">{children}</div>
    {buttons && <div className="flex items-center gap-[10px]">{buttons}</div>}
  </div>
)
