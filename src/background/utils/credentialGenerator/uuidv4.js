/**
 * Generate a RFC4122 v4 UUID.
 * @returns {string} UUID string
 */
export const uuidv4 = () =>
  // Ref: http://stackoverflow.com/a/2117523/1090359
  '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  )
