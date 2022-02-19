import store from "../../../store"

export function getFromLocalState<T> (key: string): T {
  const { dynamicLocalState } = store.getState()
  return dynamicLocalState.state[key] as unknown as T
}
