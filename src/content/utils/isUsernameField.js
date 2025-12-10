/**
 *
 * @param {HTMLInputElement} element
 * @returns {boolean}
 */
export const isUsernameField = (element) => {
  if (element.type === 'email') {
    return true
  }

  if (element.type === 'text') {
    const name = (element.name || '').toLowerCase()
    return (
      name.includes('user') || name.includes('email') || name.includes('login')
    )
  }

  return false
}
