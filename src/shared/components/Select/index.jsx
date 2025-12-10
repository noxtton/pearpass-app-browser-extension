import React, { useState } from 'react'

import { SelectItem } from './SelectItem'
import { SelectLabel } from './SelectLabel'
import { useOutsideClick } from '../../hooks/useOutsideClick'

/**
 * @param {{
 *    selectedItem?: { label: string,value: string },
 *    onItemSelect: (item: { label: string, value: string }) => void,
 *    items: Array<{ label: string, value: string }>,
 *    placeholder: string
 *  }} props
 */
export const Select = ({ selectedItem, onItemSelect, items, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false)

  const wrapperRef = useOutsideClick({
    onOutsideClick: () => {
      setIsOpen(false)
    }
  })

  const handleSelect = (item) => {
    onItemSelect(item)
    setIsOpen(false)
  }

  return (
    <div ref={wrapperRef} className="relative">
      <SelectLabel
        selectedItem={selectedItem}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        placeholder={placeholder}
      />

      {isOpen && (
        <div className="border-grey100-mode1 mt-[1px] flex w-full flex-col overflow-hidden rounded-[10px] border py-[7px]">
          {items.map((item) => (
            <SelectItem
              key={item.value}
              item={item}
              onClick={() => handleSelect(item)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
