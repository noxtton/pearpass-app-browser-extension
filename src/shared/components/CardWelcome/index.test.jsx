import React from 'react'

import { render } from '@testing-library/react'

import { CardWelcome } from './index'
import '@testing-library/jest-dom'

describe('CardWelcome Component', () => {
  it('renders correctly with default props', () => {
    const { container } = render(<CardWelcome>Welcome Content</CardWelcome>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders correctly with stretch set to false', () => {
    const { container } = render(
      <CardWelcome stretch={false}>Welcome Content</CardWelcome>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders children correctly', () => {
    const { getByText } = render(
      <CardWelcome>
        <span>Test Child</span>
      </CardWelcome>
    )
    expect(getByText('Test Child')).toBeInTheDocument()
  })
})
