import React from 'react'

import { render } from '@testing-library/react'

import { ProgressIndicator } from './index'

describe('ProgressIndicator', () => {
  it('renders correct number of dots', () => {
    const { container } = render(
      <ProgressIndicator currentStep={1} totalSteps={3} />
    )
    const dots = container.querySelectorAll('.rounded-full')
    expect(dots).toHaveLength(3)
  })

  it('highlights the current step', () => {
    const { container } = render(
      <ProgressIndicator currentStep={2} totalSteps={3} />
    )
    const dots = container.querySelectorAll('.rounded-full')

    expect(dots[0].className).toContain('bg-grey400-mode1')
    expect(dots[1].className).toContain('bg-primary400-mode1')
    expect(dots[2].className).toContain('bg-grey400-mode1')
  })

  it('applies custom colors', () => {
    const { container } = render(
      <ProgressIndicator
        currentStep={1}
        totalSteps={2}
        activeColor="bg-green-500"
        inactiveColor="bg-red-500"
      />
    )
    const dots = container.querySelectorAll('.rounded-full')

    expect(dots[0].className).toContain('bg-green-500')
    expect(dots[1].className).toContain('bg-red-500')
  })

  it('applies custom className', () => {
    const { container } = render(
      <ProgressIndicator
        currentStep={1}
        totalSteps={2}
        className="custom-class"
      />
    )
    const wrapper = container.firstChild
    expect(wrapper.className).toContain('custom-class')
  })

  it('handles edge cases', () => {
    // Test with currentStep greater than totalSteps
    const { container: container1 } = render(
      <ProgressIndicator currentStep={5} totalSteps={3} />
    )
    const dots1 = container1.querySelectorAll('.rounded-full')
    expect(dots1).toHaveLength(3)
    expect(
      Array.from(dots1).every((dot) =>
        dot.className.includes('bg-grey400-mode1')
      )
    ).toBe(true)

    // Test with zero totalSteps
    const { container: container2 } = render(
      <ProgressIndicator currentStep={1} totalSteps={0} />
    )
    const dots2 = container2.querySelectorAll('.rounded-full')
    expect(dots2).toHaveLength(0)
  })
})
