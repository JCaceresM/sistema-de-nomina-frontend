import { all } from "redux-saga/effects"
import {
  watchCreateDepartment,
  watchGetAllDepartment,
} from "./department/department.sagas"
import { watchGetAllEmployee } from "./employee/employee.sagas"
import { watchLocalState } from "./local/localState.sagas"
import {
  watchCreatePosition,
  watchGetAllPositions,
} from "./positions/positions.redux"
import { watchGetAllProvinces } from "./provinces/provinces"
import {
  watchAuthenticateUser,
  watchGetUserMenuOptions,
} from "./user/user.sagas"

export default function* rootSaga(): Generator {
  yield all([
    watchGetUserMenuOptions(),
    watchAuthenticateUser(),
    watchGetAllEmployee(),
    watchLocalState(),
    watchGetAllDepartment(),
    watchCreateDepartment(),
    watchCreatePosition(),
    watchGetAllPositions(),
    watchGetAllProvinces(),
  ])
}
