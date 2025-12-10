import React from 'react'

/**
 * @param {{
 *  title: string
 *  children: import('react').ReactNode
 * }} props
 */
export const CardSingleSetting = ({ title, children }) => (
  <div className="border-grey100-mode1 rounded-[10px] border p-[17px_20px]">
    <div className="border-white-mode1 border-b pb-[15px]">
      <span className="text-white-mode1 font-inter text-base font-bold">
        {title}
      </span>
    </div>
    <div className="pt-[15px]">{children}</div>
  </div>
)
