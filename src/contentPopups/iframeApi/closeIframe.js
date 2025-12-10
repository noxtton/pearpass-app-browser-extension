/**
 *
 * @param {Object} params
 * @param {string} params.iframeId
 * @param {string} params.iframeType
 */
export const closeIframe = ({ iframeId, iframeType }) => {
  window.parent.postMessage(
    {
      type: 'close',

      data: {
        iframeId,
        iframeType
      }
    },
    '*'
  )
}
