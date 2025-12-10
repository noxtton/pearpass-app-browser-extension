/**
 * @param {string[]} keywords
 * @returns {{ element: HTMLInputElement | HTMLSelectElement | null, type: 'input' | 'select' | null }}
 */
export const getField = (keywords) => {
  const selector = keywords
    .flatMap((kw) => [
      `input[name*="${kw}"]`,
      `input[id*="${kw}"]`,
      `input[autocomplete*="${kw}"]`,
      `input[placeholder*="${kw}"]`,
      `select[name*="${kw}"]`,
      `select[id*="${kw}"]`,
      `select[autocomplete*="${kw}"]`,
      `label:has(input[id*="${kw}"]) input`,
      `label:has(select[id*="${kw}"]) select`
    ])
    .join(',')

  let element = document.querySelector(selector)

  if (!element) {
    element = getFieldByLabelText(keywords)
  }

  if (!element) {
    return { element: null, type: null }
  }

  const tag = element.tagName.toLowerCase()

  return {
    element,
    type: tag === 'input' ? 'input' : tag === 'select' ? 'select' : null
  }
}

/**
 * @param {string[]} keywords
 */
const getFieldByLabelText = (keywords) => {
  const labels = document.querySelectorAll('label')

  for (const label of labels) {
    const labelText = label.textContent?.toLowerCase() || ''

    for (const kw of keywords) {
      if (labelText.includes(kw.toLowerCase())) {
        const nestedField = label.querySelector('input, select')
        if (nestedField) {
          return nestedField
        }

        const forAttr = label.getAttribute('for')
        if (forAttr) {
          const referencedField = document.getElementById(forAttr)
          if (
            referencedField &&
            (referencedField.tagName === 'INPUT' ||
              referencedField.tagName === 'SELECT')
          ) {
            return referencedField
          }
        }
      }
    }
  }

  return null
}
