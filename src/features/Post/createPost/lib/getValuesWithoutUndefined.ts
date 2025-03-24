export const getValuesWithoutUndefined = <T extends Record<string, unknown>>(
  obj: T,
): Partial<T> | null => {
  const newObj: Partial<T> = {}
  let isAllUndefined = true
  for (const key in obj) {
    if (obj[key] !== undefined) {
      newObj[key] = obj[key]
      isAllUndefined = false
    }
  }
  return isAllUndefined ? null : newObj
}
