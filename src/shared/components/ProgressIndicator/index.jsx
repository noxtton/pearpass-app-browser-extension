import React from 'react'

/**
 * Progress indicator component showing dots for multi-step processes
 * @param {Object} props
 * @param {number} props.currentStep - Current step (1-indexed)
 * @param {number} props.totalSteps - Total number of steps
 * @param {string} [props.activeColor] - Color class for active dot
 * @param {string} [props.inactiveColor] - Color class for inactive dots
 * @param {string} [props.className] - Additional CSS classes
 */
export const ProgressIndicator = ({
  currentStep,
  totalSteps,
  activeColor = 'bg-primary400-mode1',
  inactiveColor = 'bg-grey400-mode1',
  className = ''
}) => (
  <div className={`flex items-center justify-center gap-2 ${className}`}>
    {Array.from({ length: totalSteps }, (_, index) => (
      <div
        key={index}
        className={`h-2 w-2 rounded-full transition-colors ${
          currentStep === index + 1 ? activeColor : inactiveColor
        }`}
      />
    ))}
  </div>
)
