import React from 'react'

import { render, fireEvent } from '@testing-library/react'

import { RadioSelect } from './index'
import '@testing-library/jest-dom'

describe('RadioSelect Component', () => {
  const mockOnChange = jest.fn()
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' }
  ]

  it('renders correctly and matches snapshot', () => {
    const { container } = render(
      <RadioSelect
        title="Test Title"
        options={options}
        selectedOption="option1"
        onChange={mockOnChange}
      />
    )
    expect(container).toMatchSnapshot()
  })

  it('renders the title and options', () => {
    const { getByText } = render(
      <RadioSelect
        title="Test Title"
        options={options}
        selectedOption="option1"
        onChange={mockOnChange}
      />
    )

    expect(getByText('Test Title')).toBeInTheDocument()
    options.forEach((option) => {
      expect(getByText(option.label)).toBeInTheDocument()
    })
  })

  it('calls onChange when an option is clicked', () => {
    const { getByText } = render(
      <RadioSelect
        title="Test Title"
        options={options}
        selectedOption="option1"
        onChange={mockOnChange}
      />
    )

    fireEvent.click(getByText('Option 2'))
    expect(mockOnChange).toHaveBeenCalledWith('option2')
  })
})
