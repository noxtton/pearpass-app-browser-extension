import { closeIframe } from './closeIframe'

describe('closeIframe', () => {
  beforeEach(() => {
    jest.spyOn(window.parent, 'postMessage').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should send the correct data object with iframeId and iframeType', () => {
    const iframeId = 'testIframeId'
    const iframeType = 'testIframeType'

    closeIframe({ iframeId, iframeType })

    expect(window.parent.postMessage).toHaveBeenCalledWith(
      {
        type: 'close',
        data: {
          iframeId,
          iframeType
        }
      },
      '*'
    )
  })

  it('should handle missing iframeId and iframeType gracefully', () => {
    closeIframe({})

    expect(window.parent.postMessage).toHaveBeenCalledWith(
      {
        type: 'close',
        data: {
          iframeId: undefined,
          iframeType: undefined
        }
      },
      '*'
    )
  })
})
