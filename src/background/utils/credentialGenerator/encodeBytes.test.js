import { encodeBytes } from './encodeBytes'

describe('encodeBytes', () => {
  it('should encode a byte array with length < 24', () => {
    const data = new Uint8Array([1, 2, 3])
    const expected = new Uint8Array([0x43, 1, 2, 3])
    expect(encodeBytes(data)).toEqual(expected)
  })

  it('should encode a byte array with length 23', () => {
    const data = new Uint8Array(23).fill(1)
    const expectedHeader = [0x57]
    const expected = new Uint8Array([...expectedHeader, ...data])
    expect(encodeBytes(data)).toEqual(expected)
  })

  it('should encode a byte array with length 24', () => {
    const data = new Uint8Array(24).fill(2)
    const expectedHeader = [0x58, 24]
    const expected = new Uint8Array([...expectedHeader, ...data])
    expect(encodeBytes(data)).toEqual(expected)
  })

  it('should encode a byte array with length 255', () => {
    const data = new Uint8Array(255).fill(3)
    const expectedHeader = [0x58, 255]
    const expected = new Uint8Array([...expectedHeader, ...data])
    expect(encodeBytes(data)).toEqual(expected)
  })

  it('should encode a byte array with length 256', () => {
    const data = new Uint8Array(256).fill(4)
    const expectedHeader = [0x59, 1, 0]
    const expected = new Uint8Array([...expectedHeader, ...data])
    expect(encodeBytes(data)).toEqual(expected)
  })

  it('should encode a byte array with length 65535', () => {
    const data = new Uint8Array(65535).fill(5)
    const expectedHeader = [0x59, 0xff, 0xff]
    const expected = new Uint8Array([...expectedHeader, ...data])
    expect(encodeBytes(data)).toEqual(expected)
  })

  it('should throw a RangeError for data length >= 65536', () => {
    const data = new Uint8Array(65536)
    expect(() => encodeBytes(data)).toThrow(
      new RangeError('encodeBytes: length must be < 65536')
    )
  })

  it('should correctly encode an empty byte array', () => {
    const data = new Uint8Array([])
    const expected = new Uint8Array([0x40])
    expect(encodeBytes(data)).toEqual(expected)
  })
})
