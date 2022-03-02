export function addPropertyKey<T> (
  record: Record<string, unknown> | Record<string, unknown>[] = [],
  key = "key"
): T {
  function arrayToExample (
    values: Record<string, unknown>[] = []
  ): Record<string, unknown>[] {
    return values.map((item, index) => options(item, index) as Record<string, unknown>);
  }
  const options = (
    values: Record<string, unknown> | Record<string, unknown>[],
    index: number
  ): Record<string, unknown> | Record<string, unknown>[] => {
    if (typeof values === "object" && (values as unknown as T[])?.length > 0) {
      return arrayToExample(values as Record<string, unknown>[]);
    } else if (typeof values === "object") {
      (values as Record<string, unknown>)[key] = index;
      return values;
    } else {
      return values;
    }
  };
  return (record || []).length ? (options(record, 0) as T) : ([] as unknown as T);
}
export const updateObjectArray = <T, K extends keyof T>(
  targetArray: T[],
  updatedElement: T,
  targetKey: K
): T[] => {
  const targetIndex = targetArray.findIndex(
    (arrayElement: T) => arrayElement[targetKey] === updatedElement[targetKey]
  );

  targetArray[targetIndex] = updatedElement;

  return [...targetArray];
};
