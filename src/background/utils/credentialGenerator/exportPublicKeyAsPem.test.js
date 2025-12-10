Object.defineProperty(global.self, 'crypto', {
  value: {
    subtle: {
      exportKey: jest.fn(() => new Uint8Array(65).buffer)
    }
  }
})

import { exportPublicKeyAsPem } from './exportPublicKeyAsPem'
import { arrayBufferToBase64Url } from '../../../shared/utils/arrayBufferToBase64Url'

jest.mock('../../../shared/utils/arrayBufferToBase64Url')

describe('exportPublicKeyAsPem', () => {
  const mockPublicKey = { type: 'public' }
  const mockSpki = new ArrayBuffer(8)
  const mockBase64Url = 'c29tZS1yYW5kb20tYmFzZTY0LXVybC1zdHJpbmc'

  beforeEach(() => {
    jest.clearAllMocks()

    arrayBufferToBase64Url.mockReturnValue(mockBase64Url)

    global.crypto.subtle.exportKey.mockResolvedValue(mockSpki)
  })

  it('should export a public key in SPKI format', async () => {
    await exportPublicKeyAsPem(mockPublicKey)
    expect(crypto.subtle.exportKey).toHaveBeenCalledWith('spki', mockPublicKey)
  })

  it('should convert the exported SPKI key to a Base64URL string', async () => {
    await exportPublicKeyAsPem(mockPublicKey)
    expect(arrayBufferToBase64Url).toHaveBeenCalledWith(mockSpki)
  })

  it('should return the Base64URL representation of the public key', async () => {
    const result = await exportPublicKeyAsPem(mockPublicKey)
    expect(result).toBe(mockBase64Url)
  })

  it('should propagate errors from crypto.subtle.exportKey', async () => {
    const error = new Error('Export failed')
    crypto.subtle.exportKey.mockRejectedValue(error)

    await expect(exportPublicKeyAsPem(mockPublicKey)).rejects.toThrow(error)
  })

  it('should not call arrayBufferToBase64Url if exportKey fails', async () => {
    const error = new Error('Export failed')
    crypto.subtle.exportKey.mockRejectedValue(error)

    await expect(exportPublicKeyAsPem(mockPublicKey)).rejects.toThrow(error)
    expect(arrayBufferToBase64Url).not.toHaveBeenCalled()
  })
})
