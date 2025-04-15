// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const buildQueryString = <T extends Record<string, any>>(
  params: T,
): string => {
  const filteredParams = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .reduce(
      (acc, [key, value]) => {
        acc[key] = value.toString()
        return acc
      },
      {} as Record<string, string>,
    )

  const queryString = new URLSearchParams(filteredParams).toString()
  return queryString ? `?${queryString}` : ''
}
