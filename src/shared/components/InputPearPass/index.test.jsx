import React from 'react'

import { render, fireEvent } from '@testing-library/react'

import { InputPearPass } from './index'

describe('InputPearPass Component', () => {
  it('renders correctly with default props', () => {
    const { container } = render(
      <InputPearPass
        value=""
        onChange={() => {}}
        placeholder="Enter text"
        disabled={false}
        error=""
      />
    )
    expect(container).toMatchSnapshot()
  })

  it('renders correctly with an error', () => {
    const { container } = render(
      <InputPearPass
        value=""
        onChange={() => {}}
        placeholder="Enter text"
        disabled={false}
        error="This is an error"
      />
    )
    expect(container).toMatchSnapshot()
  })

  it('calls onChange when input value changes', () => {
    const handleChange = jest.fn()
    const { getByPlaceholderText } = render(
      <InputPearPass
        value=""
        onChange={handleChange}
        placeholder="Enter text"
        disabled={false}
        error=""
      />
    )

    const input = getByPlaceholderText('Enter text')
    fireEvent.change(input, { target: { value: 'New value' } })
    expect(handleChange).toHaveBeenCalledWith('New value')
  })

  it('does not call onChange when disabled is true', () => {
    const handleChange = jest.fn()
    const { getByPlaceholderText } = render(
      <InputPearPass
        value=""
        onChange={handleChange}
        placeholder="Enter text"
        disabled
        error=""
      />
    )

    const input = getByPlaceholderText('Enter text')
    fireEvent.change(input, { target: { value: 'New value' } })
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('renders correctly when disabled', () => {
    const { container } = render(
      <InputPearPass
        value=""
        onChange={() => {}}
        placeholder="Enter text"
        disabled
        error=""
      />
    )
    expect(container).toMatchSnapshot()
  })
})
