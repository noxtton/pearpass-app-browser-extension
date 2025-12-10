import React from 'react'

import { render } from '@testing-library/react'

import { CardWarning } from './index'

describe('CardWarning Component', () => {
  it('renders correctly with given text', () => {
    const { container } = render(<CardWarning text="This is a warning!" />)
    expect(container).toMatchSnapshot()
  })

  it('renders correctly with empty text', () => {
    const { container } = render(<CardWarning text="" />)
    expect(container).toMatchSnapshot()
  })
})
