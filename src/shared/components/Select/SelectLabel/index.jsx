import React from 'react'

import { ArrowDownIcon } from '../../../icons/ArrowDownIcon'
import { ArrowUpIcon } from '../../../icons/ArrowUpIcon'

/**
 * @param {{
 *    selectedItem?: { label: string, value: string },
 *    isOpen: boolean,
 *    setIsOpen?: (isOpen: boolean) => void,
 *    placeholder: string
 *  }} props
 */
export const SelectLabel = ({
  selectedItem,
  isOpen,
  setIsOpen,
  placeholder
}) => (
  <div
    onClick={() => setIsOpen?.(!isOpen)}
    className="border-grey100-mode1 text-white-mode1 font-inter flex w-full cursor-pointer items-center justify-between rounded-[10px] border px-[10px] py-[7px] text-[12px] leading-normal font-bold whitespace-nowrap"
  >
    <span>{selectedItem?.label || placeholder}</span>
    {isOpen ? <ArrowUpIcon size="24" /> : <ArrowDownIcon size="24" />}
  </div>
)
