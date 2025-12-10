import { TextEncoder } from 'util'

import { arrayBufferToBase64Url } from './arrayBufferToBase64Url'

describe('arrayBufferToBase64Url', () => {
  it('should correctly encode an ArrayBuffer to a Base64URL string', () => {
    const text = 'Hello, world!'
    const buffer = new TextEncoder().encode(text).buffer
    const expected = 'SGVsbG8sIHdvcmxkIQ'
    expect(arrayBufferToBase64Url(buffer)).toBe(expected)
  })

  it('should handle characters that need replacement (+ and /)', () => {
    const buffer = new Uint8Array([251, 239, 191]).buffer
    const expected = '---_'
    expect(arrayBufferToBase64Url(buffer)).toBe(expected)
  })

  it('should remove padding characters (=)', () => {
    const text = 'abcde'
    const buffer = new TextEncoder().encode(text).buffer
    const expected = 'YWJjZGU'
    expect(arrayBufferToBase64Url(buffer)).toBe(expected)
  })

  it('should handle an empty ArrayBuffer', () => {
    const buffer = new ArrayBuffer(0)
    const expected = ''
    expect(arrayBufferToBase64Url(buffer)).toBe(expected)
  })

  it('should handle a more complex byte array', () => {
    const buffer = new Uint8Array([
      0, 1, 2, 3, 4, 5, 250, 251, 252, 253, 254, 255
    ]).buffer
    const expected = 'AAECAwQF-vv8_f7_'
    expect(arrayBufferToBase64Url(buffer)).toBe(expected)
  })
})
