import { base64UrlToArrayBuffer } from '../../../shared/utils/base64UrlToArrayBuffer'

/**
 * Import a PEM-encoded EC private key (PKCS#8) into WebCrypto.
 * @param {string} pemPrivateKey PEM string
 * @returns {Promise<CryptoKey>} ECDSA P-256 private key
 * @throws {Error} If import fails
 */
export const importPrivateKeyFromPem = async (pemPrivateKey) => {
  const bytesInDerFormat = base64UrlToArrayBuffer(pemPrivateKey)
  return crypto.subtle.importKey(
    'pkcs8',
    bytesInDerFormat,
    {
      name: 'ECDSA',
      namedCurve: 'P-256'
    },
    false, // non‑extractable for extra safety
    ['sign']
  )
}
