import React from 'react'

import { render } from '@testing-library/react'

import { CompoundField } from './index'

describe('CompoundField', () => {
  it('renders correctly with children', () => {
    const { container } = render(
      <CompoundField>
        <span>Test Child</span>
      </CompoundField>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('applies the correct styles when disabled is true', () => {
    const { container } = render(
      <CompoundField disabled>
        <span>Disabled Child</span>
      </CompoundField>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('applies the correct styles when disabled is false', () => {
    const { container } = render(
      <CompoundField disabled={false}>
        <span>Enabled Child</span>
      </CompoundField>
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
