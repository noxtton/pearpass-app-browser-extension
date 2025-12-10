import React from 'react'

/**
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {function} props.onClick
 * @param {boolean} [props.disabled]
 * @param {string} [props.type='button']
 */
export const ButtonSecondary = ({
  children,
  onClick,
  disabled,
  type = 'button'
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    type={type}
    className={`border-primary400-mode1 cursor-pointer rounded-[10px] border bg-transparent px-[15px] py-[8px] text-[14px] font-semibold text-white ${
      disabled ? 'pointer-events-none opacity-50' : ''
    }`}
  >
    {children}
  </button>
)
