import { AxiosResponse } from "axios"
import { PayrollRecordType } from "../actions/payroll record/payroll-record.actions"
import { PayrollType } from "../actions/payroll/payroll.actions"
import {
  WEB_SERVICE_API_PAYROLL_RECORD_CREATE,
} from "../common/constants/external-route.constants"
import { PaginationType, SelectConditionType } from "../common/types/general.type"
import { axiosHelper } from "./http-method.helper"
const {  postRequest } = axiosHelper

const getPayrollRecord = (searchConditions: SelectConditionType[]): Promise<AxiosResponse<PaginationType>> => {
  return postRequest('',{searchConditions})
}
const createPayrollRecord = (
  creatData: PayrollRecordType
): Promise<AxiosResponse<PayrollType>> => {
  return postRequest(WEB_SERVICE_API_PAYROLL_RECORD_CREATE, creatData)
}

export const PayrollRecordApiRequest = {
   getPayrollRecord,
   createPayrollRecord,
}
