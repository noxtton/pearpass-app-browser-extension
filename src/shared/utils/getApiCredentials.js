import { logger } from './logger'

/**
 * @returns {Promise<{ token: string, port: number } | null>}
 * @throws {Error}
 */
export const getApiCredentials = async () =>
  new Promise((resolve, reject) => {
    chrome.storage.local.get(['apiCredentials'], (result) => {
      if (chrome.runtime.lastError) {
        logger.error(
          'Failed to retrieve credentials:',
          chrome.runtime.lastError
        )

        reject(new Error('Failed to retrieve API credentials'))
      } else {
        resolve(
          result.apiCredentials
            ? {
                token: result.apiCredentials.token,
                port: result.apiCredentials.port
              }
            : null
        )
      }
    })
  })
