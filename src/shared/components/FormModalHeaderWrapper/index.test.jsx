import React from 'react'

import { render } from '@testing-library/react'

import { FormModalHeaderWrapper } from './index'

describe('FormModalHeaderWrapper', () => {
  it('renders correctly with children only', () => {
    const { container } = render(
      <FormModalHeaderWrapper>
        <div>Child Content</div>
      </FormModalHeaderWrapper>
    )
    expect(container).toMatchSnapshot()
  })

  it('renders correctly with children and buttons', () => {
    const { container } = render(
      <FormModalHeaderWrapper buttons={<button>Click Me</button>}>
        <div>Child Content</div>
      </FormModalHeaderWrapper>
    )
    expect(container).toMatchSnapshot()
  })

  it('renders correctly with no buttons', () => {
    const { container } = render(
      <FormModalHeaderWrapper>
        <span>Only Children</span>
      </FormModalHeaderWrapper>
    )
    expect(container).toMatchSnapshot()
  })
})
