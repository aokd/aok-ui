export function omit<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, Exclude<keyof T, K>> {
  const copy = { ...obj }
  for (const key of keys) {
    if (copy[key]) {
      delete copy[key]
    }
  }
  return copy
}
