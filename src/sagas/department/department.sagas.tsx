import { call, ForkEffect, put, takeLatest } from "redux-saga/effects"
import { ResponseGenerator } from "../../common/types/response.type"
import {
  CreateDepartmentAction,
  createDepartmentFailure,
  createDepartmentSuccess,
  getAllDepartmentFailure,
  getAllDepartmentSuccess,
  GetDepartmentEmployeesAction,
  getDepartmentEmployeesFailure,
  getDepartmentEmployeesSuccess,
} from "../../actions/department/department.actions"
import { DEPARTMENT_CREATE_DEPARTMENT, DEPARTMENT_GET_ALL_DEPARTMENT, DEPARTMENT_GET_EMPLOYEES_DEPARTMENT } from "../../constants/department/department.constants"
import { DepartmentApiRequest } from "../../services/department.api"

const {getDepartments,createDepartment , getDepartmentEmployees} = DepartmentApiRequest
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
export { watchGetAllDepartment,watchCreateDepartment, watchGetDepartmentEmployees }
