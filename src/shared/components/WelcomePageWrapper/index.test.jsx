import React from 'react'

import { render } from '@testing-library/react'

import { WelcomePageWrapper } from './index'
import '@testing-library/jest-dom'

describe('WelcomePageWrapper', () => {
  it('renders correctly with children', () => {
    const { container } = render(
      <WelcomePageWrapper>
        <div>Test Child</div>
      </WelcomePageWrapper>
    )
    expect(container).toMatchSnapshot()
  })

  it('renders children correctly', () => {
    const { getByText } = render(
      <WelcomePageWrapper>
        <div>Test Child</div>
      </WelcomePageWrapper>
    )
    expect(getByText('Test Child')).toBeInTheDocument()
  })
})
