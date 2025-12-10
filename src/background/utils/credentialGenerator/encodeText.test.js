import { TextEncoder, TextDecoder } from 'util'

import { encodeText } from './encodeText'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

describe('encodeText', () => {
  it('should encode an empty string', () => {
    const text = ''
    const expected = new Uint8Array([0x60])
    expect(encodeText(text)).toEqual(expected)
  })

  it('should encode a short string (length < 24)', () => {
    const text = 'hello'
    const expected = new Uint8Array([0x65, 0x68, 0x65, 0x6c, 0x6c, 0x6f]) // 0x60 | 5, 'h', 'e', 'l', 'l', 'o'
    expect(encodeText(text)).toEqual(expected)
  })

  it('should encode a string with length 23', () => {
    const text = 'a'.repeat(23)
    const textBytes = new TextEncoder().encode(text)
    const expected = new Uint8Array([0x60 | 23, ...textBytes])
    expect(encodeText(text)).toEqual(expected)
  })

  it('should encode a string with length 24', () => {
    const text = 'a'.repeat(24)
    const textBytes = new TextEncoder().encode(text)
    const expected = new Uint8Array([0x78, 24, ...textBytes])
    expect(encodeText(text)).toEqual(expected)
  })

  it('should encode a string with length 255', () => {
    const text = 'b'.repeat(255)
    const textBytes = new TextEncoder().encode(text)
    const expected = new Uint8Array([0x78, 255, ...textBytes])
    expect(encodeText(text)).toEqual(expected)
  })

  it('should encode a string with length 256', () => {
    const text = 'c'.repeat(256)
    const textBytes = new TextEncoder().encode(text)
    const expected = new Uint8Array([0x79, 1, 0, ...textBytes]) // 256 = 0x0100
    expect(encodeText(text)).toEqual(expected)
  })

  it('should encode a string with length 65535', () => {
    const text = 'd'.repeat(65535)
    const textBytes = new TextEncoder().encode(text)
    const expected = new Uint8Array([0x79, 0xff, 0xff, ...textBytes]) // 65535 = 0xffff
    expect(encodeText(text)).toEqual(expected)
  })

  it('should throw a RangeError for a string with length >= 65536', () => {
    const text = 'e'.repeat(65536)
    expect(() => encodeText(text)).toThrow('encodeText: length must be < 65536')
  })

  it('should correctly handle multi-byte UTF-8 characters', () => {
    const text = '你好' // Each character is 3 bytes in UTF-8
    // '你好' in UTF-8 is [0xe4, 0xbd, 0xa0, 0xe5, 0xa5, 0xbd]
    const textBytes = new Uint8Array([0xe4, 0xbd, 0xa0, 0xe5, 0xa5, 0xbd])
    const expected = new Uint8Array([0x66, ...textBytes]) // 0x60 | 6
    expect(encodeText(text)).toEqual(expected)
  })
})
