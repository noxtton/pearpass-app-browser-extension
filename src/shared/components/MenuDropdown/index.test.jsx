import React from 'react'

import { render } from '@testing-library/react'

import { MenuDropdown } from './index'
import '@testing-library/jest-dom'

jest.mock('./MenuDropdownLabel', () => ({
  MenuDropdownLabel: jest.fn(() => <div></div>)
}))

jest.mock('./MenuDrowdownItem', () => ({
  MenuDrowdownItem: jest.fn(() => <div></div>)
}))

describe('MenuDropdown', () => {
  const mockItems = [
    { name: 'Item 1', icon: () => <span>Icon 1</span> },
    { name: 'Item 2', icon: () => <span>Icon 2</span> },
    { name: 'Item 3', icon: () => <span>Icon 3</span> }
  ]

  const mockOnItemSelect = jest.fn()

  it('renders correctly with default props', () => {
    const { asFragment } = render(
      <MenuDropdown items={mockItems} onItemSelect={mockOnItemSelect} />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with a selected item', () => {
    const selectedItem = mockItems[0]
    const { asFragment } = render(
      <MenuDropdown
        items={mockItems}
        selectedItem={selectedItem}
        onItemSelect={mockOnItemSelect}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
