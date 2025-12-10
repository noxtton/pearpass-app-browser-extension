import { arrayBufferToBase64Url } from '../../../shared/utils/arrayBufferToBase64Url'

/**
 * Export a CryptoKey public key as PEM (Base64URL).
 * @param {CryptoKey} publicKey ECDSA P-256 public key
 * @returns {Promise<string>} PEM string (Base64URL)
 */
export const exportPublicKeyAsPem = async (publicKey) => {
  const spki = await crypto.subtle.exportKey('spki', publicKey)

  return arrayBufferToBase64Url(spki)
}
