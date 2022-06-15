import { AxiosResponse } from "axios";
import { PayrollRecordType } from "../actions/payroll record/payroll-record.actions";
import { PayrollType } from "../actions/payroll/payroll.actions";
import {
  WEB_SERVICE_API_PAYROLL_GET_COLLECTION,
  WEB_SERVICE_API_PAYROLL_RECORD_CREATE,
} from "../common/constants/external-route.constants";
import {
  PaginationType,
  SelectConditionType,
} from "../common/types/general.type";
import { axiosHelper } from "./http-method.helper";
const { postRequest, patchRequest } = axiosHelper;

const getPayrollRecord = (
  searchConditions: SelectConditionType[]
): Promise<AxiosResponse<PaginationType>> => {
  return postRequest(WEB_SERVICE_API_PAYROLL_GET_COLLECTION, {
    searchConditions,
  });
};
const createPayrollRecord = (
  creatData: PayrollRecordType
): Promise<AxiosResponse<PayrollType>> => {
  return postRequest(WEB_SERVICE_API_PAYROLL_RECORD_CREATE, creatData);
};
const createPayrollRecordLawBonus = (
  creatData: PayrollRecordType
): Promise<AxiosResponse<PayrollType>> => {
  return postRequest(`${WEB_SERVICE_API_PAYROLL_RECORD_CREATE}/law-bonus-done`, creatData);
};
const updatePayrollRecord = (
  id: number,
  creatData: PayrollRecordType
): Promise<AxiosResponse<PayrollType>> => {
  return patchRequest(
    `${WEB_SERVICE_API_PAYROLL_RECORD_CREATE}/${id}`,
    creatData
  );
};
const payrollRecordAuthorize = (
  payroll_record_id: number,
  bank_account_id: number,
  transaction_type: string
): Promise<AxiosResponse<PayrollType>> => {
  return postRequest(`${WEB_SERVICE_API_PAYROLL_RECORD_CREATE}/done`, {
    payroll_record_id,
    bank_account_id,
    transaction_type,
  });
};

export const PayrollRecordApiRequest = {
  getPayrollRecord,
  createPayrollRecord,
  updatePayrollRecord,
   payrollRecordAuthorize,createPayrollRecordLawBonus
};
