import { findSelectOptionValue } from './findSelectOptionValue'

describe('findSelectOptionValue', () => {
  let selectEl

  const makeSelect = (options) => {
    const select = document.createElement('select')
    options.forEach(({ value, text }) => {
      const opt = document.createElement('option')
      opt.value = value
      opt.textContent = text
      select.appendChild(opt)
    })
    return select
  }

  beforeEach(() => {
    // Default select element for most tests
    selectEl = makeSelect([
      { value: 'apple', text: 'Apple' },
      { value: 'banana', text: 'Banana' },
      { value: 'grape', text: 'Grape Fruit' }
    ])
  })

  it('throws if element is not a select', () => {
    const div = document.createElement('div')
    expect(() => findSelectOptionValue(div, 'apple')).toThrow(
      'Element is not a select'
    )
    expect(() => findSelectOptionValue(null, 'apple')).toThrow(
      'Element is not a select'
    )
  })

  it('matches by value (exact, case-insensitive, trimmed)', () => {
    expect(findSelectOptionValue(selectEl, 'APPLE')).toBe('apple')
    expect(findSelectOptionValue(selectEl, ' banana ')).toBe('banana')
  })

  it('matches by textContent (exact, case-insensitive, trimmed)', () => {
    expect(findSelectOptionValue(selectEl, 'apple')).toBe('apple')
    expect(findSelectOptionValue(selectEl, 'BANANA')).toBe('banana')
    expect(findSelectOptionValue(selectEl, 'Grape Fruit')).toBe('grape')
  })

  it('matches by value (includes, case-insensitive)', () => {
    expect(findSelectOptionValue(selectEl, 'grap')).toBe('grape')
    expect(findSelectOptionValue(selectEl, 'nan')).toBe('banana')
  })

  it('matches by textContent (includes, case-insensitive)', () => {
    expect(findSelectOptionValue(selectEl, 'fruit')).toBe('grape')
    expect(findSelectOptionValue(selectEl, 'app')).toBe('apple')
  })

  it('returns first option value if no match', () => {
    expect(findSelectOptionValue(selectEl, 'notfound')).toBe('apple')
  })

  it('returns first option value if options are empty', () => {
    const emptySelect = makeSelect([])
    expect(findSelectOptionValue(emptySelect, 'anything')).toBeUndefined()
  })

  it('handles options with empty value', () => {
    const sel = makeSelect([
      { value: '', text: 'Choose...' },
      { value: 'foo', text: 'Foo' }
    ])
    expect(findSelectOptionValue(sel, 'foo')).toBe('foo')
    expect(findSelectOptionValue(sel, 'choose')).toBe('')
    expect(findSelectOptionValue(sel, 'notfound')).toBe('')
  })
})
