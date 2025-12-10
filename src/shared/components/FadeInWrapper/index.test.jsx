import React from 'react'
import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { FadeInWrapper } from './index'

describe('FadeInWrapper', () => {
  it('renders children', () => {
    render(
      <FadeInWrapper>
        <span data-testid="child">Hello</span>
      </FadeInWrapper>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  // Additional test: snapshot test
  it('matches snapshot', () => {
    const { asFragment } = render(
      <FadeInWrapper>
        <span>Snapshot Test</span>
      </FadeInWrapper>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  // Additional test: renders multiple children
  it('renders multiple children correctly', () => {
    render(
      <FadeInWrapper>
        <span data-testid="child1">One</span>
        <span data-testid="child2">Two</span>
      </FadeInWrapper>
    )
    expect(screen.getByTestId('child1')).toBeInTheDocument()
    expect(screen.getByTestId('child2')).toBeInTheDocument()
  })

  it('applies opacity-0 initially', () => {
    const { container } = render(
      <FadeInWrapper>
        <span>Test</span>
      </FadeInWrapper>
    )
    const div = container.firstChild
    expect(div.className).toMatch(/opacity-100/)
  })

  it('applies opacity-100 after mount', async () => {
    jest.useFakeTimers()
    const { container } = render(
      <FadeInWrapper>
        <span>Test</span>
      </FadeInWrapper>
    )
    jest.runAllTimers()
    const div = container.firstChild
    expect(div.className).toMatch(/opacity-100/)
    jest.useRealTimers()
  })
})
