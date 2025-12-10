import React from 'react'

import { render, fireEvent } from '@testing-library/react'

import { MenuDropdownLabel } from './index'

jest.mock('../../../../shared/icons/ArrowDownIcon', () => ({
  ArrowDownIcon: jest.fn(() => <div>ArrowDownIcon</div>)
}))

jest.mock('../../../../shared/icons/ArrowUpIcon', () => ({
  ArrowUpIcon: jest.fn(() => <div>ArrowUpIcon</div>)
}))

jest.mock('../MenuDrowdownItem', () => ({
  MenuDropdownItem: jest.fn(() => <div>MenuDropdownItem</div>)
}))

describe('MenuDropdownLabel', () => {
  it('renders correctly when isOpen is false', () => {
    const { container } = render(
      <MenuDropdownLabel
        isHidden={false}
        selectedItem={{ name: 'Item 1' }}
        isOpen={false}
        setIsOpen={jest.fn()}
      />
    )
    expect(container).toMatchSnapshot()
  })

  it('renders correctly when isOpen is true', () => {
    const { container } = render(
      <MenuDropdownLabel
        isHidden={false}
        selectedItem={{ name: 'Item 1' }}
        isOpen={true}
        setIsOpen={jest.fn()}
      />
    )
    expect(container).toMatchSnapshot()
  })

  it('renders correctly when isHidden is true', () => {
    const { container } = render(
      <MenuDropdownLabel
        isHidden={true}
        selectedItem={{ name: 'Item 1' }}
        isOpen={false}
        setIsOpen={jest.fn()}
      />
    )
    expect(container).toMatchSnapshot()
  })

  it('calls setIsOpen when clicked', () => {
    const setIsOpenMock = jest.fn()
    const { getByText } = render(
      <MenuDropdownLabel
        isHidden={false}
        selectedItem={{ name: 'Item 1' }}
        isOpen={false}
        setIsOpen={setIsOpenMock}
      />
    )

    fireEvent.click(getByText('ArrowDownIcon'))
    expect(setIsOpenMock).toHaveBeenCalledWith(true)
  })
})
