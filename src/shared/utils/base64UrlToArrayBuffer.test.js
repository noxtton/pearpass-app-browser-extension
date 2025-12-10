import { base64ToArrayBuffer } from './base64ToArrayBuffer'
import { base64UrlToArrayBuffer } from './base64UrlToArrayBuffer'
import { base64UrlToBase64 } from './base64UrlToBase64'

jest.mock('./base64ToArrayBuffer', () => ({
  base64ToArrayBuffer: jest.fn()
}))

jest.mock('./base64UrlToBase64', () => ({
  base64UrlToBase64: jest.fn()
}))

describe('base64UrlToArrayBuffer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should convert a base64url string to a base64 string and then to an ArrayBuffer', () => {
    const base64UrlStr = 'SGVsbG8sIFdvcmxk' // "Hello, World" in base64url
    const base64Str = 'SGVsbG8sIFdvcmxk==' // "Hello, World" in base64
    const expectedArrayBuffer = new ArrayBuffer(12)

    base64UrlToBase64.mockReturnValue(base64Str)
    base64ToArrayBuffer.mockReturnValue(expectedArrayBuffer)

    const result = base64UrlToArrayBuffer(base64UrlStr)

    expect(base64UrlToBase64).toHaveBeenCalledWith(base64UrlStr)
    expect(base64ToArrayBuffer).toHaveBeenCalledWith(base64Str)
    expect(result).toBe(expectedArrayBuffer)
  })

  it('should handle empty strings', () => {
    const base64UrlStr = ''
    const base64Str = ''
    const expectedArrayBuffer = new ArrayBuffer(0)

    base64UrlToBase64.mockReturnValue(base64Str)
    base64ToArrayBuffer.mockReturnValue(expectedArrayBuffer)

    const result = base64UrlToArrayBuffer(base64UrlStr)

    expect(base64UrlToBase64).toHaveBeenCalledWith(base64UrlStr)
    expect(base64ToArrayBuffer).toHaveBeenCalledWith(base64Str)
    expect(result).toBe(expectedArrayBuffer)
  })

  it('should correctly handle strings with URL-specific characters', () => {
    const base64UrlStr = 'Zm9v-_Y' // Represents some binary data
    const base64Str = 'Zm9v+/Y=' // The base64 equivalent
    const expectedArrayBuffer = new ArrayBuffer(4)

    base64UrlToBase64.mockReturnValue(base64Str)
    base64ToArrayBuffer.mockReturnValue(expectedArrayBuffer)

    const result = base64UrlToArrayBuffer(base64UrlStr)

    expect(base64UrlToBase64).toHaveBeenCalledWith(base64UrlStr)
    expect(base64ToArrayBuffer).toHaveBeenCalledWith(base64Str)
    expect(result).toBe(expectedArrayBuffer)
  })
})
