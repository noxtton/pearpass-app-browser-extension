import React from 'react'

/**
 * @param {{
 *  className?: string
 * }} props
 */
export const LoadingOverlay = ({ className = '', ...restProps }) => (
  <div
    {...restProps}
    className={`fixed top-0 left-0 z-[4000] h-full w-full cursor-wait ${className}`}
  />
)
