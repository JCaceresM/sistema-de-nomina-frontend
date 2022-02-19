export function addPropertyKey<T> (record: T,key='key'): T  {
  function arrayToExample (values: T): T {
    return (values as unknown as T[]).map((item, index) => options(item, index) as T) as unknown as T
  }
  const options = (values: T, index: number): T  => {
    if (typeof values === "object" && (values as unknown as T[]).length > 0) {
      return arrayToExample(values) 
    } else if (typeof values === "object") {
      (values as Record<string,unknown>)[key] = index
      return values
    } else {
      return values
    }
  }
  return options(record, 0) as T 
}
export const updateObjectArray = <T, K extends keyof T>(
  targetArray: T[],
  updatedElement: T,
  targetKey: K
): T[] => {
  const targetIndex = targetArray.findIndex(
    (arrayElement: T) => arrayElement[targetKey] === updatedElement[targetKey]
  )

  targetArray[targetIndex] = updatedElement

  return [...targetArray]
}