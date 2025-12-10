/**
 * Rebuild clientDataJSON for a WebAuthn create call.
 * @param {string} challengeB64url Challenge (Base64URL)
 * @param {string} origin Relying party origin
 * @param {string} type Operation type (e.g. "webauthn.create")
 * @returns {ArrayBuffer} JSON-encoded clientData
 */
export const rebuildClientDataJSON = (challengeB64url, origin, type) => {
  const clientData = {
    type,
    challenge: challengeB64url,
    origin,
    crossOrigin: false
  }

  return new TextEncoder().encode(JSON.stringify(clientData)).buffer
}
