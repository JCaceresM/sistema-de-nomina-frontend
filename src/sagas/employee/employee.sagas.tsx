import { call, ForkEffect, put, takeLatest } from "redux-saga/effects"
import { ResponseGenerator } from "../../common/types/response.type"
import { EmployeeApiRequest } from "../../services/employee.api"
import {
  GetAllEmployeeAction,
  getAllEmployeeFailure,
  getAllEmployeeSuccess,
} from "../../actions/employee/employee.actions"
import { EMPLOYEE_GET_ALL_EMPLOYEE } from "../../constants/employee/employee.constants"

const { getEmployees } = EmployeeApiRequest
function* getAllEmployeeSaga({ pagination }: GetAllEmployeeAction) {
  try {
    const response: ResponseGenerator = yield call(() =>
      getEmployees(pagination)
    )

    const { data, meta } = response.data
    // eslint-disable-next-line no-console
    console.log(meta, "dccccc")

    yield put(getAllEmployeeSuccess(data, meta.pagination))
  } catch (error) {
    yield put(getAllEmployeeFailure())
  }
}

function* watchGetAllEmployee(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(EMPLOYEE_GET_ALL_EMPLOYEE, getAllEmployeeSaga)
}

export { watchGetAllEmployee }
