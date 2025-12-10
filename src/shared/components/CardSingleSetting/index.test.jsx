import React from 'react'

import { render } from '@testing-library/react'

import { CardSingleSetting } from './index'

describe('CardSingleSetting', () => {
  it('renders correctly with title and children', () => {
    const { container } = render(
      <CardSingleSetting title="Test Title">
        <p>Test Content</p>
      </CardSingleSetting>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders correctly with different children', () => {
    const { container } = render(
      <CardSingleSetting title="Another Title">
        <div>
          <span>Nested Content</span>
        </div>
      </CardSingleSetting>
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
