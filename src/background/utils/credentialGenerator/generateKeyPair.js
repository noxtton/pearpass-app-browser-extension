/**
 * Generate an ECDSA P-256 key pair.
 * @returns {Promise<CryptoKeyPair>} Key pair for sign/verify
 */
export const generateKeyPair = async () =>
  await crypto.subtle.generateKey(
    { name: 'ECDSA', namedCurve: 'P-256' },
    true,
    ['sign', 'verify']
  )
