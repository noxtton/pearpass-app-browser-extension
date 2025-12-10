import { uuidv4 } from './uuidv4'

describe('uuidv4', () => {
  // Mocking the global crypto object which is not available in JSDOM
  const mockGetRandomValues = jest.fn().mockImplementation((buffer) => {
    for (let i = 0; i < buffer.length; i++) {
      buffer[i] = Math.floor(Math.random() * 256)
    }
    return buffer
  })

  beforeAll(() => {
    Object.defineProperty(global, 'crypto', {
      value: {
        getRandomValues: mockGetRandomValues
      },
      writable: true
    })
  })

  afterEach(() => {
    mockGetRandomValues.mockClear()
  })

  it('should generate a string that conforms to the UUID v4 format', () => {
    const uuid = uuidv4()
    const uuidV4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    expect(uuid).toMatch(uuidV4Regex)
  })

  it('should generate a unique UUID on each call', () => {
    const uuid1 = uuidv4()
    const uuid2 = uuidv4()
    expect(uuid1).not.toBe(uuid2)
  })

  it('should call crypto.getRandomValues to generate random numbers', () => {
    uuidv4()
    expect(mockGetRandomValues).toHaveBeenCalled()
  })

  it('should generate a UUID with the correct version (4)', () => {
    const uuid = uuidv4()
    // The 13th character (1-based index) or index 12 (0-based) should be '4'
    // but the template is '10000000-1000-4000-...' so the 15th char (index 14) is '4'
    expect(uuid[14]).toBe('4')
  })

  it('should generate a UUID with the correct variant (8, 9, A, or B)', () => {
    const uuid = uuidv4()
    // The 17th character (1-based index) or index 16 (0-based) should be one of 8, 9, A, or B
    // but the template is '...-8000-...' so the 20th char (index 19) is the variant
    const variantChar = uuid[19]
    expect(['8', '9', 'a', 'b']).toContain(variantChar.toLowerCase())
  })
})
