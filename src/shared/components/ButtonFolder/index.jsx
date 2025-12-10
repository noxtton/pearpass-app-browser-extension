import React from 'react'

import { FolderIcon } from '../../icons/FolderIcon'

/**
 * @param {{
 *  children: import('react').ReactNode
 *  type?: 'button' | 'submit'
 *  onClick: () => void
 * }} props
 */
export const ButtonFolder = ({ children, type = 'button', onClick }) => (
  <button
    type={type}
    onClick={onClick}
    className={`font-inter text-white-mode1 border-primary400-mode1 hover:border-primary300-mode1 hover:bg-primary300-mode1 hover:text-black-mode1 active:border-primary400-mode1 active:bg-primary400-mode1 active:text-black-mode1 inline-flex items-center justify-center gap-[10px] rounded-[10px] border bg-transparent px-[10px] py-[5px] text-xs font-medium transition-colors`}
  >
    <FolderIcon
      size="24"
      className="stroke-white-mode1 hover:stroke-black-mode1 active:stroke-black-mode1"
    />
    {children}
  </button>
)
