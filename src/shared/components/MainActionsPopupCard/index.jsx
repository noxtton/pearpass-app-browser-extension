import React from 'react'

/**
 *
 * @param {Object} props
 * @param {Array} props.popupItems
 * @param {string} props.popupItems[].type
 * @param {string} props.popupItems[].icon
 * @param {string} props.popupItems[].color
 * @param {string} props.popupItems[].name
 * @param {Function} [props.popupItems[].onClick]
 *
 */
export const MainActionsPopupCard = ({ popupItems }) => (
  <div className="hover:bg-grey500-mode1 border-grey100-mode1 flex flex-col border p-1">
    {popupItems.map((item) => {
      const Icon = item.icon
      return (
        <div
          key={item.type}
          className="flex cursor-pointer items-center gap-1 rounded-xl p-1"
          onClick={() => item.onClick?.()}
        >
          {Icon && <Icon color={item.color} />}
          <span>{item.name}</span>
        </div>
      )
    })}
  </div>
)
