import React from 'react'

import { render, fireEvent } from '@testing-library/react'

import { SwitchWithLabel } from './index'
import '@testing-library/jest-dom'

jest.mock('../Switch', () => ({
  Switch: jest.fn(({ isOn }) => (
    <div data-testid="mock-switch">{isOn ? 'On' : 'Off'}</div>
  ))
}))

describe('SwitchWithLabel Component', () => {
  it('renders correctly with default props', () => {
    const { container } = render(<SwitchWithLabel />)
    expect(container).toMatchSnapshot()
  })

  it('renders with a label and bold text', () => {
    const { getByText } = render(
      <SwitchWithLabel label="Test Label" isLabelBold />
    )
    const labelElement = getByText('Test Label')
    expect(labelElement).toHaveClass('font-semibold')
    expect(labelElement).toMatchSnapshot()
  })

  it('renders with a label and normal text', () => {
    const { getByText } = render(<SwitchWithLabel label="Test Label" />)
    const labelElement = getByText('Test Label')
    expect(labelElement).toHaveClass('font-normal')
    expect(labelElement).toMatchSnapshot()
  })

  it('toggles the switch when clicked', () => {
    const mockOnChange = jest.fn()
    const { getByTestId } = render(
      <SwitchWithLabel isOn={false} onChange={mockOnChange} />
    )
    const switchElement = getByTestId('mock-switch')

    fireEvent.click(switchElement)
    expect(mockOnChange).toHaveBeenCalledWith(true)
  })

  it('renders the Switch component with the correct isOn prop', () => {
    const { getByTestId } = render(<SwitchWithLabel isOn={true} />)
    const switchElement = getByTestId('mock-switch')
    expect(switchElement.textContent).toBe('On')
    expect(switchElement).toMatchSnapshot()
  })
})
