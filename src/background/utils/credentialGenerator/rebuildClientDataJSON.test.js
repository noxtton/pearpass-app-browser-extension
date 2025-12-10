import { TextEncoder, TextDecoder } from 'util'

import { rebuildClientDataJSON } from './rebuildClientDataJSON'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

describe('rebuildClientDataJSON', () => {
  it('should correctly construct an ArrayBuffer from the provided data', () => {
    const challengeB64url = 'some-challenge-string'
    const origin = 'https://example.com'
    const type = 'webauthn.create'

    const expectedClientData = {
      type,
      challenge: challengeB64url,
      origin,
      crossOrigin: false
    }

    const result = rebuildClientDataJSON(challengeB64url, origin, type)

    // The result should be an ArrayBuffer
    expect(result.constructor.name).toBe('ArrayBuffer')

    // Decode the ArrayBuffer back to a string to check its content
    const decodedString = new TextDecoder().decode(result)
    const parsedJSON = JSON.parse(decodedString)

    expect(parsedJSON).toEqual(expectedClientData)
  })

  it('should handle different input values correctly', () => {
    const challengeB64url = 'another-challenge-string-123'
    const origin = 'https://sub.domain.org'
    const type = 'webauthn.get'

    const expectedClientData = {
      type,
      challenge: challengeB64url,
      origin,
      crossOrigin: false
    }

    const result = rebuildClientDataJSON(challengeB64url, origin, type)
    const decodedString = new TextDecoder().decode(result)
    const parsedJSON = JSON.parse(decodedString)

    expect(parsedJSON).toEqual(expectedClientData)
  })
})
