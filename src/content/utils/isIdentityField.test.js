import { isIdentityField } from './isIdentityField'

describe('isIdentityField', () => {
  let inputElement

  beforeEach(() => {
    inputElement = document.createElement('input')
  })

  it('should return true for an input with name containing "name"', () => {
    inputElement.name = 'fullName'
    expect(isIdentityField(inputElement)).toBe(true)
  })

  it('should return true for an input with id containing "email"', () => {
    inputElement.id = 'userEmail'
    expect(isIdentityField(inputElement)).toBe(true)
  })

  it('should return true for an input with placeholder containing "phone"', () => {
    inputElement.placeholder = 'Enter your phone number'
    expect(isIdentityField(inputElement)).toBe(true)
  })

  it('should return true for an input with name containing "address"', () => {
    inputElement.name = 'homeAddress'
    expect(isIdentityField(inputElement)).toBe(true)
  })

  it('should return true for an input with id containing "zip"', () => {
    inputElement.id = 'zipCode'
    expect(isIdentityField(inputElement)).toBe(true)
  })

  it('should return true for an input with placeholder containing "city"', () => {
    inputElement.placeholder = 'City'
    expect(isIdentityField(inputElement)).toBe(true)
  })

  it('should return true for an input with name containing "state"', () => {
    inputElement.name = 'stateRegion'
    expect(isIdentityField(inputElement)).toBe(true)
  })

  it('should return true for an input with id containing "country"', () => {
    inputElement.id = 'countryName'
    expect(isIdentityField(inputElement)).toBe(true)
  })

  it('should return false for an input with unrelated name, id, or placeholder', () => {
    inputElement.name = 'unrelatedField'
    inputElement.id = 'randomId'
    inputElement.placeholder = 'Random Placeholder'
    expect(isIdentityField(inputElement)).toBe(false)
  })

  it('should return false for an input with no name, id, or placeholder', () => {
    expect(isIdentityField(inputElement)).toBe(false)
  })
})
