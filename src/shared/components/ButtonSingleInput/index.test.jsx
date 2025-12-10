import React from 'react'

import { render } from '@testing-library/react'

import { ButtonSingleInput } from './index'

describe('ButtonSingleInput Component', () => {
  it('renders correctly with default props', () => {
    const { asFragment } = render(
      <ButtonSingleInput onClick={() => {}}>Default Button</ButtonSingleInput>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with bordered variant', () => {
    const { asFragment } = render(
      <ButtonSingleInput variant="bordered" onClick={() => {}}>
        Bordered Button
      </ButtonSingleInput>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with rounded style', () => {
    const { asFragment } = render(
      <ButtonSingleInput rounded="md" onClick={() => {}}>
        Rounded Button
      </ButtonSingleInput>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with a start icon', () => {
    const MockIcon = ({ size, color }) => (
      <svg width={size} height={size} fill={color}>
        <circle cx="50%" cy="50%" r="50%" />
      </svg>
    )

    const { asFragment } = render(
      <ButtonSingleInput startIcon={MockIcon} onClick={() => {}}>
        Button with Icon
      </ButtonSingleInput>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with custom type', () => {
    const { asFragment } = render(
      <ButtonSingleInput type="submit" onClick={() => {}}>
        Submit Button
      </ButtonSingleInput>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
