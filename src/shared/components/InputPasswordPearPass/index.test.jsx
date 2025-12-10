import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'

import { InputPasswordPearPass } from './index'
import '@testing-library/jest-dom'

describe('InputPasswordPearPass', () => {
  const defaultProps = {
    value: '',
    placeholder: 'Enter password',
    onChange: jest.fn(),
    disabled: false,
    error: ''
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly and matches snapshot', () => {
    const { container } = render(<InputPasswordPearPass {...defaultProps} />)
    expect(container).toMatchSnapshot()
  })

  it('renders with error and matches snapshot', () => {
    const { container } = render(
      <InputPasswordPearPass {...defaultProps} error="Password is required" />
    )
    expect(container).toMatchSnapshot()
  })

  it('renders with disabled state and matches snapshot', () => {
    const { container } = render(
      <InputPasswordPearPass {...defaultProps} disabled />
    )
    expect(container).toMatchSnapshot()
  })

  it('calls onChange when input value changes', () => {
    render(<InputPasswordPearPass {...defaultProps} />)
    const input = screen.getByPlaceholderText('Enter password')
    fireEvent.change(input, { target: { value: 'new-password' } })
    expect(defaultProps.onChange).toHaveBeenCalledWith('new-password')
  })

  it('toggles password visibility when button is clicked', () => {
    render(<InputPasswordPearPass {...defaultProps} />)
    const toggleButton = screen.getByRole('button')
    const input = screen.getByPlaceholderText('Enter password')

    expect(input).toHaveAttribute('type', 'password')

    fireEvent.click(toggleButton)
    expect(input).toHaveAttribute('type', 'text')

    fireEvent.click(toggleButton)
    expect(input).toHaveAttribute('type', 'password')
  })

  it('does not call onChange when input is disabled', () => {
    render(<InputPasswordPearPass {...defaultProps} disabled />)
    const input = screen.getByPlaceholderText('Enter password')
    fireEvent.change(input, { target: { value: 'new-password' } })
    expect(defaultProps.onChange).not.toHaveBeenCalled()
  })
})
