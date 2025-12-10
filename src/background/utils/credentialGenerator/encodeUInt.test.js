import { encodeUInt } from './encodeUInt'

describe('encodeUInt', () => {
  test('should encode 0 as a single byte', () => {
    expect(encodeUInt(0)).toEqual(Uint8Array.from([0]))
  })

  test('should encode 23 as a single byte', () => {
    expect(encodeUInt(23)).toEqual(Uint8Array.from([23]))
  })

  test('should encode 24 with a 0x18 prefix', () => {
    expect(encodeUInt(24)).toEqual(Uint8Array.from([0x18, 24]))
  })

  test('should encode 255 with a 0x18 prefix', () => {
    expect(encodeUInt(255)).toEqual(Uint8Array.from([0x18, 255]))
  })

  test('should encode 256 with a 0x19 prefix', () => {
    expect(encodeUInt(256)).toEqual(Uint8Array.from([0x19, 0x01, 0x00]))
  })

  test('should encode 65535 with a 0x19 prefix', () => {
    expect(encodeUInt(65535)).toEqual(Uint8Array.from([0x19, 0xff, 0xff]))
  })

  test('should encode 65536 with a 0x1a prefix', () => {
    expect(encodeUInt(65536)).toEqual(
      Uint8Array.from([0x1a, 0x00, 0x01, 0x00, 0x00])
    )
  })

  test('should encode 4294967295 (2^32 - 1) with a 0x1a prefix', () => {
    expect(encodeUInt(0xffffffff)).toEqual(
      Uint8Array.from([0x1a, 0xff, 0xff, 0xff, 0xff])
    )
  })

  test('should throw RangeError for values >= 2^32', () => {
    expect(() => encodeUInt(0x100000000)).toThrow(
      'encodeUInt: value must be < 2^32'
    )
  })
})
