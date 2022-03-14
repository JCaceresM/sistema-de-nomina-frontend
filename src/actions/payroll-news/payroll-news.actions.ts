import { SelectConditionType } from "../../common/types/general.type";
import {
  PAYROLL_NEWS_CREATE_PAYROLL_NEWS,
  PAYROLL_NEWS_CREATE_PAYROLL_NEWS_EMPLOYEE,
  PAYROLL_NEWS_CREATE_PAYROLL_NEWS_EMPLOYEE_FAILURE,
  PAYROLL_NEWS_CREATE_PAYROLL_NEWS_EMPLOYEE_SUCCESS,
  PAYROLL_NEWS_CREATE_PAYROLL_NEWS_FAILURE,
  PAYROLL_NEWS_CREATE_PAYROLL_NEWS_SUCCESS,
  PAYROLL_NEWS_GET_COLLECTION,
  PAYROLL_NEWS_GET_COLLECTION_FAILURE,
  PAYROLL_NEWS_GET_COLLECTION_SUCCESS,
  PAYROLL_NEWS_GET_PAYROLL_NEWS_EMPLOYEE,
  PAYROLL_NEWS_GET_PAYROLL_NEWS_EMPLOYEE_FAILURE,
  PAYROLL_NEWS_GET_PAYROLL_NEWS_EMPLOYEE_SUCCESS,
  PAYROLL_NEWS_MANAGER_REDUX_STATE_PAYROLL_NEWS,
} from "../../constants/payroll-news/payroll-news.constants";
import { PayrollNewsState } from "../../reducers/payroll-news/payroll-news.reducer";

export type PayrollNewsType = {
  id?: number;
  amount?: number;
  type?: string;
  description?: string;
  name?: string;
  operation?: string;
  company_id?: number;
  status?: string;
  updated_at?: Date;
  created_at?: Date;
  user_update?: string;
  user_insert?: string;
  payroll_id?: number;
  employee_id?: number;
};
export type PayrollNewsManagerReduxStateAction = {
  state: Partial<PayrollNewsState>;
  type: typeof PAYROLL_NEWS_MANAGER_REDUX_STATE_PAYROLL_NEWS;
};

export const payrollNewsManagerReduxState = (
  state: Partial<PayrollNewsState>
): PayrollNewsManagerReduxStateAction => {
  return {
    type: PAYROLL_NEWS_MANAGER_REDUX_STATE_PAYROLL_NEWS,
    state,
  };
};
export type GetPayrollNewsCollectionAction = {
  type: typeof PAYROLL_NEWS_GET_COLLECTION;
  searchConditions?: SelectConditionType[];
};

export const getPayrollnewsCollection = (
  searchConditions?: SelectConditionType[]
): GetPayrollNewsCollectionAction => {
  return {
    type: PAYROLL_NEWS_GET_COLLECTION,
    searchConditions,
  };
};

type GetPayrollNewsCollectionSuccessAction = {
  type: typeof PAYROLL_NEWS_GET_COLLECTION_SUCCESS;
  payrollNewsCollection: PayrollNewsType[];
};

export const getPayrollNewsCollectionSuccess = (
  payrollNewsCollection: PayrollNewsType[]
): GetPayrollNewsCollectionSuccessAction => {
  return {
    type: PAYROLL_NEWS_GET_COLLECTION_SUCCESS,
    payrollNewsCollection,
  };
};

type GetPayrollNewsCollectionFailureAction = {
  type: typeof PAYROLL_NEWS_GET_COLLECTION_FAILURE;
};

export const getPayrollNewsCollectionFailure =
  (): GetPayrollNewsCollectionFailureAction => {
    return {
      type: PAYROLL_NEWS_GET_COLLECTION_FAILURE,
    };
  };
// ---------------------------create-------------------------------------
export type CreatePayrollNews = {
  type: typeof PAYROLL_NEWS_CREATE_PAYROLL_NEWS;
  createPayrollNews: PayrollNewsType;
};

export const createPayrollNews = (
  createPayrollNews: PayrollNewsType
): CreatePayrollNews => {
  return {
    createPayrollNews,
    type: PAYROLL_NEWS_CREATE_PAYROLL_NEWS,
  };
};

type CreatePayrollNewsSuccessAction = {
  type: typeof PAYROLL_NEWS_CREATE_PAYROLL_NEWS_SUCCESS;
  createPayrollNews: PayrollNewsType;
};

