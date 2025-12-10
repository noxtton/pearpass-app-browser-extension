import { TextEncoder, TextDecoder } from 'util'

Object.defineProperty(global.self, 'crypto', {
  value: {
    subtle: {
      digest: jest.fn(() => new Uint8Array(32).buffer),
      exportKey: jest.fn(() => new Uint8Array(65).buffer),
      sign: jest.fn(() => new ArrayBuffer(64))
    }
  }
})

import { buildAuthenticatorData } from './buildAuthenticatorData'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

jest.mock('./encodeBytes', () => ({
  encodeBytes: jest.fn((bytes) => {
    const prefix = [0x40 | bytes.length]
    return new Uint8Array([...prefix, ...bytes])
  })
}))

jest.mock('./encodeUInt', () => ({
  encodeUInt: jest.fn((num) => new Uint8Array([num]))
}))

jest.mock('./startMap', () => ({
  startMap: jest.fn((num) => new Uint8Array([0xa0 | num]))
}))

describe('buildAuthenticatorData', () => {
  let publicKey
  const rpId = 'example.com'
  const credentialId = new Uint8Array([1, 2, 3, 4]).buffer

  const rpIdHash = new Uint8Array(32).fill(0)

  test('returns a Uint8Array of the correct minimum length', async () => {
    const authData = await buildAuthenticatorData(rpId, credentialId, publicKey)
    expect(authData).toBeInstanceOf(Uint8Array)

    expect(authData.byteLength).toBeGreaterThanOrEqual(68)
  })

  test('correctly encodes rpIdHash, flags, signCount, aaguid, credIdLen and credId', async () => {
    const authData = await buildAuthenticatorData(rpId, credentialId, publicKey)

    expect(authData.slice(0, 32)).toEqual(rpIdHash)

    expect(authData[32]).toBe(0x5d)

    expect(Array.from(authData.slice(33, 37))).toEqual([0, 0, 0, 0])

    expect(Array.from(authData.slice(37, 53))).toEqual(new Array(16).fill(0))

    expect(authData[53]).toBe(0x00)
    expect(authData[54]).toBe(0x04)

    expect(Array.from(authData.slice(55, 59))).toEqual([1, 2, 3, 4])
  })

  test('coseKey starts with CBOR map header 0xa5 and contains the key type tag', async () => {
    const authData = await buildAuthenticatorData(rpId, credentialId, publicKey)

    const header = authData[59]
    expect(header).toBe(0xa5)

    expect(authData[60]).toBe(0x01)
  })
})
