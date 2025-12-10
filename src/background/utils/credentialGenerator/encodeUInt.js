const MAX_UINT32 = 0x100000000

/**
 * Encode a non-negative integer less than 2^32 as a CBOR unsigned integer.
 * @param {number} value Integer in [0, 2^32)
 * @returns {Uint8Array} CBOR encoding of the integer
 * @throws {RangeError} If value ≥ 2^32 or value < 0
 */
export const encodeUInt = (value) => {
  if (value < 24) return Uint8Array.from([value])
  if (value < 0x100) return Uint8Array.from([0x18, value])
  if (value < 0x10000) return Uint8Array.from([0x19, value >> 8, value & 0xff])
  if (value < MAX_UINT32) {
    return Uint8Array.from([
      0x1a,
      (value >>> 24) & 0xff,
      (value >>> 16) & 0xff,
      (value >>> 8) & 0xff,
      value & 0xff
    ])
  }
  throw new RangeError('encodeUInt: value must be < 2^32')
}
