import React from 'react'

import { render, fireEvent } from '@testing-library/react'

import { PopupMenu } from './index'
import '@testing-library/jest-dom'

jest.mock('../../../shared/hooks/useOutsideClick', () => ({
  useOutsideClick: jest.fn(() => ({ current: null }))
}))

describe('PopupMenu', () => {
  const setIsOpenMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly when closed', () => {
    const { asFragment } = render(
      <PopupMenu
        isOpen={false}
        setIsOpen={setIsOpenMock}
        content={<div>Menu Content</div>}
      >
        <button>Toggle</button>
      </PopupMenu>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly when open', () => {
    const { asFragment } = render(
      <PopupMenu
        isOpen={true}
        setIsOpen={setIsOpenMock}
        content={<div>Menu Content</div>}
      >
        <button>Toggle</button>
      </PopupMenu>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('calls setIsOpen when the toggle button is clicked', () => {
    const { getByText } = render(
      <PopupMenu
        isOpen={false}
        setIsOpen={setIsOpenMock}
        content={<div>Menu Content</div>}
      >
        <button>Toggle</button>
      </PopupMenu>
    )

    fireEvent.click(getByText('Toggle'))
    expect(setIsOpenMock).toHaveBeenCalledWith(true)
  })
})
