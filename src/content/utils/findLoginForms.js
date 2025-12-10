import { isPasswordField } from './isPasswordField'
import { isUsernameField } from './isUsernameField'

export function findLoginForms() {
  return Array.from(document.forms).filter((form) =>
    Array.from(form.elements).some(
      (element) => isPasswordField(element) || isUsernameField(element)
    )
  )
}
