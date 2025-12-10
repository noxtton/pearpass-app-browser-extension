import React from 'react'

import { render, fireEvent } from '@testing-library/react'

import { FormGroup } from './index'
import '@testing-library/jest-dom'

describe('FormGroup Component', () => {
  it('renders correctly with title and children', () => {
    const { container } = render(
      <FormGroup title="Test Title" isCollapse={true}>
        <div>Child Content</div>
      </FormGroup>
    )

    expect(container).toMatchSnapshot()
  })

  it('renders null when no children are provided', () => {
    const { container } = render(
      <FormGroup title="Test Title" isCollapse={true} />
    )
    expect(container).toMatchSnapshot()
  })

  it('toggles collapse state when clicked', () => {
    const { getByText, queryByText } = render(
      <FormGroup title="Test Title" isCollapse={true}>
        <div>Child Content</div>
      </FormGroup>
    )

    expect(queryByText('Child Content')).toBeInTheDocument()

    fireEvent.click(getByText('Test Title'))
    expect(queryByText('Child Content')).not.toBeInTheDocument()

    fireEvent.click(getByText('Test Title'))
    expect(queryByText('Child Content')).toBeInTheDocument()
  })
})
