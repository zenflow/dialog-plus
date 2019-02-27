export function omitUndefined(object) {
  const result = []
  for (const [key, value] of Object.entries(object)) {
    if (value !== undefined) {
      result[key] = value
    }
  }
  return result
}
