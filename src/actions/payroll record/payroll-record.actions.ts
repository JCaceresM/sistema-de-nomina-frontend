/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SelectConditionType } from "../../common/types/general.type";
import {
  PAYROLL_RECORD_CREATE_PAYROLL_RECORD,
  PAYROLL_RECORD_CREATE_PAYROLL_RECORD_FAILURE,
  PAYROLL_RECORD_CREATE_PAYROLL_RECORD_SUCCESS,
  PAYROLL_RECORD_GET_COLLECTION_PAYROLL_RECORD,
  PAYROLL_RECORD_GET_COLLECTION_PAYROLL_RECORD_FAILURE,
  PAYROLL_RECORD_GET_COLLECTION_PAYROLL_RECORD_SUCCESS,
  PAYROLL_RECORD_MANAGER_REDUX_STATE_PAYROLL_RECORD,
  PAYROLL_RECORD_UPDATE_PAYROLL_RECORD,
  PAYROLL_RECORD_UPDATE_PAYROLL_RECORD_FAILURE,
  PAYROLL_RECORD_UPDATE_PAYROLL_RECORD_SUCCESS,
} from "../../constants/payroll-record/payroll-record.constants";

import { PayrollNewsType } from "../payroll news/payroll-news.actions";

export type PayrollRecordType = {
  id: number;
  company_id: number;
  name: string;
  type: string;
  description: string;
  status: string;
  updated_at: string;
  created_at: string;
  user_update: string;
  user_insert: string;
  bank_account_id: number;
  department_id: number;
  payroll_news: PayrollNewsType[];
};
// export type PayrollRecordExtendedType  = PayrollRecordType &{
//   payroll_record_detail: PayrollRecordDetailType & { payroll_news_record: PayrollNewsType[] }[]
// }
export type PayrollRecordManagerReduxStateAction = {
  state: any;
  type: typeof PAYROLL_RECORD_MANAGER_REDUX_STATE_PAYROLL_RECORD;
};

export const payrollRecordManagerReduxState = (
  state: any
): PayrollRecordManagerReduxStateAction => {
  return {
    type: PAYROLL_RECORD_MANAGER_REDUX_STATE_PAYROLL_RECORD,
    state,
  };
};
export type GetPayrollRecordCollectionAction = {
  type: typeof PAYROLL_RECORD_GET_COLLECTION_PAYROLL_RECORD;
  searchConditions?: SelectConditionType[];
};

export const getPayrollRecordCollection = (
  searchConditions?: SelectConditionType[]
): GetPayrollRecordCollectionAction => {
  return {
    type: PAYROLL_RECORD_GET_COLLECTION_PAYROLL_RECORD,
    searchConditions,
  };
};

type GetPayrollRecordCollectionSuccessAction = {
  type: typeof PAYROLL_RECORD_GET_COLLECTION_PAYROLL_RECORD_SUCCESS;
  PayrollRecordCollection: any[];
};

export const getPayrollRecordCollectionSuccess = (
  PayrollRecordCollection: any[]
): GetPayrollRecordCollectionSuccessAction => {
  return {
    type: PAYROLL_RECORD_GET_COLLECTION_PAYROLL_RECORD_SUCCESS,
    PayrollRecordCollection,
  };
};

type GetPayrollRecordCollectionFailureAction = {
  type: typeof PAYROLL_RECORD_GET_COLLECTION_PAYROLL_RECORD_FAILURE;
};

export const getPayrollRecordCollectionFailure =
  (): GetPayrollRecordCollectionFailureAction => {
    return {
      type: PAYROLL_RECORD_GET_COLLECTION_PAYROLL_RECORD_FAILURE,
    };
  };
// ---------------------------create-------------------------------------
export type CreatePayrollRecordAction = {
  type: typeof PAYROLL_RECORD_CREATE_PAYROLL_RECORD;
  PayrollRecord: any;
};

export const createPayrollRecord = (
  PayrollRecord: any
): CreatePayrollRecordAction => {
  return {
    PayrollRecord,
    type: PAYROLL_RECORD_CREATE_PAYROLL_RECORD,
  };
};

type CreatePayrollRecordSuccessAction = {
  type: typeof PAYROLL_RECORD_CREATE_PAYROLL_RECORD_SUCCESS;
  createdPayrollRecord: any;
};

export const createPayrollRecordSuccess = (
  createdPayrollRecord: any
): CreatePayrollRecordSuccessAction => {
  return {
    type: PAYROLL_RECORD_CREATE_PAYROLL_RECORD_SUCCESS,
    createdPayrollRecord,
  };
};

type CreatePayrollRecordFailureAction = {
  type: typeof PAYROLL_RECORD_CREATE_PAYROLL_RECORD_FAILURE;
};

export const createPayrollRecordFailure =
  (): CreatePayrollRecordFailureAction => {
    return {
      type: PAYROLL_RECORD_CREATE_PAYROLL_RECORD_FAILURE,
    };
  };
// ---------------------------update-------------------------------------
export type UpdatePayrollRecordAction = {
  type: typeof PAYROLL_RECORD_UPDATE_PAYROLL_RECORD;
  PayrollRecord: any;
  id: number;
};

export const updatePayrollRecord = (
  id: number,
  PayrollRecord: any,
): UpdatePayrollRecordAction => {
  return { id, PayrollRecord, type: PAYROLL_RECORD_UPDATE_PAYROLL_RECORD };
};

type UpdatePayrollRecordSuccessAction = {
  type: typeof PAYROLL_RECORD_UPDATE_PAYROLL_RECORD_SUCCESS;
  UpdatedPayrollRecord: any;
};

export const updatePayrollRecordSuccess = (
  UpdatedPayrollRecord: any
): UpdatePayrollRecordSuccessAction => {
  return {
    type: PAYROLL_RECORD_UPDATE_PAYROLL_RECORD_SUCCESS,
    UpdatedPayrollRecord,
  };
};

type UpdatePayrollRecordFailureAction = {
  type: typeof PAYROLL_RECORD_UPDATE_PAYROLL_RECORD_FAILURE;
};

export const updatePayrollRecordFailure =
  (): UpdatePayrollRecordFailureAction => {
    return {
      type: PAYROLL_RECORD_UPDATE_PAYROLL_RECORD_FAILURE,
    };
  };

export type PayrollRecordActions =
  | GetPayrollRecordCollectionAction
  | GetPayrollRecordCollectionSuccessAction
  | GetPayrollRecordCollectionFailureAction
  | CreatePayrollRecordFailureAction
  | CreatePayrollRecordSuccessAction
  | CreatePayrollRecordAction
  | PayrollRecordManagerReduxStateAction
  | UpdatePayrollRecordAction
  | UpdatePayrollRecordSuccessAction
  | UpdatePayrollRecordFailureAction;
