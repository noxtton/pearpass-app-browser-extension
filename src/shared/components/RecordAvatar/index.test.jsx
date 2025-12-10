import React from 'react'

import { render } from '@testing-library/react'

import { RecordAvatar } from './index'
import '@testing-library/jest-dom'

describe('RecordAvatar Component', () => {
  it('renders correctly with avatarSrc', () => {
    const { container } = render(
      <RecordAvatar
        avatarSrc="test-avatar.png"
        initials="AB"
        size="md"
        isSelected={false}
        isFavorite={false}
        color="#000000"
      />
    )

    expect(container).toMatchSnapshot()
  })

  it('renders correctly with initials and favorite', () => {
    const { container } = render(
      <RecordAvatar
        avatarSrc=""
        initials="CD"
        size="sm"
        isSelected={false}
        isFavorite={true}
        color="#FF0000"
      />
    )

    expect(container).toMatchSnapshot()
  })

  it('renders correctly when selected', () => {
    const { container } = render(
      <RecordAvatar
        avatarSrc=""
        initials="EF"
        size="md"
        isSelected={true}
        isFavorite={false}
        color="#00FF00"
      />
    )

    expect(container).toMatchSnapshot()
  })
})
