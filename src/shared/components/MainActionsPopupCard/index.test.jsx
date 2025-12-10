import React from 'react'

import { render, fireEvent } from '@testing-library/react'

import { MainActionsPopupCard } from './index'
import '@testing-library/jest-dom'

describe('MainActionsPopupCard', () => {
  it('renders correctly with snapshot', () => {
    const popupItems = [
      { type: 'action1', icon: 'icon1', color: 'red', name: 'Action 1' },
      { type: 'action2', icon: 'icon2', color: 'blue', name: 'Action 2' }
    ]
    const { asFragment } = render(
      <MainActionsPopupCard popupItems={popupItems} />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('calls onClick when an item is clicked', () => {
    const onClickMock = jest.fn()
    const popupItems = [
      {
        type: 'action1',
        icon: 'icon1',
        color: 'red',
        name: 'Action 1',
        onClick: onClickMock
      }
    ]
    const { getByText } = render(
      <MainActionsPopupCard popupItems={popupItems} />
    )
    fireEvent.click(getByText('Action 1'))
    expect(onClickMock).toHaveBeenCalled()
  })

  it('renders all popup items', () => {
    const popupItems = [
      { type: 'action1', icon: 'icon1', color: 'red', name: 'Action 1' },
      { type: 'action2', icon: 'icon2', color: 'blue', name: 'Action 2' }
    ]
    const { getByText } = render(
      <MainActionsPopupCard popupItems={popupItems} />
    )
    expect(getByText('Action 1')).toBeInTheDocument()
    expect(getByText('Action 2')).toBeInTheDocument()
  })
})
