import {
  LOCAL_SET_LOCAL_STATE,
  LOCAL_SET_LOCAL_STATE_FAILURE,
  LOCAL_SET_LOCAL_STATE_SUCCESS,
} from "../../constants/local/localState.constans"

export type LocalStateType = {
  [key: string]: string | Record<string, unknown> | Record<string, unknown>[]
}
export type SetLocalStateAction = {
  type: typeof LOCAL_SET_LOCAL_STATE
  state: Record<string,LocalStateType[]|LocalStateType>
}

export const setLocalState = (state: Record<string,LocalStateType[]|LocalStateType>): SetLocalStateAction => {
  return {
    type: LOCAL_SET_LOCAL_STATE,
    state,
  }
}

type SetLocalStateSuccessAction = {
  type: typeof LOCAL_SET_LOCAL_STATE_SUCCESS
  state: Record<string,LocalStateType|LocalStateType[]>
}

export const setLocalStateSuccess = (
  state: Record<string,LocalStateType|LocalStateType[]>
): SetLocalStateSuccessAction => {
  return {
    type: LOCAL_SET_LOCAL_STATE_SUCCESS,
    state,
  }
}

type SetLocalStateFailureAction = {
  type: typeof LOCAL_SET_LOCAL_STATE_FAILURE
}

export const setLocalStateFailure = (): SetLocalStateFailureAction => {
  return {
    type: LOCAL_SET_LOCAL_STATE_FAILURE,
  }
}

export type LocalStateActions =
  | SetLocalStateAction
  | SetLocalStateSuccessAction
  | SetLocalStateFailureAction
