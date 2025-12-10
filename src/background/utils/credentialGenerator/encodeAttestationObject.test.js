import { encodeAttestationObject } from './encodeAttestationObject'
import { encodeBytes } from './encodeBytes'
import { encodeText } from './encodeText'
import { startMap } from './startMap'

jest.mock('./encodeBytes', () => ({
  encodeBytes: jest.fn()
}))

jest.mock('./encodeText', () => ({
  encodeText: jest.fn()
}))

jest.mock('./startMap', () => ({
  startMap: jest.fn()
}))

describe('encodeAttestationObject', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should correctly CBOR-encode a "none" attestation object', () => {
    const authData = new Uint8Array([1, 2, 3, 4, 5])

    const mockHeader = new Uint8Array([0xa3])
    const mockFmtK = new Uint8Array([0x66, 0x6d, 0x74])
    const mockFmtV = new Uint8Array([0x6e, 0x6f, 0x6e, 0x65])
    const mockStmtK = new Uint8Array([0x61, 0x74, 0x74, 0x53, 0x74, 0x6d, 0x74])
    const mockStmtV = new Uint8Array([0xa0])
    const mockAuthK = new Uint8Array([
      0x61, 0x75, 0x74, 0x68, 0x44, 0x61, 0x74, 0x61
    ])
    const mockAuthV = new Uint8Array([0x45, 1, 2, 3, 4, 5])

    startMap.mockImplementation((size) => {
      if (size === 3) return mockHeader
      if (size === 0) return mockStmtV
      return new Uint8Array()
    })

    encodeText.mockImplementation((text) => {
      if (text === 'fmt') return mockFmtK
      if (text === 'none') return mockFmtV
      if (text === 'attStmt') return mockStmtK
      if (text === 'authData') return mockAuthK
      return new Uint8Array()
    })

    encodeBytes.mockReturnValue(mockAuthV)

    const result = encodeAttestationObject(authData)

    expect(startMap).toHaveBeenCalledWith(3)
    expect(encodeText).toHaveBeenCalledWith('fmt')
    expect(encodeText).toHaveBeenCalledWith('none')
    expect(encodeText).toHaveBeenCalledWith('attStmt')
    expect(startMap).toHaveBeenCalledWith(0)
    expect(encodeText).toHaveBeenCalledWith('authData')
    expect(encodeBytes).toHaveBeenCalledWith(authData)

    const expectedArray = new Uint8Array([
      ...mockHeader,
      ...mockFmtK,
      ...mockFmtV,
      ...mockStmtK,
      ...mockStmtV,
      ...mockAuthK,
      ...mockAuthV
    ])

    expect(result).toBeInstanceOf(ArrayBuffer)
    expect(new Uint8Array(result)).toEqual(expectedArray)
  })

  it('should handle empty authData', () => {
    const authData = new Uint8Array([])
    encodeBytes.mockReturnValue(new Uint8Array([0x40]))

    const result = encodeAttestationObject(authData)

    expect(encodeBytes).toHaveBeenCalledWith(authData)
    expect(result).toBeInstanceOf(ArrayBuffer)

    expect(result.byteLength).toBeGreaterThan(0)
  })
})
