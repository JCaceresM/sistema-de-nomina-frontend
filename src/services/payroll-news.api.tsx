import { AxiosResponse } from "axios";
import { PayrollNewsType } from "../actions/payroll-news/payroll-news.actions";
import {
  WEB_SERVICE_API_PAYROLL_NEWS_CREATE,
  WEB_SERVICE_API_PAYROLL_NEWS_GET_COLLECTION,
} from "../common/constants/external-route.constants";

import {
  PaginationType,
  SelectConditionType,
} from "../common/types/general.type";
import { axiosHelper } from "./http-method.helper";
const { postRequest , getRequest} = axiosHelper;

const getPayrollNews = (
  searchConditions: SelectConditionType[]
): Promise<AxiosResponse<PaginationType>> => {
  return postRequest(WEB_SERVICE_API_PAYROLL_NEWS_GET_COLLECTION, {
    searchConditions,
  });
};
const createPayrollNews = (
  creatData: PayrollNewsType
): Promise<AxiosResponse<PayrollNewsType>> => {
  return postRequest(WEB_SERVICE_API_PAYROLL_NEWS_CREATE, creatData);
};
const createPayrollNewsEmployee = (
  employee_id: number,
  data: PayrollNewsType
): Promise<AxiosResponse<PayrollNewsType>> => {
  return postRequest(`${WEB_SERVICE_API_PAYROLL_NEWS_CREATE}/employees-payrollnews`, {employee_id, payrollNewsDto: data});
};
const getPayrollNewsEmployee = (
  employee_id: number,
): Promise<AxiosResponse<PayrollNewsType>> => {
  return getRequest(`${WEB_SERVICE_API_PAYROLL_NEWS_CREATE}/employees-payrollnews/${employee_id}`, );
};

export const PayrollNewsApiRequest = {
  getPayrollNews,
  createPayrollNews,
  createPayrollNewsEmployee, getPayrollNewsEmployee
};
