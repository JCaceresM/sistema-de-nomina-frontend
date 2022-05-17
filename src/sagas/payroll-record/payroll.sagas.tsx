import { call, ForkEffect, put, takeLatest } from "redux-saga/effects"
import { CreatePayrollRecordAction, createPayrollRecordFailure, createPayrollRecordSuccess, GetPayrollRecordCollectionAction, getPayrollRecordCollectionFailure, getPayrollRecordCollectionSuccess, PayrollRecordAuthorizedAction, payrollRecordAuthorizedFailure, payrollRecordAuthorizedSuccess, UpdatePayrollRecordAction, updatePayrollRecordFailure, updatePayrollRecordSuccess } from "../../actions/payroll record/payroll-record.actions"
import { SelectConditionType } from "../../common/types/general.type"
import { ResponseGenerator } from "../../common/types/response.type"
import { showNotification } from "../../common/utils/notification"
import { PAYROLL_RECORD_AUTHORIZED_PAYROLL_RECORD, PAYROLL_RECORD_CREATE_PAYROLL_RECORD, PAYROLL_RECORD_GET_COLLECTION_PAYROLL_RECORD, PAYROLL_RECORD_UPDATE_PAYROLL_RECORD,  } from "../../constants/payroll-record/payroll-record.constants"
import { PayrollRecordApiRequest } from "../../services/payroll-record.api"


const { getPayrollRecord, createPayrollRecord , updatePayrollRecord, payrollRecordAuthorize} = PayrollRecordApiRequest
function* getAllPayrollRecordSaga ({ searchConditions }: GetPayrollRecordCollectionAction) {
  try {
    const response: ResponseGenerator = yield call(() =>
      getPayrollRecord(searchConditions as unknown as SelectConditionType[])
    )

    const { data,  } = response    
    yield put(getPayrollRecordCollectionSuccess(data,))
  } catch (error) {
    yield put(getPayrollRecordCollectionFailure())
  }
}

function* watchGetAllPayrollRecord (): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(PAYROLL_RECORD_GET_COLLECTION_PAYROLL_RECORD, getAllPayrollRecordSaga)
}
function* createPayrollRecordSaga (body: CreatePayrollRecordAction) {
  try {
    const response: ResponseGenerator = yield call(() =>
      createPayrollRecord(body.PayrollRecord)
    )

    const { data } = response

    yield put(createPayrollRecordSuccess(data))
  } catch (error) {
    
    showNotification({
      title: 'Advertencia',
      description: `${(error as any).response.data.message}`  || 'Ha ocurrido un error inesperado',
      type: 'warning'
      
    })
    yield put(createPayrollRecordFailure())
  }
}

function* watchCreatePayrollRecord (): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(PAYROLL_RECORD_CREATE_PAYROLL_RECORD, createPayrollRecordSaga)
}
function* updatePayrollRecordSaga (body: UpdatePayrollRecordAction) {
  try {
    const response: ResponseGenerator = yield call(() =>
      updatePayrollRecord(body.id, body.PayrollRecord)
    )

    const { data } = response

    yield put(updatePayrollRecordSuccess(data))
  } catch (error) {
    yield put(updatePayrollRecordFailure())
  }
}

function* watchUpdatePayrollRecord (): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(PAYROLL_RECORD_UPDATE_PAYROLL_RECORD, updatePayrollRecordSaga)
}
function* PayrollRecordAuthorizedSaga (body: PayrollRecordAuthorizedAction) {
  try {
     yield call(() =>
     payrollRecordAuthorize(body.payroll_record_id, body.bank_account_id, body.transaction_type)
    )
    showNotification({
      title: 'Pago',
      description: 'Pago ha sido Realizado',
      type: 'success'
    })

    yield put(payrollRecordAuthorizedSuccess())
  } catch (error) {
    showNotification({
      title: 'Pago',
      description: 'Error al ralizar el pago',
      type: 'error'
    })
    yield put(payrollRecordAuthorizedFailure())
  }
}

function* watchPayrollRecordAuthorized (): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(PAYROLL_RECORD_AUTHORIZED_PAYROLL_RECORD, PayrollRecordAuthorizedSaga)
}

export {watchPayrollRecordAuthorized, watchGetAllPayrollRecord, watchCreatePayrollRecord , watchUpdatePayrollRecord}