export const createPayrollNewsSuccess = (
  createPayrollNews: PayrollNewsType
): CreatePayrollNewsSuccessAction => {
  return {
    type: PAYROLL_NEWS_CREATE_PAYROLL_NEWS_SUCCESS,
    createPayrollNews,
  };
};

type CreatePayrollNewsFailureAction = {
  type: typeof PAYROLL_NEWS_CREATE_PAYROLL_NEWS_FAILURE;
};

export const createPayrollNewsFailure = (): CreatePayrollNewsFailureAction => {
  return {
    type: PAYROLL_NEWS_CREATE_PAYROLL_NEWS_FAILURE,
  };
};
// ---------------------------create-for-employee-----------------------------------
export type CreatePayrollNewsEmployee = {
  type: typeof PAYROLL_NEWS_CREATE_PAYROLL_NEWS_EMPLOYEE;
  payrollNews: PayrollNewsType;
  employee_id: number;
};

export const createPayrollNewsEmployee = (
  employee_id: number,
  payrollNews: PayrollNewsType
): CreatePayrollNewsEmployee => {
  return {
    payrollNews,
    employee_id,
    type: PAYROLL_NEWS_CREATE_PAYROLL_NEWS_EMPLOYEE,
  };
};

type CreatePayrollNewsEmployeeSuccessAction = {
  type: typeof PAYROLL_NEWS_CREATE_PAYROLL_NEWS_EMPLOYEE_SUCCESS;
};

export const createPayrollNewsEmployeeSuccess =
  (): CreatePayrollNewsEmployeeSuccessAction => {
    return {
      type: PAYROLL_NEWS_CREATE_PAYROLL_NEWS_EMPLOYEE_SUCCESS,
    };
  };

type CreatePayrollNewsEmployeeFailureAction = {
  type: typeof PAYROLL_NEWS_CREATE_PAYROLL_NEWS_EMPLOYEE_FAILURE;
};

export const createPayrollNewsEmployeeFailure =
  (): CreatePayrollNewsEmployeeFailureAction => {
    return {
      type: PAYROLL_NEWS_CREATE_PAYROLL_NEWS_EMPLOYEE_FAILURE,
    };
  };
// ---------------------------get-for-employee-----------------------------------
export type GetPayrollNewsEmployee = {
  type: typeof PAYROLL_NEWS_GET_PAYROLL_NEWS_EMPLOYEE;
  employee_id: number;
};

export const getPayrollNewsEmployee = (
  employee_id: number,
): GetPayrollNewsEmployee => {
  return {
    employee_id,
    type: PAYROLL_NEWS_GET_PAYROLL_NEWS_EMPLOYEE,
  };
};

type GetPayrollNewsEmployeeSuccessAction = {
  type: typeof PAYROLL_NEWS_GET_PAYROLL_NEWS_EMPLOYEE_SUCCESS;
  payrollNewsEmployee: PayrollNewsType[];
};

export const getPayrollNewsEmployeeSuccess = (
  payrollNewsEmployee: PayrollNewsType[]
): GetPayrollNewsEmployeeSuccessAction => {
  return {
    type: PAYROLL_NEWS_GET_PAYROLL_NEWS_EMPLOYEE_SUCCESS,
    payrollNewsEmployee,
  };
};

type GetPayrollNewsEmployeeFailureAction = {
  type: typeof PAYROLL_NEWS_GET_PAYROLL_NEWS_EMPLOYEE_FAILURE;
};

export const getPayrollNewsEmployeeFailure =
  (): GetPayrollNewsEmployeeFailureAction => {
    return {
      type: PAYROLL_NEWS_GET_PAYROLL_NEWS_EMPLOYEE_FAILURE,
    };
  };

export type PayrollNews =
  | GetPayrollNewsCollectionAction
  | GetPayrollNewsCollectionSuccessAction
  | GetPayrollNewsCollectionFailureAction
  | CreatePayrollNewsFailureAction
  | CreatePayrollNewsSuccessAction
  | CreatePayrollNews
  | PayrollNewsManagerReduxStateAction
  | CreatePayrollNewsEmployee
  | CreatePayrollNewsEmployeeSuccessAction
  | CreatePayrollNewsEmployeeFailureAction
  | GetPayrollNewsEmployeeFailureAction
  | GetPayrollNewsEmployeeSuccessAction
  | GetPayrollNewsEmployee;
