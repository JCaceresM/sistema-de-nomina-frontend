import {
  PaginationType,
  SelectConditionType,
} from "../../common/types/general.type";
import { ResponseMetadata } from "../../common/types/response.type";
import {
  DEPARTMENT_CREATE_DEPARTMENT,
  DEPARTMENT_CREATE_DEPARTMENT_FAILURE,
  DEPARTMENT_CREATE_DEPARTMENT_SUCCESS,
  DEPARTMENT_DELETE_PAYROLL,
  DEPARTMENT_DELETE_PAYROLL_FAILURE,
  DEPARTMENT_DELETE_PAYROLL_SUCCESS,
  DEPARTMENT_GET_ALL_DEPARTMENT,
  DEPARTMENT_GET_ALL_DEPARTMENT_FAILURE,
  DEPARTMENT_GET_ALL_DEPARTMENT_SUCCESS,
  DEPARTMENT_GET_EMPLOYEES_DEPARTMENT,
  DEPARTMENT_GET_EMPLOYEES_DEPARTMENT_FAILURE,
  DEPARTMENT_GET_EMPLOYEES_DEPARTMENT_SUCCESS,
  DEPARTMENT_GET_IN_PAYROLL,
  DEPARTMENT_GET_IN_PAYROLL_FAILURE,
  DEPARTMENT_GET_IN_PAYROLL_SUCCESS,
  DEPARTMENT_GET_NOT_IN_PAYROLL,
  DEPARTMENT_GET_NOT_IN_PAYROLL_FAILURE,
  DEPARTMENT_GET_NOT_IN_PAYROLL_SUCCESS,
  DEPARTMENT_MANAGER_REDUX_STATE_DEPARTMENT,
} from "../../constants/department/department.constants";
import { DepartmentState } from "../../reducers/department/department.reducer";
import { EmployeeType } from "../employee/employee.actions";
export type DepartmentType = {
  id: string;
  name: string;
  location: string;
  budget: string;
  status: string;
  type: string;
  updated_at: string;
  created_at: string;
  user_update: string;
  user_insert: string;
};
export type DepartmentManagerReduxStateAction = {
  state: Partial<DepartmentState>;
  type: typeof DEPARTMENT_MANAGER_REDUX_STATE_DEPARTMENT;
};

export const departmentManagerReduxState = (
  state: Partial<DepartmentState>
): DepartmentManagerReduxStateAction => {
  return {
    type: DEPARTMENT_MANAGER_REDUX_STATE_DEPARTMENT,
    state,
  };
};
export type GetAllDepartmentAction = {
  type: typeof DEPARTMENT_GET_ALL_DEPARTMENT;
};

export const getAllDepartment = (): GetAllDepartmentAction => {
  return {
    type: DEPARTMENT_GET_ALL_DEPARTMENT,
  };
};

type GetAllDepartmentSuccessAction = {
  type: typeof DEPARTMENT_GET_ALL_DEPARTMENT_SUCCESS;
  AllDepartment: DepartmentType[];
  metadata: ResponseMetadata;
};

export const getAllDepartmentSuccess = (
  AllDepartment: DepartmentType[],
  metadata: ResponseMetadata
): GetAllDepartmentSuccessAction => {
  return {
    type: DEPARTMENT_GET_ALL_DEPARTMENT_SUCCESS,
    AllDepartment,
    metadata,
  };
};

type GetAllDepartmentFailureAction = {
  type: typeof DEPARTMENT_GET_ALL_DEPARTMENT_FAILURE;
};

export const getAllDepartmentFailure = (): GetAllDepartmentFailureAction => {
  return {
    type: DEPARTMENT_GET_ALL_DEPARTMENT_FAILURE,
  };
};
// ------------------------------------------------------------------
export type GetDepartmentEmployeesAction = {
  type: typeof DEPARTMENT_GET_EMPLOYEES_DEPARTMENT;
  pagination: PaginationType;
  searchConditions?: SelectConditionType[];
};
export const getDepartmentEmployees = ({
  pagination,
  searchConditions = [],
}: {
  pagination: PaginationType;
  searchConditions?: SelectConditionType[];
}): GetDepartmentEmployeesAction => {
  return {
    type: DEPARTMENT_GET_EMPLOYEES_DEPARTMENT,
    pagination,
    searchConditions,
  };
};

