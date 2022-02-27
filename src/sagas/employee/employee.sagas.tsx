import { call, ForkEffect, put, takeLatest } from "redux-saga/effects"
import { ResponseGenerator } from "../../common/types/response.type"
import { EmployeeApiRequest } from "../../services/employee.api"
import {
  CreateEmployeeAction,
  createEmployeeFailure,
  createEmployeeSuccess,
  GetEmployeeAction,
  getEmployeeFailure,
  getEmployeeSuccess,
} from "../../actions/employee/employee.actions"
import { EMPLOYEE_CREATE_EMPLOYEE, EMPLOYEE_GET_EMPLOYEE } from "../../constants/employee/employee.constants"
import { SelectConditionType } from "../../common/types/general.type"

const { getEmployees,createEmployee } = EmployeeApiRequest
function* getEmployeeSaga ({ pagination,searchConditions }: GetEmployeeAction) {
  try {
    // eslint-disable-next-line no-console
    console.log(searchConditions,"searchConditions");
    const response: ResponseGenerator = yield call(() =>
      getEmployees({pagination,searchConditions: searchConditions as unknown as SelectConditionType})
    )

    const { data, meta={} } = response.data
    // eslint-disable-next-line no-console
    console.log(response.data,"response.data");
    
    yield put(getEmployeeSuccess(data, meta.pagination||{}))
  } catch (error) {
    yield put(getEmployeeFailure())
  }
}

function* watchGetEmployee (): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(EMPLOYEE_GET_EMPLOYEE, getEmployeeSaga)
}
function* createEmployeeSaga ({ create }: CreateEmployeeAction) {
  try {
    const response: ResponseGenerator = yield call(() =>
    createEmployee(create)
    )

    const { data, } = response
    yield put(createEmployeeSuccess(data,))
  } catch (error) {
    yield put(createEmployeeFailure())
  }
}

function* watchCreateEmployee (): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(EMPLOYEE_CREATE_EMPLOYEE, createEmployeeSaga)
}

export { watchGetEmployee,watchCreateEmployee }
