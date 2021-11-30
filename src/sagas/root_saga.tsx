import { all } from "redux-saga/effects"
import {
  watchAuthenticateUser,
  watchGetUserMenuOptions,
} from "../feature/user/user.sagas"

export default function* rootSaga(): Generator {
  yield all([watchGetUserMenuOptions(), watchAuthenticateUser()])
}
