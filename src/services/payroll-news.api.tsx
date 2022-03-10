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
const { postRequest } = axiosHelper;

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

export const PayrollNewsApiRequest = {
  getPayrollNews,
  createPayrollNews,
};
