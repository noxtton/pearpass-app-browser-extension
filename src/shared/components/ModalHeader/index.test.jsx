import React from 'react'

import { render, fireEvent } from '@testing-library/react'

import { ModalHeader } from './index'
import '@testing-library/jest-dom'

jest.mock('../../../shared/icons/XIcon', () => ({
  XIcon: ({ size, color }) => (
    <svg width={size} height={size} fill={color}>
      <circle cx="10" cy="10" r="5" />
    </svg>
  )
}))

describe('ModalHeader', () => {
  it('renders correctly and matches snapshot', () => {
    const { container } = render(
      <ModalHeader onClose={() => {}}>
        <div>Test Content</div>
      </ModalHeader>
    )
    expect(container).toMatchSnapshot()
  })

  it('calls onClose when close button is clicked', () => {
    const onCloseMock = jest.fn()
    const { getByRole } = render(
      <ModalHeader onClose={onCloseMock}>
        <div>Test Content</div>
      </ModalHeader>
    )

    const closeButton = getByRole('button')
    fireEvent.click(closeButton)
    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })

  it('renders children correctly', () => {
    const { getByText } = render(
      <ModalHeader onClose={() => {}}>
        <div>Test Content</div>
      </ModalHeader>
    )

    expect(getByText('Test Content')).toBeInTheDocument()
  })
})
