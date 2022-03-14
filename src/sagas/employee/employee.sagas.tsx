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
  UpdateEmployeeAction,
  updateEmployeeFailure,
  updateEmployeeSuccess,
} from "../../actions/employee/employee.actions"
import { EMPLOYEE_CREATE_EMPLOYEE, EMPLOYEE_GET_EMPLOYEE, EMPLOYEE_UPDATE_EMPLOYEE } from "../../constants/employee/employee.constants"
import { SelectConditionType } from "../../common/types/general.type"

const { getEmployees,createEmployee, updateEmployee } = EmployeeApiRequest
function* getEmployeeSaga ({ pagination,searchConditions }: GetEmployeeAction) {
  try {
    const response: ResponseGenerator = yield call(() =>
      getEmployees({pagination,searchConditions: searchConditions as unknown as SelectConditionType})
    )

    const { data, meta={} } = response.data
    
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
function* updateEmployeeSaga ({ patchEmployee, id }: UpdateEmployeeAction) {
  try {
    const response: ResponseGenerator = yield call(() =>
    updateEmployee(id, patchEmployee)
    )

    const { data, } = response
    yield put(updateEmployeeSuccess(data,))
  } catch (error) {
    yield put(updateEmployeeFailure())
  }
}

function* watchUpdateEmployee (): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(EMPLOYEE_UPDATE_EMPLOYEE, updateEmployeeSaga)
}

export { watchGetEmployee,watchCreateEmployee , watchUpdateEmployee}
