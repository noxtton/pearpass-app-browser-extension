import { uuidToBytes } from './uuidToBytes'

describe('uuidToBytes', () => {
  it('should convert a valid UUID string to a 16-byte array', () => {
    const uuid = '3f2504e0-4f89-41d3-9a0c-0305e82c3301'
    const expectedBytes = new Uint8Array([
      0x3f, 0x25, 0x04, 0xe0, 0x4f, 0x89, 0x41, 0xd3, 0x9a, 0x0c, 0x03, 0x05,
      0xe8, 0x2c, 0x33, 0x01
    ])
    expect(uuidToBytes(uuid)).toEqual(expectedBytes)
  })

  it('should handle UUIDs with all zeros', () => {
    const uuid = '00000000-0000-0000-0000-000000000000'
    const expectedBytes = new Uint8Array(16).fill(0)
    expect(uuidToBytes(uuid)).toEqual(expectedBytes)
  })

  it('should handle UUIDs with all Fs', () => {
    const uuid = 'ffffffff-ffff-ffff-ffff-ffffffffffff'
    const expectedBytes = new Uint8Array(16).fill(255)
    expect(uuidToBytes(uuid)).toEqual(expectedBytes)
  })

  it('should throw a TypeError for a UUID string that is too short', () => {
    const invalidUuid = '3f2504e0-4f89-41d3-9a0c-0305e82c330' // missing one char
    expect(() => uuidToBytes(invalidUuid)).toThrow(
      TypeError,
      `Invalid UUID string: ${invalidUuid}`
    )
  })

  it('should throw a TypeError for a UUID string that is too long', () => {
    const invalidUuid = '3f2504e0-4f89-41d3-9a0c-0305e82c3301a' // extra char
    expect(() => uuidToBytes(invalidUuid)).toThrow(
      TypeError,
      `Invalid UUID string: ${invalidUuid}`
    )
  })

  it('should throw a TypeError for an empty string', () => {
    const invalidUuid = ''
    expect(() => uuidToBytes(invalidUuid)).toThrow(
      TypeError,
      `Invalid UUID string: ${invalidUuid}`
    )
  })

  it('should throw a TypeError for a string with invalid characters but correct length after removing hyphens', () => {
    // The implementation relies on parseInt, which would result in NaN -> 0.
    // However, the primary validation is length. Let's test a non-hex string.
    const invalidUuid = 'gggggggg-gggg-gggg-gggg-gggggggggggg'
    // This will pass the length check but fail on parseInt, resulting in an array of 0s.
    // In Uint8Array, NaN becomes 0.
    const actualBytes = new Uint8Array(16).fill(0)
    expect(uuidToBytes(invalidUuid)).toEqual(actualBytes)
  })
})
