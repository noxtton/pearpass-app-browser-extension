import React from 'react'

import { render, fireEvent } from '@testing-library/react'

import { MenuDropdownItem } from './index'

describe('MenuDropdownItem', () => {
  it('renders correctly with name and icon', () => {
    const mockOnClick = jest.fn()
    const mockIcon = () => <span>Icon</span>
    const item = { name: 'Test Item', icon: mockIcon }

    const { container } = render(
      <MenuDropdownItem item={item} onClick={mockOnClick} />
    )

    expect(container).toMatchSnapshot()
  })

  it('renders correctly without an icon', () => {
    const mockOnClick = jest.fn()
    const item = { name: 'Test Item' }

    const { container } = render(
      <MenuDropdownItem item={item} onClick={mockOnClick} />
    )

    expect(container).toMatchSnapshot()
  })

  it('calls onClick when clicked', () => {
    const mockOnClick = jest.fn()
    const item = { name: 'Test Item' }

    const { getByText } = render(
      <MenuDropdownItem item={item} onClick={mockOnClick} />
    )

    fireEvent.click(getByText('Test Item'))
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
})
