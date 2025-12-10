import { triggerInputEvents } from './triggerInputEvents'

describe('triggerInputEvents', () => {
  let element

  beforeEach(() => {
    element = document.createElement('input')
  })

  afterEach(() => {
    if (element.parentNode === document.body) {
      document.body.removeChild(element)
    }
  })

  it('should dispatch specified events on the element', () => {
    const inputHandler = jest.fn()
    const changeHandler = jest.fn()

    element.addEventListener('input', inputHandler)
    element.addEventListener('change', changeHandler)

    triggerInputEvents(element, ['input', 'change'])

    expect(inputHandler).toHaveBeenCalledTimes(1)
    expect(changeHandler).toHaveBeenCalledTimes(1)
  })

  it('should not throw if eventTypes is empty', () => {
    expect(() => triggerInputEvents(element, [])).not.toThrow()
  })

  it('should not throw if eventTypes is not provided', () => {
    expect(() => triggerInputEvents(element)).not.toThrow()
  })

  it('should bubble events', () => {
    const parent = document.createElement('div')
    parent.appendChild(element)
    document.body.appendChild(parent)

    const parentHandler = jest.fn()
    parent.addEventListener('input', parentHandler)

    triggerInputEvents(element, ['input'])

    expect(parentHandler).toHaveBeenCalledTimes(1)

    document.body.removeChild(parent)
  })
})
