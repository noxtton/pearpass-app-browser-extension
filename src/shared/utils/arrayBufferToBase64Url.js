/**
 * Base64URL-encode an ArrayBuffer.
 * @param {ArrayBuffer} buffer Data to encode
 * @returns {string} Base64URL string
 */
export const arrayBufferToBase64Url = (buffer) => {
  const uint8Array = new Uint8Array(buffer)
  const binaryString = String.fromCharCode(...uint8Array)
  const base64 = btoa(binaryString)
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}
