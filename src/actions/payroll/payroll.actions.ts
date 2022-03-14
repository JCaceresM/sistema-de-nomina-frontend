import { SelectConditionType } from "../../common/types/general.type";
import {
  PAYROLL_CREATE_PAYROLL,
  PAYROLL_CREATE_PAYROLL_FAILURE,
  PAYROLL_CREATE_PAYROLL_SUCCESS,
  PAYROLL_GET_ALL_PAYROLL,
  PAYROLL_GET_ALL_PAYROLL_FAILURE,
  PAYROLL_GET_ALL_PAYROLL_SUCCESS,
  PAYROLL_MANAGER_REDUX_STATE_PAYROLL,
  PAYROLL_UPDATE_PAYROLL_EMPLOYEE,
  PAYROLL_UPDATE_PAYROLL_EMPLOYEE_FAILURE,
  PAYROLL_UPDATE_PAYROLL_EMPLOYEE_SUCCESS,
} from "../../constants/payroll/payroll.constants";
import { PayrollState } from "../../reducers/payroll/payroll.reducer";
import { EmployeeType } from "../employee/employee.actions";
import { PayrollNewsType } from "../payroll-news/payroll-news.actions";

export type PayrollType = {
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
export type PayrollManagerReduxStateAction = {
  state: Partial<PayrollState>;
  type: typeof PAYROLL_MANAGER_REDUX_STATE_PAYROLL;
};

export const payrollManagerReduxState = (
  state: Partial<PayrollState>
): PayrollManagerReduxStateAction => {
  return {
    type: PAYROLL_MANAGER_REDUX_STATE_PAYROLL,
    state,
  };
};
export type GetAllPayrollAction = {
  type: typeof PAYROLL_GET_ALL_PAYROLL;
  searchConditions?: SelectConditionType[];
};

export const getAllPayroll = (
  searchConditions?: SelectConditionType[]
): GetAllPayrollAction => {
  return {
    type: PAYROLL_GET_ALL_PAYROLL,
    searchConditions,
  };
};

type GetAllPayrollSuccessAction = {
  type: typeof PAYROLL_GET_ALL_PAYROLL_SUCCESS;
  AllPayroll: PayrollType[];
};

export const getAllPayrollSuccess = (
  AllPayroll: PayrollType[]
): GetAllPayrollSuccessAction => {
  return {
    type: PAYROLL_GET_ALL_PAYROLL_SUCCESS,
    AllPayroll,
  };
};

type GetAllPayrollFailureAction = {
  type: typeof PAYROLL_GET_ALL_PAYROLL_FAILURE;
};

export const getAllPayrollFailure = (): GetAllPayrollFailureAction => {
  return {
    type: PAYROLL_GET_ALL_PAYROLL_FAILURE,
  };
};
// ---------------------------create-------------------------------------
export type CreatePayrollAction = {
  type: typeof PAYROLL_CREATE_PAYROLL;
  createPayroll: PayrollType;
};

export const createPayroll = (
  createPayroll: PayrollType
): CreatePayrollAction => {
  return {
    createPayroll,
    type: PAYROLL_CREATE_PAYROLL,
  };
};

type CreatePayrollSuccessAction = {
  type: typeof PAYROLL_CREATE_PAYROLL_SUCCESS;
  createPayroll: PayrollType;
};

export const createPayrollSuccess = (
  createPayroll: PayrollType
): CreatePayrollSuccessAction => {
  return {
    type: PAYROLL_CREATE_PAYROLL_SUCCESS,
    createPayroll,
  };
};

type CreatePayrollFailureAction = {
  type: typeof PAYROLL_CREATE_PAYROLL_FAILURE;
};

export const createPayrollFailure = (): CreatePayrollFailureAction => {
  return {
    type: PAYROLL_CREATE_PAYROLL_FAILURE,
  };
};

//-------------add-employees-------------------//
export type UpdatePayrollEmployeesAction = {
  type: typeof PAYROLL_UPDATE_PAYROLL_EMPLOYEE;
  patchEmployee: Array<Partial<EmployeeType>>
  id: number;
};

export const updatePayrollEmployees = (
  id: number,
  patchEmployee: Array<Partial<EmployeeType>>
): UpdatePayrollEmployeesAction => {
  return { id, patchEmployee, type: PAYROLL_UPDATE_PAYROLL_EMPLOYEE };
};

type UpdatePayrollEmployeesSuccessAction = {
  type: typeof PAYROLL_UPDATE_PAYROLL_EMPLOYEE_SUCCESS;
};

export const updatePayrollEmployeesSuccess = (): UpdatePayrollEmployeesSuccessAction => {
  return {
    type: PAYROLL_UPDATE_PAYROLL_EMPLOYEE_SUCCESS,
  };
};

type UpdatePayrollEmployeesFailureAction = {
  type: typeof PAYROLL_UPDATE_PAYROLL_EMPLOYEE_FAILURE;
};

export const updatePayrollEmployeesFailure = (): UpdatePayrollEmployeesFailureAction => {
  return {
    type: PAYROLL_UPDATE_PAYROLL_EMPLOYEE_FAILURE,
  };
};
export type PayrollActions =
  | GetAllPayrollAction
  | GetAllPayrollSuccessAction
  | GetAllPayrollFailureAction
  | CreatePayrollFailureAction
  | CreatePayrollSuccessAction
  | CreatePayrollAction
  | PayrollManagerReduxStateAction
  | UpdatePayrollEmployeesAction
  | UpdatePayrollEmployeesSuccessAction
  | UpdatePayrollEmployeesFailureAction;
