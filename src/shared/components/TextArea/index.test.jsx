import React from 'react'

import { render, fireEvent } from '@testing-library/react'

import { TextArea } from './index'

describe('TextArea Component', () => {
  it('renders correctly with default props', () => {
    const { container } = render(
      <TextArea
        value=""
        onChange={jest.fn()}
        placeholder="Enter text"
        disabled={false}
        onClick={jest.fn()}
        variant="default"
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders correctly with report variant', () => {
    const { container } = render(
      <TextArea
        value=""
        onChange={jest.fn()}
        placeholder="Enter text"
        disabled={false}
        onClick={jest.fn()}
        variant="report"
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('calls onChange when typing in the textarea', () => {
    const handleChange = jest.fn()
    const { getByPlaceholderText } = render(
      <TextArea
        value=""
        onChange={handleChange}
        placeholder="Enter text"
        disabled={false}
        onClick={jest.fn()}
        variant="default"
      />
    )

    const textarea = getByPlaceholderText('Enter text')
    fireEvent.change(textarea, { target: { value: 'New value' } })
    expect(handleChange).toHaveBeenCalledWith('New value')
  })

  it('does not call onChange when disabled', () => {
    const handleChange = jest.fn()
    const { getByPlaceholderText } = render(
      <TextArea
        value=""
        onChange={handleChange}
        placeholder="Enter text"
        readonly
        onClick={jest.fn()}
        variant="default"
      />
    )

    const textarea = getByPlaceholderText('Enter text')
    fireEvent.change(textarea, { target: { value: 'New value' } })
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('calls onClick when clicking the textarea', () => {
    const handleClick = jest.fn()
    const { getByPlaceholderText } = render(
      <TextArea
        value="Test value"
        onChange={jest.fn()}
        placeholder="Enter text"
        disabled={false}
        onClick={handleClick}
        variant="default"
      />
    )

    const textarea = getByPlaceholderText('Enter text')
    fireEvent.click(textarea)
    expect(handleClick).toHaveBeenCalledWith('Test value')
  })

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn()
    const { getByPlaceholderText } = render(
      <TextArea
        value="Test value"
        onChange={jest.fn()}
        placeholder="Enter text"
        readonly
        onClick={handleClick}
        variant="default"
      />
    )

    const textarea = getByPlaceholderText('Enter text')
    fireEvent.click(textarea)
    expect(handleClick).not.toHaveBeenCalled()
  })
})
