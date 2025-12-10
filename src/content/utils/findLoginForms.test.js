import { findLoginForms } from './findLoginForms'

describe('findLoginForms', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('should return an empty array if there are no forms on the page', () => {
    expect(findLoginForms()).toEqual([])
  })

  it('should return forms containing a password input', () => {
    document.body.innerHTML = `
            <form id="form1">
                <input type="password" />
            </form>
            <form id="form2">
                <input type="text" />
            </form>
        `
    const result = findLoginForms()
    expect(result.length).toBe(1)
    expect(result[0].id).toBe('form1')
  })

  it('should return forms containing an email or text input', () => {
    document.body.innerHTML = `
            <form id="form1">
                <input type="email" />
            </form>
            <form id="form2">
                <input type="text" />
            </form>
            <form id="form3">
                <input type="password" />
            </form>
        `
    const result = findLoginForms()
    expect(result.length).toBe(2)
    expect(result.map((form) => form.id)).toEqual(['form1', 'form3'])
  })

  it('should return an empty array if forms do not contain relevant inputs', () => {
    document.body.innerHTML = `
            <form id="form1">
                <input type="checkbox" />
            </form>
            <form id="form2">
                <input type="radio" />
            </form>
        `
    expect(findLoginForms()).toEqual([])
  })
})
