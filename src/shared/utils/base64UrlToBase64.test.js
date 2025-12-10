import { base64UrlToBase64 } from './base64UrlToBase64'

describe('base64UrlToBase64', () => {
  it('should correctly convert a Base64URL string with hyphens to a Base64 string', () => {
    const base64Url = 'Zm9vYmFy-g'
    const expected = 'Zm9vYmFy+g=='
    expect(base64UrlToBase64(base64Url)).toBe(expected)
  })

  it('should correctly convert a Base64URL string with underscores to a Base64 string', () => {
    const base64Url = 'Zm9vYmFy_g'
    const expected = 'Zm9vYmFy/g=='
    expect(base64UrlToBase64(base64Url)).toBe(expected)
  })

  it('should correctly convert a Base64URL string with both hyphens and underscores', () => {
    const base64Url = 'Zm9vYmFy-_g'
    const expected = 'Zm9vYmFy+/g='
    expect(base64UrlToBase64(base64Url)).toBe(expected)
  })

  it('should add correct padding when the length is congruent to 2 mod 4', () => {
    const base64Url = 'Zm9vYg'
    const expected = 'Zm9vYg=='
    expect(base64UrlToBase64(base64Url)).toBe(expected)
  })

  it('should add correct padding when the length is congruent to 3 mod 4', () => {
    const base64Url = 'Zm9vYmE'
    const expected = 'Zm9vYmE='
    expect(base64UrlToBase64(base64Url)).toBe(expected)
  })

  it('should not add padding when the length is a multiple of 4', () => {
    const base64Url = 'Zm9vYmFy'
    const expected = 'Zm9vYmFy'
    expect(base64UrlToBase64(base64Url)).toBe(expected)
  })

  it('should return an empty string when given an empty string', () => {
    const base64Url = ''
    const expected = ''
    expect(base64UrlToBase64(base64Url)).toBe(expected)
  })

  it('should handle a complex string requiring all transformations', () => {
    const base64Url = 'AQAB-_c'
    const expected = 'AQAB+/c='
    expect(base64UrlToBase64(base64Url)).toBe(expected)
  })
})
