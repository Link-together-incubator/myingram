interface ErrorResponse {
  errorsMessages: Array<{ message: string }>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isErrorResponse(response: any): response is ErrorResponse {
  return Array.isArray(response?.errorsMessages)
}

export const baseFetch = async <T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> => {
  if (!process.env.NEXT_PUBLIC_URL_API) {
    throw new Error('Не указан апи url')
  }
  const url = process.env.NEXT_PUBLIC_URL_API + endpoint

  const res = await fetch(url, options)

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`)
  }

  const data: T = await res.json()
  if (isErrorResponse(data)) {
    throw new Error(data.errorsMessages[0].message)
  }

  return data
}
