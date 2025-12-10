import React from 'react'

import { render, fireEvent } from '@testing-library/react'

import { ButtonSecondary } from './index'
import '@testing-library/jest-dom'

describe('ButtonSecondary Component', () => {
  it('renders correctly with default props', () => {
    const { container } = render(
      <ButtonSecondary onClick={() => {}}>Default Button</ButtonSecondary>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders correctly when disabled', () => {
    const { container } = render(
      <ButtonSecondary disabled onClick={() => {}}>
        Disabled Button
      </ButtonSecondary>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders correctly with a custom type', () => {
    const { container } = render(
      <ButtonSecondary type="submit" onClick={() => {}}>
        Submit Button
      </ButtonSecondary>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('calls onClick when clicked and not disabled', () => {
    const handleClick = jest.fn()
    const { getByText } = render(
      <ButtonSecondary onClick={handleClick}>Clickable Button</ButtonSecondary>
    )

    fireEvent.click(getByText('Clickable Button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when clicked and disabled', () => {
    const handleClick = jest.fn()
    const { getByText } = render(
      <ButtonSecondary disabled onClick={handleClick}>
        Disabled Button
      </ButtonSecondary>
    )

    fireEvent.click(getByText('Disabled Button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies the correct class when disabled', () => {
    const { container } = render(
      <ButtonSecondary disabled onClick={() => {}}>
        Disabled Button
      </ButtonSecondary>
    )
    expect(container.firstChild).toHaveClass('pointer-events-none')
  })

  it('applies the correct class when enabled', () => {
    const { container } = render(
      <ButtonSecondary onClick={() => {}}>Enabled Button</ButtonSecondary>
    )
    expect(container.firstChild).not.toHaveClass('pointer-events-none')
  })
})
