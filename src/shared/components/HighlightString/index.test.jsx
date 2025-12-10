import React from 'react'

import { render } from '@testing-library/react'

import { HighlightString } from './index'

describe('HighlightString', () => {
  it('renders text with numbers highlighted', () => {
    const { container } = render(<HighlightString text="Hello 123 World" />)
    expect(container).toMatchSnapshot()
  })

  it('renders text with special characters highlighted', () => {
    const { container } = render(<HighlightString text="Hello @World!" />)
    expect(container).toMatchSnapshot()
  })

  it('renders text without numbers or special characters', () => {
    const { container } = render(<HighlightString text="Hello World" />)
    expect(container).toMatchSnapshot()
  })

  it('renders empty text', () => {
    const { container } = render(<HighlightString text="" />)
    expect(container).toMatchSnapshot()
  })
})
