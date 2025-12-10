/**
 *
 * @param {HTMLInputElement} element
 * @returns {boolean}
 */
export const isIdentityField = (element) => {
  const identityFieldPatterns = [
    /name/i,
    /email/i,
    /phone|tel/i,
    /address/i,
    /zip|postal/i,
    /city/i,
    /region|state/i,
    /country/i
  ]

  const labelText = element.labels
    ? Array.from(element.labels)
        .map((label) => label.textContent)
        .join(' ')
    : ''

  return identityFieldPatterns.some((pattern) =>
    pattern.test(
      element.name || element.id || element.placeholder || labelText || ''
    )
  )
}
