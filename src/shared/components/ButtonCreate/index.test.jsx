import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'

import { ButtonCreate } from './index'
import '@testing-library/jest-dom'

describe('ButtonCreate Component', () => {
  it('renders children correctly', () => {
    render(<ButtonCreate onClick={() => {}}>Click Me</ButtonCreate>)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    const { container } = render(
      <ButtonCreate onClick={handleClick}>Click Me</ButtonCreate>
    )
    fireEvent.click(screen.getByText('Click Me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
    expect(container).toMatchSnapshot()
  })

  it('renders startIcon when provided', () => {
    const StartIcon = () => <svg data-testid="start-icon" />
    render(
      <ButtonCreate startIcon={StartIcon} onClick={() => {}}>
        Click Me
      </ButtonCreate>
    )
    expect(screen.getByTestId('start-icon')).toBeInTheDocument()
  })

  it('renders endIcon when provided', () => {
    const EndIcon = () => <svg data-testid="end-icon" />
    render(
      <ButtonCreate endIcon={EndIcon} onClick={() => {}}>
        Click Me
      </ButtonCreate>
    )
    expect(screen.getByTestId('end-icon')).toBeInTheDocument()
  })

  it('renders default type as "button"', () => {
    render(<ButtonCreate onClick={() => {}}>Click Me</ButtonCreate>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('renders type as "submit" when specified', () => {
    render(
      <ButtonCreate type="submit" onClick={() => {}}>
        Submit
      </ButtonCreate>
    )
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('renders without crashing when no startIcon or endIcon is provided', () => {
    render(<ButtonCreate onClick={() => {}}>Click Me</ButtonCreate>)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })
})
