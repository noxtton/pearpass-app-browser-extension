import React from 'react'

import { render, fireEvent } from '@testing-library/react'

import { ButtonPrimary } from '../ButtonPrimary'

describe('ButtonPrimary Component', () => {
  it('renders correctly with default props', () => {
    const { container } = render(
      <ButtonPrimary onClick={() => {}}>Primary Button</ButtonPrimary>
    )
    expect(container).toMatchSnapshot()
  })

  it('renders correctly when disabled', () => {
    const { container } = render(
      <ButtonPrimary disabled onClick={() => {}}>
        Disabled Button
      </ButtonPrimary>
    )
    expect(container).toMatchSnapshot()
  })

  it('calls onClick when clicked and not disabled', () => {
    const handleClick = jest.fn()
    const { getByText } = render(
      <ButtonPrimary onClick={handleClick}>Clickable Button</ButtonPrimary>
    )

    fireEvent.click(getByText('Clickable Button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when clicked and disabled', () => {
    const handleClick = jest.fn()
    const { getByText } = render(
      <ButtonPrimary disabled onClick={handleClick}>
        Disabled Button
      </ButtonPrimary>
    )

    fireEvent.click(getByText('Disabled Button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('renders correctly with a custom type', () => {
    const { container } = render(
      <ButtonPrimary type="submit" onClick={() => {}}>
        Submit Button
      </ButtonPrimary>
    )
    expect(container).toMatchSnapshot()
  })
})
