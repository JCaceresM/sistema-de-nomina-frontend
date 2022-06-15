/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SelectConditionType } from "../../common/types/general.type";
import {
  PAYROLL_RECORD_AUTHORIZED_PAYROLL_RECORD,
  PAYROLL_RECORD_AUTHORIZED_PAYROLL_RECORD_FAILURE,
  PAYROLL_RECORD_AUTHORIZED_PAYROLL_RECORD_SUCCESS,
  PAYROLL_RECORD_CREATE_PAYROLL_LAW_BONUS_RECORD,
  PAYROLL_RECORD_CREATE_PAYROLL_LAW_BONUS_RECORD_FAILURE,
  PAYROLL_RECORD_CREATE_PAYROLL_LAW_BONUS_RECORD_SUCCESS,
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
import { PayrollRecordState } from "../../reducers/payroll-record/payroll-record.reducer";

export type PayrollRecordType = {
  id: number;
  company_id: number;
  name: string;
  type: string;
  registered_at: Date;
  description: string;
  status: string;
  updated_at: Date;
  created_at: Date;
  user_update: string;
  user_insert: string;
  payroll_id: number;
  payroll_record_detail: PayrollRecordDetailType[];
};
export type PayrollRecordDetailType = {
  id: number;
  updated_at: Date;
  created_at: Date;
  user_update: string;
  user_insert: string;
  voucher: number;
  salary: number;
  payroll_record_id: number;
  employee_id: number;
  payroll_news_record: payrolNewsRecord[];
  first_name: string;
  last_name: string;
  gender: string;
  payment_method: string;
  document_id: string;
  position_name: string;
};
export type payrolNewsRecord = {
  id: number;
  updated_at: Date;
  created_at: Date;
  user_update: string;
  user_insert: string;
  amount: number;
  type: string;
  description: string;
  name: string;
  operation: string;
  company_id: number;
  status: string;
  payroll_record_detail_id: number;
};
// export type PayrollRecordExtendedType  = PayrollRecordType &{
//   payroll_record_detail: PayrollRecordDetailType & { payroll_news_record: PayrollNewsType[] }[]
// }
export type PayrollRecordManagerReduxStateAction = {
  state: any;
  type: typeof PAYROLL_RECORD_MANAGER_REDUX_STATE_PAYROLL_RECORD;
};

export const payrollRecordManagerReduxState = (
  state: Partial<PayrollRecordState>
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
export type CreatePayrollLawBonusRecordAction = {
  type: typeof PAYROLL_RECORD_CREATE_PAYROLL_LAW_BONUS_RECORD;
  PayrollRecord: any;
};

export const createPayrollLawBonusRecord = (
  PayrollRecord: any
): CreatePayrollLawBonusRecordAction => {
  return {
    PayrollRecord,
    type: PAYROLL_RECORD_CREATE_PAYROLL_LAW_BONUS_RECORD,
  };
};

type CreatePayrollLawBonusRecordSuccessAction = {
  type: typeof PAYROLL_RECORD_CREATE_PAYROLL_LAW_BONUS_RECORD_SUCCESS;
  createdPayrollRecord: any;
};

export const createPayrollLawBonusRecordSuccess = (
  createdPayrollRecord: any
): CreatePayrollLawBonusRecordSuccessAction => {
  return {
    type: PAYROLL_RECORD_CREATE_PAYROLL_LAW_BONUS_RECORD_SUCCESS,
    createdPayrollRecord,
  };
};

type CreatePayrollLawBonusRecordFailureAction = {
  type: typeof PAYROLL_RECORD_CREATE_PAYROLL_LAW_BONUS_RECORD_FAILURE;
};

export const createPayrollLawBonusRecordFailure =
  (): CreatePayrollLawBonusRecordFailureAction => {
    return {
      type: PAYROLL_RECORD_CREATE_PAYROLL_LAW_BONUS_RECORD_FAILURE,
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
  PayrollRecord: any
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
// ---------------------------Payroll Record Authorized-------------------------------------
export type PayrollRecordAuthorizedAction = {
  type: typeof PAYROLL_RECORD_AUTHORIZED_PAYROLL_RECORD;
  payroll_record_id: number;
  bank_account_id: number;
  transaction_type: string;
};

export const payrollRecordAuthorized = (
  bank_account_id: number,
  payroll_record_id: number,
  transaction_type: string
): PayrollRecordAuthorizedAction => {
  return {
    bank_account_id,
    payroll_record_id,
    transaction_type,
    type: PAYROLL_RECORD_AUTHORIZED_PAYROLL_RECORD,
  };
};

type PayrollRecordAuthorizedSuccessAction = {
  type: typeof PAYROLL_RECORD_AUTHORIZED_PAYROLL_RECORD_SUCCESS;
};

export const payrollRecordAuthorizedSuccess =
  (): PayrollRecordAuthorizedSuccessAction => {
    return {
      type: PAYROLL_RECORD_AUTHORIZED_PAYROLL_RECORD_SUCCESS,
    };
  };

type PayrollRecordAuthorizedFailureAction = {
  type: typeof PAYROLL_RECORD_AUTHORIZED_PAYROLL_RECORD_FAILURE;
};

export const payrollRecordAuthorizedFailure =
  (): PayrollRecordAuthorizedFailureAction => {
    return {
      type: PAYROLL_RECORD_AUTHORIZED_PAYROLL_RECORD_FAILURE,
    };
  };

export type PayrollRecordActions =
  | PayrollRecordAuthorizedAction
  | PayrollRecordAuthorizedSuccessAction
  | PayrollRecordAuthorizedFailureAction
  | GetPayrollRecordCollectionAction
  | GetPayrollRecordCollectionSuccessAction
  | GetPayrollRecordCollectionFailureAction
  | CreatePayrollRecordFailureAction
  | CreatePayrollRecordSuccessAction
  | CreatePayrollRecordAction
  | PayrollRecordManagerReduxStateAction
  | UpdatePayrollRecordAction
  | UpdatePayrollRecordSuccessAction
  | UpdatePayrollRecordFailureAction
  | CreatePayrollLawBonusRecordAction
  | CreatePayrollLawBonusRecordSuccessAction
  | CreatePayrollLawBonusRecordFailureAction;
