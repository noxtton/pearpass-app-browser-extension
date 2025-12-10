import React from 'react'

import { render, fireEvent } from '@testing-library/react'

import { InputSearch } from './index'
import '@testing-library/jest-dom'

describe('InputSearch Component', () => {
  it('renders correctly and matches snapshot', () => {
    const { container } = render(
      <InputSearch
        value=""
        onChange={() => {}}
        quantity={0}
        placeholder="Search..."
      />
    )
    expect(container).toMatchSnapshot()
  })

  it('renders with a value and matches snapshot', () => {
    const { container } = render(
      <InputSearch
        value="test"
        onChange={() => {}}
        quantity={5}
        placeholder="Search..."
      />
    )
    expect(container).toMatchSnapshot()
  })

  it('calls onChange when input value changes', () => {
    const handleChange = jest.fn()
    const { getByPlaceholderText } = render(
      <InputSearch
        value=""
        onChange={handleChange}
        quantity={0}
        placeholder="Search..."
      />
    )

    const input = getByPlaceholderText('Search...')
    fireEvent.change(input, { target: { value: 'new value' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('displays the quantity when value is present', () => {
    const { getByText } = render(
      <InputSearch
        value="test"
        onChange={() => {}}
        quantity={5}
        placeholder="Search..."
      />
    )

    expect(getByText('5')).toBeInTheDocument()
  })

  it('does not display the quantity when value is empty', () => {
    const { queryByText } = render(
      <InputSearch
        value=""
        onChange={() => {}}
        quantity={5}
        placeholder="Search..."
      />
    )

    expect(queryByText('5')).not.toBeInTheDocument()
  })
})
