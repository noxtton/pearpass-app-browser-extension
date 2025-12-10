/**
 * Convert a Base64 string to a byte array.
 * @param {string} str Base64 string
 * @returns {ArrayBuffer} Decoded bytes
 */
export const base64ToArrayBuffer = (str) => {
  const binaryStr = atob(str)
  const len = binaryStr.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryStr.charCodeAt(i)
  }
  return bytes.buffer
}
