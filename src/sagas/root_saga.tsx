import { all } from "redux-saga/effects";
import {
  watchCreateDepartment,
  watchGetAllDepartment,
} from "./department/department.sagas";
import {
  watchCreateEmployee,
  watchGetEmployee,
  watchUpdateEmployee,
} from "./employee/employee.sagas";
import { watchLocalState } from "./local/localState.sagas";
import { watchGetMunicipalities } from "./municipality/municipality.saga";
import {
  watchCreatePayrollEmployeeNews,
  watchCreatePayrollNews,
  watchGetPayrollEmployeeNews,
  watchGetPayrollNews,
} from "./payroll-news/payroll-news.sagas";
import {
  watchCreatePayrollRecord,
  watchGetAllPayrollRecord,
  watchUpdatePayrollRecord,
} from "./payroll-record/payroll.sagas";
import {
  watchCreatePayroll,
  watchGetAllPayroll,
  watchUpdatePayrollEmployees,
} from "./payroll/payroll.sagas";
import {
  watchCreatePosition,
  watchGetAllPositions,
  watchGetAllPositionsDepartment,
} from "./positions/positions.saga";
import { watchGetAllProvinces } from "./provinces/provinces.saga";
import { watchGetSectors } from "./sector/sector.saga";
import {
  watchAuthenticateUser,
  watchGetUserMenuOptions,
} from "./user/user.sagas";

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
    watchCreatePayrollRecord(),
    watchUpdatePayrollRecord(),
    watchGetPayrollNews(),
    watchCreatePayrollNews(),
    watchUpdateEmployee(),
    watchUpdatePayrollEmployees(),
    watchCreatePayrollEmployeeNews(), watchGetPayrollEmployeeNews()
  ]);
}
