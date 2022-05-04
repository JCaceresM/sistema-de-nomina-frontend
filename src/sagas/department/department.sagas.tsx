import { call, ForkEffect, put, takeLatest } from "redux-saga/effects"
import { ResponseGenerator } from "../../common/types/response.type"
import {
  CreateDepartmentAction,
  createDepartmentFailure,
  createDepartmentSuccess,
  getAllDepartmentFailure,
  getAllDepartmentSuccess,
  GetDeparmentNotInPayrollAction,
  getDeparmentNotInPayrollFailure,
  getDeparmentNotInPayrollSuccess,
  GetDepartmentEmployeesAction,
  getDepartmentEmployeesFailure,
  getDepartmentEmployeesSuccess,
} from "../../actions/department/department.actions"
import { DEPARTMENT_CREATE_DEPARTMENT, DEPARTMENT_GET_ALL_DEPARTMENT, DEPARTMENT_GET_EMPLOYEES_DEPARTMENT, DEPARTMENT_GET_NOT_IN_PAYROLL } from "../../constants/department/department.constants"
import { DepartmentApiRequest } from "../../services/department.api"

const {getDepartments,createDepartment ,getDepartmentsNotInPayroll, getDepartmentEmployees} = DepartmentApiRequest
function* getAllDepartmentSaga ( ) {
  try {
    const response: ResponseGenerator = yield call(() =>
    getDepartments()
    )

   
    const { data, meta={} } = response.data
    yield put(getAllDepartmentSuccess(data, meta.pagination))
  } catch (error) {
    yield put(getAllDepartmentFailure())
  }
}

function* watchGetAllDepartment (): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(DEPARTMENT_GET_ALL_DEPARTMENT, getAllDepartmentSaga)
}
function* createDepartmentSaga ( body:CreateDepartmentAction) {
  try {
    const response: ResponseGenerator = yield call(() =>
    createDepartment(body.createDepartment)
    )

   
    const { data } = response
    
    yield put(createDepartmentSuccess(data))
  } catch (error) {
    yield put(createDepartmentFailure())
  }
}

function* watchCreateDepartment (): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(DEPARTMENT_CREATE_DEPARTMENT, createDepartmentSaga)
}
function* getDepartmentEmployeesSaga ( body:GetDepartmentEmployeesAction) {
  try {
    const response: ResponseGenerator = yield call(() =>
    getDepartmentEmployees( body.pagination,body.searchConditions,)
    )
    const { data, meta={} } = response.data
    
    yield put(getDepartmentEmployeesSuccess(data, meta))
  } catch (error) {
    yield put(getDepartmentEmployeesFailure())
  }
}

function* watchGetDepartmentEmployees (): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(DEPARTMENT_GET_EMPLOYEES_DEPARTMENT, getDepartmentEmployeesSaga)
}
function* getDepartmensNotInPayrollSaga ( body:GetDeparmentNotInPayrollAction) {
  try {
    const response: ResponseGenerator = yield call(() =>
    getDepartmentsNotInPayroll( body.pagination,body.searchConditions,)
    )
    const { data, } = response.data
    
    yield put(getDeparmentNotInPayrollSuccess(data))
  } catch (error) {
    yield put(getDeparmentNotInPayrollFailure())
  }
}

function* watchGetDepartmentsNotInPayroll (): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(DEPARTMENT_GET_NOT_IN_PAYROLL, getDepartmensNotInPayrollSaga)
}
export { watchGetAllDepartment,watchCreateDepartment,watchGetDepartmentsNotInPayroll, watchGetDepartmentEmployees }
