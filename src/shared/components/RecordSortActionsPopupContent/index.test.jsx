import React from 'react'

import { render, fireEvent } from '@testing-library/react'

import { RecordSortActionsPopupContent } from './index'
import '@testing-library/jest-dom'

jest.mock('../../../shared/icons/CheckIcon', () => ({
  CheckIcon: jest.fn(() => <div data-testid="check-icon" />)
}))

describe('RecordSortActionsPopupContent', () => {
  const mockOnClick = jest.fn()
  const mockOnClose = jest.fn()
  const menuItems = [
    {
      name: 'Recent',
      type: 'recent',
      icon: jest.fn(() => <div data-testid="icon-recent" />)
    },
    {
      name: 'New to Old',
      type: 'newToOld',
      icon: jest.fn(() => <div data-testid="icon-newToOld" />)
    },
    {
      name: 'Old to New',
      type: 'oldToNew',
      icon: jest.fn(() => <div data-testid="icon-oldToNew" />)
    }
  ]

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly and matches snapshot', () => {
    const { container } = render(
      <RecordSortActionsPopupContent
        menuItems={menuItems}
        onClick={mockOnClick}
        onClose={mockOnClose}
        selectedType="recent"
      />
    )
    expect(container).toMatchSnapshot()
  })

  it('renders menu items with correct icons and names', () => {
    const { getByText, getByTestId } = render(
      <RecordSortActionsPopupContent
        menuItems={menuItems}
        onClick={mockOnClick}
        onClose={mockOnClose}
        selectedType="recent"
      />
    )

    menuItems.forEach((item) => {
      expect(getByText(item.name)).toBeInTheDocument()
      expect(getByTestId(`icon-${item.type}`)).toBeInTheDocument()
    })
  })

  it('calls onClick and onClose when a menu item is clicked', () => {
    const { getByText } = render(
      <RecordSortActionsPopupContent
        menuItems={menuItems}
        onClick={mockOnClick}
        onClose={mockOnClose}
        selectedType="recent"
      />
    )

    fireEvent.click(getByText('New to Old'))
    expect(mockOnClick).toHaveBeenCalledWith('newToOld')
    expect(mockOnClose).toHaveBeenCalled()
  })

  it('displays the CheckIcon for the selected menu item', () => {
    const { getByTestId } = render(
      <RecordSortActionsPopupContent
        menuItems={menuItems}
        onClick={mockOnClick}
        onClose={mockOnClose}
        selectedType="recent"
      />
    )

    expect(getByTestId('check-icon')).toBeInTheDocument()
  })
})
