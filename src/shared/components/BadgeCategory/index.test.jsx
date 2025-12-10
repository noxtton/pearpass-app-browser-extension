import React from 'react'

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { BadgeCategory } from './index'
import { RECORD_COLOR_BY_TYPE } from '../../../shared/constants/recordColorByType'

jest.mock('../../../shared/constants/recordIconByType', () => ({
  RECORD_ICON_BY_TYPE: {
    type1: jest.fn(() => <svg data-testid="icon-type1" />),
    type2: jest.fn(() => <svg data-testid="icon-type2" />)
  }
}))

describe('BadgeCategory', () => {
  it('renders correctly with a valid type', () => {
    const type = 'type1'
    const label = 'Type 1'
    const color = '#ff0000'
    RECORD_COLOR_BY_TYPE[type] = color

    const { container } = render(<BadgeCategory label={label} type={type} />)

    const badge = screen.getByText(label)
    expect(badge).toBeInTheDocument()
    expect(badge.parentElement).toHaveStyle(`background-color: ${color}`)

    const icon = screen.getByTestId('icon-type1')
    expect(icon).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('renders correctly with another valid type', () => {
    const type = 'type2'
    const label = 'Type 2'
    const color = '#00ff00'
    RECORD_COLOR_BY_TYPE[type] = color

    render(<BadgeCategory label={label} type={type} />)

    const badge = screen.getByText(label)
    expect(badge).toBeInTheDocument()
    expect(badge.parentElement).toHaveStyle(`background-color: ${color}`)

    const icon = screen.getByTestId('icon-type2')
    expect(icon).toBeInTheDocument()
  })

  it('does not render an icon if type is invalid', () => {
    const type = 'invalidType'
    const label = 'Unknown'

    render(<BadgeCategory label={label} type={type} />)

    const badge = screen.getByText(label)
    expect(badge).toBeInTheDocument()
    expect(screen.queryByTestId('icon-type1')).not.toBeInTheDocument()
    expect(screen.queryByTestId('icon-type2')).not.toBeInTheDocument()
  })
})
