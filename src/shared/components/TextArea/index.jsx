import React from 'react'

/**
 * @param {{
 *  value: string,
 *  onChange: (value: string) => void,
 *  placeholder: string,
 *  readonly?: boolean,
 *  onClick: (value: string) => void,
 *  variant: 'default' | 'report'
 * }} props
 */
export const TextArea = ({
  value,
  onChange,
  placeholder,
  readonly,
  onClick,
  variant
}) => {
  const handleChange = (e) => {
    if (!readonly) {
      onChange?.(e.target.value)
    }
  }

  const handleClick = () => {
    if (!readonly) {
      onClick?.(value)
    }
  }

  const baseClasses = `
    w-full resize-none rounded-[10px] border border-grey100-mode1 
    bg-grey400-mode1 font-inter outline-none
    ${readonly ? 'pointer-events-none' : 'pointer-events-auto'}
    focus:border-primary400-mode1
  `

  const commonProps = {
    value,
    onChange: handleChange,
    onClick: handleClick,
    placeholder,
    readOnly: readonly
  }

  return (
    <textarea
      {...commonProps}
      className={` ${baseClasses} ${
        variant === 'report'
          ? 'text-white-mode1 placeholder-grey300-mode1 h-[70px] px-[12px] py-[11px] text-[12px] font-semibold'
          : 'text-white-mode1 placeholder-grey100-mode1 h-[233px] px-[10px] py-[8px] text-[16px] font-bold'
      } `}
    />
  )
}
