import React from 'react'

import { render } from '@testing-library/react'

import { NoticeText } from './index'
import { ErrorIcon } from '../../../shared/icons/ErrorIcon'
import { OkayIcon } from '../../../shared/icons/OkayIcon'
import { YellowErrorIcon } from '../../../shared/icons/YellowErrorIcon'

jest.mock('../../../shared/icons/ErrorIcon', () => ({
  ErrorIcon: jest.fn(() => <div>ErrorIcon</div>)
}))

jest.mock('../../../shared/icons/OkayIcon', () => ({
  OkayIcon: jest.fn(() => <div>OkayIcon</div>)
}))

jest.mock('../../../shared/icons/YellowErrorIcon', () => ({
  YellowErrorIcon: jest.fn(() => <div>YellowErrorIcon</div>)
}))

describe('NoticeText', () => {
  it('renders correctly with type "success"', () => {
    const { container } = render(
      <NoticeText text="Success message" type="success" />
    )
    expect(container).toMatchSnapshot()
    expect(OkayIcon).toHaveBeenCalled()
  })

  it('renders correctly with type "error"', () => {
    const { container } = render(
      <NoticeText text="Error message" type="error" />
    )
    expect(container).toMatchSnapshot()
    expect(ErrorIcon).toHaveBeenCalled()
  })

  it('renders correctly with type "warning"', () => {
    const { container } = render(
      <NoticeText text="Warning message" type="warning" />
    )
    expect(container).toMatchSnapshot()
    expect(YellowErrorIcon).toHaveBeenCalled()
  })

  it('renders correctly with default type', () => {
    const { container } = render(<NoticeText text="Default message" />)
    expect(container).toMatchSnapshot()
  })
})
