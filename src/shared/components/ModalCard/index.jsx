import React from 'react'

/**
 * Reusable modal card component with consistent styling
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to display inside the modal
 * @param {string} [props.className] - Additional CSS classes
 */
export const ModalCard = ({ children, className = '' }) => (
  <div
    className={`bg-grey500-mode1 border-grey100-mode1 flex w-md flex-col items-center gap-2.5 rounded-[20px] border p-5 px-11 ${className}`}
  >
    {children}
  </div>
)
