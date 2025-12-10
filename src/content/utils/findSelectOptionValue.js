/**
 * @param {HTMLSelectElement} selectEl
 * @param {string} valueToMatch
 * @returns {string}
 */
export const findSelectOptionValue = (selectEl, valueToMatch) => {
  if (!selectEl || selectEl.tagName.toLowerCase() !== 'select') {
    throw new Error('Element is not a select')
  }

  const options = Array.from(selectEl.options)
  const target = valueToMatch.toLowerCase().trim()

  const match =
    options.find((opt) => opt.value.trim().toLowerCase() === target) ||
    options.find((opt) => opt.textContent.trim().toLowerCase() === target) ||
    options.find((opt) => opt.value.toLowerCase().includes(target)) ||
    options.find((opt) => opt.textContent.toLowerCase().includes(target))

  return (match || options[0])?.value
}
