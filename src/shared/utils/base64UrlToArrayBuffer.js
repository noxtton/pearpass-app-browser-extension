import { base64ToArrayBuffer } from './base64ToArrayBuffer'
import { base64UrlToBase64 } from './base64UrlToBase64'

/**
 * Convert a Base64URL string to a byte array.
 * @param {string} str Base64URL string
 * @returns {ArrayBuffer} Decoded bytes
 */
export const base64UrlToArrayBuffer = (str) => {
  const normalized = base64UrlToBase64(str)
  return base64ToArrayBuffer(normalized)
}
