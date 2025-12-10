import React from 'react'

import { render, fireEvent } from '@testing-library/react'

import { Slider } from './index'
import '@testing-library/jest-dom'

describe('Slider Component', () => {
  const mockOnChange = jest.fn()

  it('renders correctly', () => {
    const { container } = render(
      <Slider value={50} onChange={mockOnChange} min={0} max={100} step={1} />
    )

    expect(container).toMatchSnapshot()
  })

  it('calls onChange when value changes', () => {
    const { getByRole } = render(
      <Slider value={50} onChange={mockOnChange} min={0} max={100} step={1} />
    )

    const slider = getByRole('slider')
    fireEvent.change(slider, { target: { value: 75 } })

    expect(mockOnChange).toHaveBeenCalledWith(75)
  })
})
