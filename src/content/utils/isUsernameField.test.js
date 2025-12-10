import { isUsernameField } from './isUsernameField'

describe('isUsernameField', () => {
  it('should return true for input elements of type "email"', () => {
    const element = { type: 'email' }
    expect(isUsernameField(element)).toBe(true)
  })

  it('should return true for input elements of type "text" with name containing "user"', () => {
    const element = { type: 'text', name: 'username' }
    expect(isUsernameField(element)).toBe(true)
  })

  it('should return true for input elements of type "text" with name containing "email"', () => {
    const element = { type: 'text', name: 'userEmail' }
    expect(isUsernameField(element)).toBe(true)
  })

  it('should return true for input elements of type "text" with name containing "login"', () => {
    const element = { type: 'text', name: 'loginField' }
    expect(isUsernameField(element)).toBe(true)
  })

  it('should return false for input elements of type "text" with unrelated names', () => {
    const element = { type: 'text', name: 'password' }
    expect(isUsernameField(element)).toBe(false)
  })

  it('should return false for input elements of other types', () => {
    const element = { type: 'password', name: 'userPassword' }
    expect(isUsernameField(element)).toBe(false)
  })

  it('should handle elements with no name property gracefully', () => {
    const element = { type: 'text' }
    expect(isUsernameField(element)).toBe(false)
  })

  it('should handle elements with an empty name property gracefully', () => {
    const element = { type: 'text', name: '' }
    expect(isUsernameField(element)).toBe(false)
  })
})
