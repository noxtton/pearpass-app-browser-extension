Object.defineProperty(global.self, 'crypto', {
  value: {
    subtle: {
      digest: jest.fn(() => new Uint8Array(32).buffer),
      exportKey: jest.fn(() => new Uint8Array(65).buffer),
      sign: jest.fn(() => new ArrayBuffer(64))
    }
  }
})

import { exportPrivateKeyAsPem } from './exportPrivateKeyAsPem'
import { arrayBufferToBase64Url } from '../../../shared/utils/arrayBufferToBase64Url'

jest.mock('../../../shared/utils/arrayBufferToBase64Url', () => ({
  arrayBufferToBase64Url: jest.fn()
}))

describe('exportPrivateKeyAsPem', () => {
  const mockPrivateKey = { type: 'private' }
  const mockPkcs8 = new ArrayBuffer(8)
  const mockBase64Url = 'bW9ja2VkLXJlc3VsdA'

  beforeEach(() => {
    jest.clearAllMocks()

    global.crypto.subtle.exportKey.mockResolvedValue(mockPkcs8)

    arrayBufferToBase64Url.mockReturnValue(mockBase64Url)
  })

  it('should export a private key as a PEM string in Base64URL format', async () => {
    const result = await exportPrivateKeyAsPem(mockPrivateKey)

    expect(crypto.subtle.exportKey).toHaveBeenCalledWith(
      'pkcs8',
      mockPrivateKey
    )
    expect(arrayBufferToBase64Url).toHaveBeenCalledWith(mockPkcs8)
    expect(result).toBe(mockBase64Url)
  })

  it('should throw an error if crypto.subtle.exportKey fails', async () => {
    const exportError = new Error('Failed to export key')
    crypto.subtle.exportKey.mockRejectedValue(exportError)

    await expect(exportPrivateKeyAsPem(mockPrivateKey)).rejects.toThrow(
      exportError
    )
    expect(arrayBufferToBase64Url).not.toHaveBeenCalled()
  })

  it('should throw an error if arrayBufferToBase64Url fails', async () => {
    const conversionError = new Error('Failed to convert buffer')
    arrayBufferToBase64Url.mockImplementation(() => {
      throw conversionError
    })

    await expect(exportPrivateKeyAsPem(mockPrivateKey)).rejects.toThrow(
      conversionError
    )
    expect(crypto.subtle.exportKey).toHaveBeenCalledWith(
      'pkcs8',
      mockPrivateKey
    )
  })
})
