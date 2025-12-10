import { addHttps } from './addHttps'

/**
 *
 * @param {string} url
 * @returns  {string}
 */
export function extractNameFromDomain(url) {
  if (!url) {
    return ''
  }

  let hostname

  try {
    const parsed = new URL(addHttps(url))
    hostname = parsed.hostname
  } catch {
    return ''
  }

  const parts = hostname.split('.')

  if (parts.length < 2) {
    return ''
  }

  const labels = parts.slice(0, -1)

  const domainLabels = labels.reduce((acc, label) => {
    if (label.length > 3) {
      const capitalizedLabel = label.charAt(0).toUpperCase() + label.slice(1)
      acc.push(capitalizedLabel)
    }
    return acc
  }, [])

  return domainLabels.join(' ')
}
