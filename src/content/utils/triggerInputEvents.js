/**
 * @param {HTMLElement} element
 * @param {string[]} eventTypes
 */
export const triggerInputEvents = (element, eventTypes = []) => {
  eventTypes.forEach((eventType) => {
    element.dispatchEvent(new Event(eventType, { bubbles: true }))
  })
}
