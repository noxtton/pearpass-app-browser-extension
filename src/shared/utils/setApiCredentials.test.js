import { setApiCredentials } from './setApiCredentials'

global.chrome = {
  storage: {
    local: {
      set: jest.fn()
    }
  },
  runtime: {
    lastError: null
  }
}

describe('setApiCredentials', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    chrome.runtime.lastError = null
  })

  it('should set API credentials successfully', async () => {
    chrome.storage.local.set.mockImplementation((data, callback) => {
      callback()
    })

    const credentials = { token: 'test-token', port: 1234 }
    await expect(setApiCredentials(credentials)).resolves.toBeUndefined()

    expect(chrome.storage.local.set).toHaveBeenCalledWith(
      { apiCredentials: credentials },
      expect.any(Function)
    )
  })

  it('should reject if chrome.runtime.lastError exists', async () => {
    chrome.storage.local.set.mockImplementation((data, callback) => {
      chrome.runtime.lastError = { message: 'Test error' }
      callback()
    })

    const credentials = { token: 'test-token', port: 1234 }
    await expect(setApiCredentials(credentials)).rejects.toThrow(
      'Failed to set API credentials'
    )

    expect(chrome.storage.local.set).toHaveBeenCalledWith(
      { apiCredentials: credentials },
      expect.any(Function)
    )
  })
})
