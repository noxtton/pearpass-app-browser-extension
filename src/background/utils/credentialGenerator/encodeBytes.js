/**
 * Encode a byte array as a CBOR byte string.
 * @param {Uint8Array} data Byte array to encode
 * @returns {Uint8Array} CBOR encoding of the byte string
 * @throws {RangeError} If data length ≥ 65536
 */
export const encodeBytes = (data) => {
  const len = data.length
  let header
  if (len < 24) {
    header = Uint8Array.from([0x40 | len])
  } else if (len < 0x100) {
    header = Uint8Array.from([0x58, len])
  } else if (len < 0x10000) {
    header = Uint8Array.from([0x59, len >> 8, len & 0xff])
  } else {
    throw new RangeError('encodeBytes: length must be < 65536')
  }

  return new Uint8Array([...header, ...data])
}
