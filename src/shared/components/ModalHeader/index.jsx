import React from 'react'

import { XIcon } from '../../../shared/icons/XIcon'
import { ButtonRoundIcon } from '../ButtonRoundIcon'

/**
 * @param {{
 *  onClose: () => void
 *  children: import('react').ReactNode
 * }} props
 */
export const ModalHeader = ({ onClose, children }) => (
  <div className="flex flex-none items-center gap-[10px]">
    <div className="flex-1">{children}</div>

    <ButtonRoundIcon startIcon={XIcon} type="button" onClick={onClose} />
  </div>
)
