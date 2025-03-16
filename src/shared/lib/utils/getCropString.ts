export const getCropString = (str: string, long: number) => {
  return str.length > long ? str.slice(0, long - 3) + '...' : str
}
