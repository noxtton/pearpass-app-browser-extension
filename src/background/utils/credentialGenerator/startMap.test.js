import { startMap } from './startMap'

describe('startMap', () => {
  it('should correctly encode a map size less than 24', () => {
    expect(startMap(0)).toEqual(Uint8Array.from([0xa0]))
    expect(startMap(1)).toEqual(Uint8Array.from([0xa1]))
    expect(startMap(23)).toEqual(Uint8Array.from([0xb7]))
  })

  it('should correctly encode a map size between 24 and 255', () => {
    expect(startMap(24)).toEqual(Uint8Array.from([0xb8, 24]))
    expect(startMap(100)).toEqual(Uint8Array.from([0xb8, 100]))
    expect(startMap(255)).toEqual(Uint8Array.from([0xb8, 255]))
  })

  it('should throw a RangeError for a map size of 256 or greater', () => {
    expect(() => startMap(256)).toThrow(RangeError)
    expect(() => startMap(256)).toThrow('startMap: size must be < 256')
    expect(() => startMap(1000)).toThrow(RangeError)
  })
})
