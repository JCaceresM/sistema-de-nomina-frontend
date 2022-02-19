import { AxiosResponse } from "axios"
import { PayrollType } from "../actions/payroll/payroll.actions"
import {
  WEB_SERVICE_API_PAYROLL_CREATE,
  WEB_SERVICE_API_PAYROLL_RECORD,
} from "../common/constants/external-route.constants"
import { PaginationType, SelectConditionType } from "../common/types/general.type"
import { axiosHelper } from "./http-method.helper"
const {  postRequest } = axiosHelper

const getPayroll = (searchConditions: SelectConditionType[]): Promise<AxiosResponse<PaginationType>> => {
  return postRequest(WEB_SERVICE_API_PAYROLL_RECORD,{searchConditions})
}
const createPayroll = (
  creatData: PayrollType
): Promise<AxiosResponse<PayrollType>> => {
  return postRequest(WEB_SERVICE_API_PAYROLL_CREATE, creatData)
}

export const PayrollApiRequest = {
  getPayroll,
  createPayroll,
}
