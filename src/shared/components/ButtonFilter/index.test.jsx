import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'

import { ButtonFilter } from './index'
import '@testing-library/jest-dom'

describe('ButtonFilter Component', () => {
  it('renders correctly with primary variant', () => {
    const { asFragment } = render(
      <ButtonFilter variant="primary" onClick={() => {}}>
        Primary Button
      </ButtonFilter>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with secondary variant', () => {
    const { asFragment } = render(
      <ButtonFilter variant="secondary" onClick={() => {}}>
        Secondary Button
      </ButtonFilter>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with a start icon', () => {
    const MockIcon = ({ size, color }) => (
      <svg data-testid="mock-icon" width={size} height={size} fill={color} />
    )
    const { asFragment } = render(
      <ButtonFilter startIcon={MockIcon} variant="primary" onClick={() => {}}>
        Button with Icon
      </ButtonFilter>
    )
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly when disabled', () => {
    const { asFragment } = render(
      <ButtonFilter disabled onClick={() => {}}>
        Disabled Button
      </ButtonFilter>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('calls onClick when clicked and not disabled', () => {
    const handleClick = jest.fn()
    render(<ButtonFilter onClick={handleClick}>Clickable Button</ButtonFilter>)
    fireEvent.click(screen.getByText('Clickable Button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when clicked and disabled', () => {
    const handleClick = jest.fn()
    render(
      <ButtonFilter disabled onClick={handleClick}>
        Disabled Button
      </ButtonFilter>
    )
    fireEvent.click(screen.getByText('Disabled Button'))
    expect(handleClick).not.toHaveBeenCalled()
  })
})
