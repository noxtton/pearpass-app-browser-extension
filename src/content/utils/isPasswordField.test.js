import { isPasswordField } from './isPasswordField'

describe('isPasswordField', () => {
  it('should return true if the input type is "password"', () => {
    const inputElement = document.createElement('input')
    inputElement.type = 'password'
    expect(isPasswordField(inputElement)).toBe(true)
  })

  it('should return false if the input type is not "password"', () => {
    const inputElement = document.createElement('input')
    inputElement.type = 'text'
    expect(isPasswordField(inputElement)).toBe(false)
  })

  it('should return false if the input type is empty', () => {
    const inputElement = document.createElement('input')
    inputElement.type = ''
    expect(isPasswordField(inputElement)).toBe(false)
  })

  it('should return false if the input type is undefined', () => {
    const inputElement = document.createElement('input')
    inputElement.removeAttribute('type')
    expect(isPasswordField(inputElement)).toBe(false)
  })
})