type GetDepartmentEmployeesSuccessAction = {
  type: typeof DEPARTMENT_GET_EMPLOYEES_DEPARTMENT_SUCCESS;
  data: Array<DepartmentType & { employees: EmployeeType[] }>;
  metadata: ResponseMetadata;
};

export const getDepartmentEmployeesSuccess = (
  data: Array<DepartmentType & { employees: EmployeeType[] }>,
  metadata: ResponseMetadata
): GetDepartmentEmployeesSuccessAction => {
  return {
    type: DEPARTMENT_GET_EMPLOYEES_DEPARTMENT_SUCCESS,
    data,
    metadata,
  };
};

type GetDepartmentEmployeesFailureAction = {
  type: typeof DEPARTMENT_GET_EMPLOYEES_DEPARTMENT_FAILURE;
};

export const getDepartmentEmployeesFailure =
  (): GetDepartmentEmployeesFailureAction => {
    return {
      type: DEPARTMENT_GET_EMPLOYEES_DEPARTMENT_FAILURE,
    };
  };
// ---------------------------create-------------------------------------
export type CreateDepartmentAction = {
  type: typeof DEPARTMENT_CREATE_DEPARTMENT;
  createDepartment: DepartmentType;
};

export const createDepartment = (
  createDepartment: DepartmentType
): CreateDepartmentAction => {
  return {
    createDepartment,
    type: DEPARTMENT_CREATE_DEPARTMENT,
  };
};

type CreateDepartmentSuccessAction = {
  type: typeof DEPARTMENT_CREATE_DEPARTMENT_SUCCESS;
  createDepartment: DepartmentType;
};

export const createDepartmentSuccess = (
  createDepartment: DepartmentType
): CreateDepartmentSuccessAction => {
  return {
    type: DEPARTMENT_CREATE_DEPARTMENT_SUCCESS,
    createDepartment,
  };
};

type CreateDepartmentFailureAction = {
  type: typeof DEPARTMENT_CREATE_DEPARTMENT_FAILURE;
};

export const createDepartmentFailure = (): CreateDepartmentFailureAction => {
  return {
    type: DEPARTMENT_CREATE_DEPARTMENT_FAILURE,
  };
};
// ----------------------------------------------
// -------------------------------------------------------------
export type GetDeparmentNotInPayrollAction = {
  type: typeof DEPARTMENT_GET_NOT_IN_PAYROLL;
  pagination?: PaginationType;
  searchConditions?: SelectConditionType[];
};
export const getDeparmentNotInPayroll = ({
  searchConditions,
  pagination,
}: {
  pagination?: PaginationType;
  searchConditions?: SelectConditionType[];
}): GetDeparmentNotInPayrollAction => {
  return {
    type: DEPARTMENT_GET_NOT_IN_PAYROLL,
    searchConditions,
    pagination,
  };
};

type GetDeparmentNotInPayrollSuccessAction = {
  type: typeof DEPARTMENT_GET_NOT_IN_PAYROLL_SUCCESS;
  data: any[];
  subSelectCondition: string;
};

export const getDeparmentNotInPayrollSuccess = (
  data: any[],
  subSelectCondition: string
): GetDeparmentNotInPayrollSuccessAction => {
  return {
    type: DEPARTMENT_GET_NOT_IN_PAYROLL_SUCCESS,
    data,
    subSelectCondition,
  };
};

type GetDeparmentNotInPayrollFailureAction = {
  type: typeof DEPARTMENT_GET_NOT_IN_PAYROLL_FAILURE;
};

