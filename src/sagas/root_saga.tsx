import { all } from "redux-saga/effects"
import {
  watchCreateDepartment,
  watchGetAllDepartment,
} from "./department/department.sagas"
import {
  watchCreateEmployee,
  watchGetEmployee,
} from "./employee/employee.sagas"
import { watchLocalState } from "./local/localState.sagas"
import { watchGetMunicipalities } from "./municipality/municipality.saga"
import {
  watchCreatePayrollRecord,
  watchGetAllPayrollRecord,
  watchUpdatePayrollRecord,
} from "./payroll-record/payroll.sagas"
import { watchCreatePayroll, watchGetAllPayroll } from "./payroll/payroll.sagas"
import {
  watchCreatePosition,
  watchGetAllPositions,
  watchGetAllPositionsDepartment,
} from "./positions/positions.saga"
import { watchGetAllProvinces } from "./provinces/provinces.saga"
import { watchGetSectors } from "./sector/sector.saga"
import {
  watchAuthenticateUser,
  watchGetUserMenuOptions,
} from "./user/user.sagas"

export default function* rootSaga (): Generator {
  yield all([
    watchGetUserMenuOptions(),
    watchAuthenticateUser(),
    watchGetEmployee(),
    watchLocalState(),
    watchGetAllDepartment(),
    watchCreateDepartment(),
    watchCreatePosition(),
    watchGetAllPositions(),
    watchGetAllProvinces(),
    watchGetMunicipalities(),
    watchGetSectors(),
    watchGetAllPositionsDepartment(),
    watchCreateEmployee(),
    watchCreatePayroll(),
    watchGetAllPayroll(),
    watchGetAllPayrollRecord(),
    watchCreatePayrollRecord(),watchUpdatePayrollRecord()
  ])
}
