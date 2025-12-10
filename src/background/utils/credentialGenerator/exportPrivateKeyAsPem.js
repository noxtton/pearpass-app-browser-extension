import { arrayBufferToBase64Url } from '../../../shared/utils/arrayBufferToBase64Url'

/**
 * Export a private key as PEM (Base64URL).
 * @param {CryptoKey} privateKey ECDSA P-256 private key
 * @returns {Promise<string>} PEM string (Base64URL)
 */
export const exportPrivateKeyAsPem = async (privateKey) => {
  const pkcs8 = await crypto.subtle.exportKey('pkcs8', privateKey)
  return arrayBufferToBase64Url(pkcs8)
}
