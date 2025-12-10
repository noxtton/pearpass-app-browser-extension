import { getApiCredentials } from './getApiCredentials'
import { logger } from './logger'

global.chrome = {
  storage: {
    local: {
      get: jest.fn()
    }
  },
  runtime: {
    lastError: null
  }
}

jest.mock('./logger', () => ({
  logger: {
    error: jest.fn()
  }
}))

describe('getApiCredentials', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    chrome.runtime.lastError = null
  })

  it('should return credentials when they exist in storage', async () => {
    chrome.storage.local.get.mockImplementation((keys, callback) => {
      callback({
        apiCredentials: {
          token: 'test-token',
          port: 8080
        }
      })
    })

    const result = await getApiCredentials()

    expect(chrome.storage.local.get).toHaveBeenCalledWith(
      ['apiCredentials'],
      expect.any(Function)
    )
    expect(result).toEqual({
      token: 'test-token',
      port: 8080
    })
  })

  it('should return null when credentials do not exist in storage', async () => {
    chrome.storage.local.get.mockImplementation((keys, callback) => {
      callback({})
    })

    const result = await getApiCredentials()

    expect(chrome.storage.local.get).toHaveBeenCalledWith(
      ['apiCredentials'],
      expect.any(Function)
    )
    expect(result).toBeNull()
  })

  it('should reject with an error when chrome.runtime.lastError exists', async () => {
    chrome.runtime.lastError = { message: 'Some error' }

    chrome.storage.local.get.mockImplementation((keys, callback) => {
      callback({})
    })

    await expect(getApiCredentials()).rejects.toThrow(
      'Failed to retrieve API credentials'
    )
    expect(logger.error).toHaveBeenCalledWith(
      'Failed to retrieve credentials:',
      chrome.runtime.lastError
    )
  })
})
