import { encodeBytes } from './encodeBytes'
import { encodeText } from './encodeText'
import { startMap } from './startMap'

/**
 * CBOR-encode a “none” attestationObject.
 * @param {Uint8Array} authData Raw authenticator data
 * @returns {ArrayBuffer} CBOR encoding of the attestationObject
 */
export const encodeAttestationObject = (authData) => {
  const header = startMap(3)
  const fmtK = encodeText('fmt')
  const fmtV = encodeText('none')
  const stmtK = encodeText('attStmt')
  const stmtV = startMap(0) // empty map
  const authK = encodeText('authData')
  const authV = encodeBytes(authData)

  return new Uint8Array([
    ...header,
    ...fmtK,
    ...fmtV,
    ...stmtK,
    ...stmtV,
    ...authK,
    ...authV
  ]).buffer
}
