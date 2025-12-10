import React from 'react'

import { render, fireEvent } from '@testing-library/react'

import { Switch } from './index'
import '@testing-library/jest-dom'

describe('Switch Component', () => {
  it('renders correctly when isOn is true', () => {
    const { container } = render(<Switch isOn={true} onChange={jest.fn()} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders correctly when isOn is false', () => {
    const { container } = render(<Switch isOn={false} onChange={jest.fn()} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('calls onChange with the correct value when clicked', () => {
    const onChangeMock = jest.fn()
    const { getByRole } = render(
      <Switch isOn={false} onChange={onChangeMock} />
    )

    fireEvent.click(getByRole('button'))
    expect(onChangeMock).toHaveBeenCalledWith(true)
  })

  it('toggles the switch state when clicked', () => {
    const onChangeMock = jest.fn()
    const { getByRole, rerender } = render(
      <Switch isOn={false} onChange={onChangeMock} />
    )

    fireEvent.click(getByRole('button'))
    expect(onChangeMock).toHaveBeenCalledWith(true)

    rerender(<Switch isOn={true} onChange={onChangeMock} />)
    fireEvent.click(getByRole('button'))
    expect(onChangeMock).toHaveBeenCalledWith(false)
  })
})
