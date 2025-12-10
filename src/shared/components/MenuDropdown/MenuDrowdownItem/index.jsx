import React from 'react'

/**
 * @param {{
 *    onClick: () => void,
 *    item: {name: string, icon?: import('react').ReactNode}
 *  }} props
 */
export const MenuDropdownItem = ({ item, onClick }) => {
  const Icon = item?.icon

  return (
    <div
      className="text-white-mode1 flex cursor-pointer items-center gap-[5px] text-sm font-medium whitespace-nowrap"
      onClick={onClick}
    >
      {Icon && (
        <div className="flex-shrink-0">
          <Icon />
        </div>
      )}
      {item?.name}
    </div>
  )
}
