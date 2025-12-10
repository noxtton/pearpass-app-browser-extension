import React, { useState, useMemo } from 'react'

import { MenuDropdownLabel } from './MenuDropdownLabel'
import { MenuDropdownItem } from './MenuDrowdownItem'

/**
 * @param {{
 *    selectedItem?: {name: string, icon?: import('react').ReactNode},
 *    onItemSelect: (item: {name: string, icon?: import('react').ReactNode}) => void,
 *    items: Array<{name: string, icon?: import('react').ReactNode}>
 *  }} props
 */
export const MenuDropdown = ({ selectedItem, onItemSelect, items = [] }) => {
  const [isOpen, setIsOpen] = useState(false)

  const currentItems = useMemo(
    () => items.filter((item) => item?.name !== selectedItem?.name),
    [items, selectedItem]
  )

  const handleFolderSelect = (item) => {
    onItemSelect(item)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <div className="px-2.5 py-1">
        <MenuDropdownLabel
          isHidden={false}
          selectedItem={selectedItem}
          isOpen={isOpen}
        />
      </div>

      <div
        className={`absolute top-0 left-0 flex max-h-[154px] flex-col z-${isOpen ? 10 : 5} bg-grey400-mode1 rounded-lg border-1 border-${isOpen ? 'primary400-mode1' : 'grey100-mode1'} hover:border-primary400-mode1 px-2.5 py-1`}
        style={
          !isOpen && selectedItem?.color
            ? { borderColor: selectedItem?.color }
            : {}
        }
      >
        <MenuDropdownLabel
          selectedItem={selectedItem}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        {isOpen && (
          <div className="flex flex-1 flex-col gap-1 overflow-auto p-1 pl-[30px]">
            {currentItems.map((item) => (
              <MenuDropdownItem
                key={item.name}
                item={item}
                onClick={() => handleFolderSelect(item)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
