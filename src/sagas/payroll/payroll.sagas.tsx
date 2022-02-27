import { call, ForkEffect, put, takeLatest } from "redux-saga/effects"
import {
  CreatePayrollAction,
  createPayrollFailure,
  createPayrollSuccess,
  GetAllPayrollAction,
  getAllPayrollFailure,
  getAllPayrollSuccess,
} from "../../actions/payroll/payroll.actions"
import { SelectConditionType } from "../../common/types/general.type"
import { ResponseGenerator } from "../../common/types/response.type"
import {
  PAYROLL_CREATE_PAYROLL,
  PAYROLL_GET_ALL_PAYROLL,
} from "../../constants/payroll/payroll.constants"
import { PayrollApiRequest } from "../../services/payroll.api"

const { getPayroll, createPayroll } = PayrollApiRequest
function* getAllPayrollSaga ({ searchConditions }: GetAllPayrollAction) {
  try {
    const response: ResponseGenerator = yield call(() =>
      getPayroll(searchConditions as unknown as SelectConditionType[])
    )

    const { data,  } = response
    yield put(getAllPayrollSuccess(data,))
  } catch (error) {
    yield put(getAllPayrollFailure())
  }
}

function* watchGetAllPayroll (): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(PAYROLL_GET_ALL_PAYROLL, getAllPayrollSaga)
}
function* createPayrollSaga (body: CreatePayrollAction) {
  try {
    const response: ResponseGenerator = yield call(() =>
      createPayroll(body.createPayroll)
    )

    const { data } = response

    yield put(createPayrollSuccess(data))
  } catch (error) {
    yield put(createPayrollFailure())
  }
}

function* watchCreatePayroll (): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(PAYROLL_CREATE_PAYROLL, createPayrollSaga)
}

export { watchGetAllPayroll, watchCreatePayroll }
