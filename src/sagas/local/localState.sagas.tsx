import { ForkEffect, put, takeLatest } from "redux-saga/effects"
import {
  SetLocalStateAction,
  setLocalStateFailure,
  setLocalStateSuccess,
} from "../../actions/local/localState.actions"
import { LOCAL_SET_LOCAL_STATE } from "../../constants/local/localState.constans"

function* localStateSaga({ state }: SetLocalStateAction) {
  try {
    yield put(setLocalStateSuccess(state))
  } catch (error) {
    yield put(setLocalStateFailure())
  }
}

function* watchLocalState(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(LOCAL_SET_LOCAL_STATE, localStateSaga)
}

export { watchLocalState }
