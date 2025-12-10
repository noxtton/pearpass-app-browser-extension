/**
 * Encode a UTF-8 string as a CBOR text string.
 * @param {string} text String to encode
 * @returns {Uint8Array} CBOR encoding of the text string
 * @throws {RangeError} If encoded length ≥ 65536
 */
export const encodeText = (text) => {
  const utf8 = new TextEncoder().encode(text)
  const len = utf8.length
  let header
  if (len < 24) {
    header = Uint8Array.from([0x60 | len])
  } else if (len < 0x100) {
    header = Uint8Array.from([0x78, len])
  } else if (len < 0x10000) {
    header = Uint8Array.from([0x79, len >> 8, len & 0xff])
  } else {
    throw new RangeError('encodeText: length must be < 65536')
  }

  return new Uint8Array([...header, ...utf8])
}
