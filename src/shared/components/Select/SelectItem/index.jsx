import React from 'react'

/**
 * @param {{
 *    onClick: () => void,
 *    item: { label: string, value: string }
 *  }} props
 */
export const SelectItem = ({ item, onClick }) => (
  <div
    onClick={() => onClick?.()}
    className="text-white-mode1 font-inter cursor-pointer px-[10px] py-[5px] text-[12px] leading-normal font-normal whitespace-nowrap"
  >
    {item.label}
  </div>
)
