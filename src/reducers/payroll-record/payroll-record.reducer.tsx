import {
  PAYROLL_RECORD_CREATE_PAYROLL_RECORD,
  PAYROLL_RECORD_CREATE_PAYROLL_RECORD_FAILURE,
  PAYROLL_RECORD_CREATE_PAYROLL_RECORD_SUCCESS,
  PAYROLL_RECORD_GET_COLLECTION_PAYROLL_RECORD,
  PAYROLL_RECORD_GET_COLLECTION_PAYROLL_RECORD_FAILURE,
  PAYROLL_RECORD_GET_COLLECTION_PAYROLL_RECORD_SUCCESS,
  PAYROLL_RECORD_MANAGER_REDUX_STATE_PAYROLL_RECORD,
} from "../../constants/payroll-record/payroll-record.constants"

import { ResponseMetadata } from "../../common/types/response.type"
import { PayrollRecordActions, PayrollRecordType } from "../../actions/payroll record/payroll-record.actions"

type PayrollRecordState = {
  getPayrollRecordIsLoading: boolean
  createPayrollRecordIsLoading: boolean,
  isPayrollRecordCreated:boolean
  payrollRecord: PayrollRecordType[],
  payrollRecordMetadata:ResponseMetadata

}

const initialState = {
  getPayrollRecordIsLoading: false,
  isPayrollRecordCreated: false,
  createPayrollRecordIsLoading: false,
  payrollRecord: new Array<PayrollRecordType>(),
  payrollRecordMetadata:{} as ResponseMetadata,
}

const payrollRecord = (
  state: PayrollRecordState = initialState,
  action: PayrollRecordActions
): PayrollRecordState => {
  switch (action.type) {
    case PAYROLL_RECORD_GET_COLLECTION_PAYROLL_RECORD:
      return {
        ...state,
        getPayrollRecordIsLoading: true,
      }
    case PAYROLL_RECORD_GET_COLLECTION_PAYROLL_RECORD_FAILURE:
      return {
        ...state,
        getPayrollRecordIsLoading: false,
      }
    case PAYROLL_RECORD_GET_COLLECTION_PAYROLL_RECORD_SUCCESS:
        
      return {
        ...state,
        payrollRecord: action.PayrollRecordCollection,
        getPayrollRecordIsLoading: false,
      }
    case PAYROLL_RECORD_CREATE_PAYROLL_RECORD:
      return {
        ...state,
        getPayrollRecordIsLoading: true,
      }
    case PAYROLL_RECORD_CREATE_PAYROLL_RECORD_FAILURE:
      return {
        ...state,
        createPayrollRecordIsLoading: false,
      }
    case PAYROLL_RECORD_CREATE_PAYROLL_RECORD_SUCCESS:  
      return {
        ...state,
        payrollRecord: [...state.payrollRecord,action.createdPayrollRecord],
        createPayrollRecordIsLoading: false,
        isPayrollRecordCreated: true,
      }
    case PAYROLL_RECORD_MANAGER_REDUX_STATE_PAYROLL_RECORD:  
      return {
        ...state,
        ...action.state
      }
    default:
      return state
  }
}

export default payrollRecord