export const getDeparmentNotInPayrollFailure =
  (): GetDeparmentNotInPayrollFailureAction => {
    return {
      type: DEPARTMENT_GET_NOT_IN_PAYROLL_FAILURE,
    };
  };
// -------------------------------------------------------------
export type GetDeparmentInPayrollAction = {
  type: typeof DEPARTMENT_GET_IN_PAYROLL;
  pagination?: PaginationType;
  searchConditions?: SelectConditionType[];
};
export const getDeparmentInPayroll = ({
  searchConditions,
  pagination,
}: {
  pagination?: PaginationType;
  searchConditions?: SelectConditionType[];
}): GetDeparmentInPayrollAction => {
  return {
    type: DEPARTMENT_GET_IN_PAYROLL,
    searchConditions,
    pagination,
  };
};

type GetDeparmentInPayrollSuccessAction = {
  type: typeof DEPARTMENT_GET_IN_PAYROLL_SUCCESS;
  data: any[];
  subSelectCondition: string;
};

export const getDeparmentInPayrollSuccess = (
  data: any[],
  subSelectCondition: string
): GetDeparmentInPayrollSuccessAction => {
  return {
    type: DEPARTMENT_GET_IN_PAYROLL_SUCCESS,
    data,
    subSelectCondition,
  };
};

type GetDeparmentInPayrollFailureAction = {
  type: typeof DEPARTMENT_GET_IN_PAYROLL_FAILURE;
};

export const getDeparmentInPayrollFailure =
  (): GetDeparmentInPayrollFailureAction => {
    return {
      type: DEPARTMENT_GET_IN_PAYROLL_FAILURE,
    };
  };
// -------------------------------------------------------
// -------------------------------------------------------------
export type DeleteDeparmentPayrollAction = {
  type: typeof DEPARTMENT_DELETE_PAYROLL;
  payrollId: number;
  departmentId: number;
};
export const deleteDeparmentPayroll = ({
  payrollId,
  departmentId,
}: {
  payrollId: number;
  departmentId: number;
}): DeleteDeparmentPayrollAction => {
  return {
    type: DEPARTMENT_DELETE_PAYROLL,
    payrollId,
    departmentId,
  };
};

type DeleteDeparmentPayrollSuccessAction = {
  type: typeof DEPARTMENT_DELETE_PAYROLL_SUCCESS;
  data: any[];
};

export const deleteDeparmentPayrollSuccess = (
  data: any[]
): DeleteDeparmentPayrollSuccessAction => {
  return {
    type: DEPARTMENT_DELETE_PAYROLL_SUCCESS,
    data,
  };
};

type DeleteDeparmentPayrollFailureAction = {
  type: typeof DEPARTMENT_DELETE_PAYROLL_FAILURE;
};

export const deleteDeparmentPayrollFailure =
  (): DeleteDeparmentPayrollFailureAction => {
    return {
      type: DEPARTMENT_DELETE_PAYROLL_FAILURE,
    };
  };
// -------------------------------------------------------
export type DepartmentActions =
  | GetAllDepartmentAction
  | GetAllDepartmentSuccessAction
  | GetAllDepartmentFailureAction
  | CreateDepartmentFailureAction
  | CreateDepartmentSuccessAction
  | CreateDepartmentAction
  | DepartmentManagerReduxStateAction
  | GetDepartmentEmployeesAction
  | GetDepartmentEmployeesSuccessAction
  | GetDepartmentEmployeesFailureAction
  | GetDeparmentNotInPayrollAction
  | GetDeparmentNotInPayrollSuccessAction
  | GetDeparmentNotInPayrollFailureAction
  | GetDeparmentInPayrollAction
  | GetDeparmentInPayrollSuccessAction
  | GetDeparmentInPayrollFailureAction
  | DeleteDeparmentPayrollSuccessAction
  | DeleteDeparmentPayrollFailureAction
  | DeleteDeparmentPayrollAction;
