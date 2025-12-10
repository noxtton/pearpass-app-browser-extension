import React from 'react'

import { render, fireEvent } from '@testing-library/react'

import { ButtonLittle } from './index'

describe('ButtonLittle Component', () => {
  it('renders correctly with primary variant', () => {
    const { container } = render(
      <ButtonLittle variant="primary" onClick={() => {}}>
        Primary Button
      </ButtonLittle>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders correctly with secondary variant', () => {
    const { container } = render(
      <ButtonLittle variant="secondary" onClick={() => {}}>
        Secondary Button
      </ButtonLittle>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders correctly with a start icon', () => {
    const MockIcon = ({ size, color }) => (
      <svg width={size} height={size} fill={color}>
        <circle cx="50%" cy="50%" r="50%" />
      </svg>
    )

    const { container } = render(
      <ButtonLittle startIcon={MockIcon} onClick={() => {}}>
        Button with Icon
      </ButtonLittle>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders correctly when disabled', () => {
    const { container } = render(
      <ButtonLittle disabled onClick={() => {}}>
        Disabled Button
      </ButtonLittle>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('calls onClick when clicked and not disabled', () => {
    const handleClick = jest.fn()
    const { getByText } = render(
      <ButtonLittle onClick={handleClick}>Clickable Button</ButtonLittle>
    )

    fireEvent.click(getByText('Clickable Button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn()
    const { getByText } = render(
      <ButtonLittle disabled onClick={handleClick}>
        Disabled Button
      </ButtonLittle>
    )

    fireEvent.click(getByText('Disabled Button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies correct styles for primary variant', () => {
    const { getByText } = render(
      <ButtonLittle variant="primary" onClick={() => {}}>
        Primary Button
      </ButtonLittle>
    )
    expect(getByText('Primary Button').className).toContain(
      'bg-primary400-mode1'
    )
  })

  it('applies correct styles for secondary variant', () => {
    const { getByText } = render(
      <ButtonLittle variant="secondary" onClick={() => {}}>
        Secondary Button
      </ButtonLittle>
    )
    expect(getByText('Secondary Button').className).toContain('bg-black-mode1')
  })

  it('renders with custom type attribute', () => {
    const { getByText } = render(
      <ButtonLittle type="submit" onClick={() => {}}>
        Submit Button
      </ButtonLittle>
    )
    expect(getByText('Submit Button').getAttribute('type')).toBe('submit')
  })
})
