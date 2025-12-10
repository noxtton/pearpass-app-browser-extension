/**
 * Convert a UUID string to a 16-byte array.
 * @param {string} uuid UUID (e.g. "3f2504e0-4f89-41d3-9a0c-0305e82c3301")
 * @returns {Uint8Array} 16-byte representation
 * @throws {TypeError} If the UUID is invalid
 */
export const uuidToBytes = (uuid) => {
  const hex = uuid.replace(/-/g, '')
  if (hex.length !== 32) {
    throw new TypeError(`Invalid UUID string: ${uuid}`)
  }

  const bytes = new Uint8Array(16)
  for (let i = 0; i < 16; i++) {
    // Parse two hex chars per byte
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16)
  }

  return bytes
}
