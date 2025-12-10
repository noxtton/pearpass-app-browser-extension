import React from 'react'

import { render, fireEvent } from '@testing-library/react'

import { CreateNewCategoryPopupContent } from './index'

describe('CreateNewCategoryPopupContent', () => {
  const mockOnClick = jest.fn()
  const mockMenuItems = [
    { type: 'type1', name: 'Item 1' },
    { type: 'type2', name: 'Item 2' }
  ]

  it('renders correctly and matches snapshot', () => {
    const { asFragment } = render(
      <CreateNewCategoryPopupContent
        menuItems={mockMenuItems}
        onClick={mockOnClick}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('calls onClick when a menu item is clicked', () => {
    const { getByText } = render(
      <CreateNewCategoryPopupContent
        menuItems={mockMenuItems}
        onClick={mockOnClick}
      />
    )

    const menuItem = getByText('Item 1')
    fireEvent.click(menuItem)

    expect(mockOnClick).toHaveBeenCalledWith(mockMenuItems[0])
  })

  it('renders the correct number of menu items', () => {
    const { getAllByText } = render(
      <CreateNewCategoryPopupContent
        menuItems={mockMenuItems}
        onClick={mockOnClick}
      />
    )

    const menuItems = getAllByText(/Item/)
    expect(menuItems).toHaveLength(mockMenuItems.length)
  })
})
