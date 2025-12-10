/**
 * @param {Object} param0
 * @param {string} param0.token
 * @param {number} param0.port
 * @returns {Promise<void>}
 */
export const setApiCredentials = async ({ token, port }) =>
  new Promise((resolve, reject) => {
    const apiCredentials = {
      token,
      port
    }
    chrome.storage.local.set({ apiCredentials }, () => {
      if (chrome.runtime.lastError) {
        reject(new Error('Failed to set API credentials'))
      } else {
        resolve()
      }
    })
  })
