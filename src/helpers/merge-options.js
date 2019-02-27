function omitUndefined(object) {
  const result = []
  for (const [key, value] of Object.entries(object)) {
    if (value !== undefined) {
      result[key] = value
    }
  }
  return result
}

export function mergeOptions(baseOptions, updatedOptions) {
  return { ...baseOptions, ...omitUndefined(updatedOptions) }
}
