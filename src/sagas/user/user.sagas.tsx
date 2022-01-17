import { call, ForkEffect, put, takeLatest } from "redux-saga/effects"
import { ResponseGenerator } from "../../common/types/response.type"
import { createSession } from "../../common/utils/session/session"
import { userApiRequest } from "../../services/user-session.api"
import {
  AuthenticateUserAction,
  authenticateUserFailure,
  authenticateUserSuccess,
  GetMenuOptionsAction,
  getMenuOptionsFailure,
  getMenuOptionsSuccess,
} from "../../actions/user/user.actions"
import { USER_AUTHENTICATE, USER_GET_MENU_OPTIONS } from "../../constants/user/user.constants"

function* getUserMenuOptionsSaga({
  userId,
}: GetMenuOptionsAction) {
  try {
    const response: ResponseGenerator = yield call(() =>
      userApiRequest.getUserMenuOptions({
        user_id: userId,
      })
    )

    const { data: menuOptions } = response

    yield put(getMenuOptionsSuccess(menuOptions))
  } catch (error) {
    yield put(getMenuOptionsFailure())
  }
}

function* watchGetUserMenuOptions(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(USER_GET_MENU_OPTIONS, getUserMenuOptionsSaga)
}

function* authenticateUserSaga({ username, password }: AuthenticateUserAction) {
  try {
    const response: ResponseGenerator = yield call(() =>
      userApiRequest.authenticateUser({
        username,
        password,
      })
    )

    const { data: userInfo } = response

    createSession(userInfo)
    yield put(authenticateUserSuccess())
  } catch (error) {
    yield put(authenticateUserFailure())
  }
}

function* watchAuthenticateUser(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(USER_AUTHENTICATE, authenticateUserSaga)
}

export { watchGetUserMenuOptions, watchAuthenticateUser }
