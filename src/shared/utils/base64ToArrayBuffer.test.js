import { base64ToArrayBuffer } from './base64ToArrayBuffer'

global.atob = (str) => Buffer.from(str, 'base64').toString('binary')

describe('base64ToArrayBuffer', () => {
  it('should convert a valid base64 string to an ArrayBuffer', () => {
    const base64Str = 'SGVsbG8sIFdvcmxkIQ=='
    const result = base64ToArrayBuffer(base64Str)

    const expectedBytes = new Uint8Array([
      72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33
    ])

    expect(result).toBeInstanceOf(ArrayBuffer)
    expect(new Uint8Array(result)).toEqual(expectedBytes)
  })

  it('should return an empty ArrayBuffer for an empty string', () => {
    const base64Str = ''
    const result = base64ToArrayBuffer(base64Str)

    expect(result).toBeInstanceOf(ArrayBuffer)
    expect(result.byteLength).toBe(0)
  })

  it('should correctly handle base64 strings without padding', () => {
    const base64Str = 'Zm9v'
    const result = base64ToArrayBuffer(base64Str)

    const expectedBytes = new Uint8Array([102, 111, 111])

    expect(result).toBeInstanceOf(ArrayBuffer)
    expect(new Uint8Array(result)).toEqual(expectedBytes)
  })

  it('should handle a single character string', () => {
    const base64Str = 'QQ=='
    const result = base64ToArrayBuffer(base64Str)

    const expectedBytes = new Uint8Array([65])

    expect(result).toBeInstanceOf(ArrayBuffer)
    expect(new Uint8Array(result)).toEqual(expectedBytes)
  })
})
