/**
 * Begin a CBOR map of the specified size.
 * @param {number} size Number of key/value pairs (< 256)
 * @returns {Uint8Array} CBOR map header
 * @throws {RangeError} If size ≥ 256
 */
export const startMap = (size) => {
  if (size < 24) {
    return Uint8Array.from([0xa0 | size])
  }
  if (size < 0x100) {
    return Uint8Array.from([0xb8, size])
  }

  throw new RangeError('startMap: size must be < 256')
}
