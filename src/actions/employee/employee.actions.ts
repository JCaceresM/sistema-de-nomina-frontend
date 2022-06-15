import {
  PaginationType,
  SelectConditionType,
} from "../../common/types/general.type";
import { ResponseMetadata } from "../../common/types/response.type";
import {
  EMPLOYEE_CREATE_EMPLOYEE,
  EMPLOYEE_CREATE_EMPLOYEE_FAILURE,
  EMPLOYEE_CREATE_EMPLOYEE_SUCCESS,
  EMPLOYEE_GET_EMPLOYEE,
  EMPLOYEE_GET_EMPLOYEE_FAILURE,
  EMPLOYEE_GET_EMPLOYEE_LAW_BONUS,
  EMPLOYEE_GET_EMPLOYEE_LAW_BONUS_FAILURE,
  EMPLOYEE_GET_EMPLOYEE_LAW_BONUS_SUCCESS,
  EMPLOYEE_GET_EMPLOYEE_SUCCESS,
  EMPLOYEE_MANAGER_REDUX_STATE_EMPLOYEE,
  EMPLOYEE_UPDATE_EMPLOYEE,
  EMPLOYEE_UPDATE_EMPLOYEE_FAILURE,
  EMPLOYEE_UPDATE_EMPLOYEE_SUCCESS,
} from "../../constants/employee/employee.constants";
import { EmployeeState, LawBonusType } from "../../reducers/employee/employee.reducer";
import { PayrollNewsType } from "../payroll-news/payroll-news.actions";
export type EmployeeType = {
  age: number;
  blond_type: string;
  born_date: Date;
  cell: string;
  cell_emergency_contact: string;
  created_at: Date;
  department: string;
  department_id: number;
  document_id: string;
  email: string;
  fax: string;
  first_name: string;
  full_name_emergency_contact: string;
  gender: string;
  hire_date: Date;
  id: number;
  last_name: string;
  marital_status: string;
  nss: string;
  payment_method: string;
  payroll_id: string;
  payroll_news: PayrollNewsType[];
  position_id: number;
  relation_emergency_contact: string;
  relinquishment: boolean;
  relinquishment_detail: string;
  status: string;
  tell: string;
  tell_emergency_contact: string;
  updated_at: Date;
  user_insert: string;
  user_update: string;
  working_time: string;
  salary: number;
  company_id: number;
};
export type employeeManagerReduxStateAction = {
  state: Partial<EmployeeState>;
  type: typeof EMPLOYEE_MANAGER_REDUX_STATE_EMPLOYEE;
};

export const employeeManagerReduxState = (
  state: Partial<EmployeeState>
): employeeManagerReduxStateAction => {
  return {
    type: EMPLOYEE_MANAGER_REDUX_STATE_EMPLOYEE,
    state,
  };
};
export type GetEmployeeAction = {
  type: typeof EMPLOYEE_GET_EMPLOYEE;
  pagination: PaginationType;
  searchConditions?: SelectConditionType[];
};

export const getEmployee = ({
  pagination,
  searchConditions = [],
}: {
  pagination: PaginationType;
  searchConditions?: SelectConditionType[];
}): GetEmployeeAction => {
  return {
    type: EMPLOYEE_GET_EMPLOYEE,
    pagination,
    searchConditions,
  };
};

type GetEmployeeSuccessAction = {
  type: typeof EMPLOYEE_GET_EMPLOYEE_SUCCESS;
  Employees: EmployeeType[];
  metadata: ResponseMetadata;
};

export const getEmployeeSuccess = (
  Employee: EmployeeType[],
  metadata: ResponseMetadata
): GetEmployeeSuccessAction => {
  return {
    type: EMPLOYEE_GET_EMPLOYEE_SUCCESS,
    Employees: Employee,
    metadata,
  };
};

type GetEmployeeFailureAction = {
  type: typeof EMPLOYEE_GET_EMPLOYEE_FAILURE;
};

export const getEmployeeFailure = (): GetEmployeeFailureAction => {
  return {
    type: EMPLOYEE_GET_EMPLOYEE_FAILURE,
  };
};
// -------------------------------------------------------
export type GetEmployeeLawBonusAction = {
  type: typeof EMPLOYEE_GET_EMPLOYEE_LAW_BONUS;
  searchConditions?: SelectConditionType[];
};

export const getEmployeeLawBonus = ({
  searchConditions = [],
}: {
  searchConditions?: SelectConditionType[];
}): GetEmployeeLawBonusAction => {
  return {
    type: EMPLOYEE_GET_EMPLOYEE_LAW_BONUS,
    searchConditions,
  };
};

type GetEmployeeLawBonusSuccessAction = {
  type: typeof EMPLOYEE_GET_EMPLOYEE_LAW_BONUS_SUCCESS;
  data: LawBonusType[]
};

export const getEmployeeLawBonusSuccess = (
  data: LawBonusType[]
): GetEmployeeLawBonusSuccessAction => ({
  type: EMPLOYEE_GET_EMPLOYEE_LAW_BONUS_SUCCESS,
  data,
});

type GetEmployeeLawBonusFailureAction = {
  type: typeof EMPLOYEE_GET_EMPLOYEE_LAW_BONUS_FAILURE;
};

export const getEmployeeLawBonusFailure =
  (): GetEmployeeLawBonusFailureAction => {
    return {
      type: EMPLOYEE_GET_EMPLOYEE_LAW_BONUS_FAILURE,
    };
  };
// -----------------create------------------------
export type CreateEmployeeAction = {
  type: typeof EMPLOYEE_CREATE_EMPLOYEE;
  create: Partial<EmployeeType>;
};

export const createEmployee = (
  create: Partial<EmployeeType>
): CreateEmployeeAction => {
  return {
    create,
    type: EMPLOYEE_CREATE_EMPLOYEE,
  };
};

type CreateEmployeeSuccessAction = {
  type: typeof EMPLOYEE_CREATE_EMPLOYEE_SUCCESS;
  created: EmployeeType;
};

export const createEmployeeSuccess = (
  created: EmployeeType
): CreateEmployeeSuccessAction => {
  return {
    type: EMPLOYEE_CREATE_EMPLOYEE_SUCCESS,
    created,
  };
};

type CreateEmployeeFailureAction = {
  type: typeof EMPLOYEE_CREATE_EMPLOYEE_FAILURE;
};

export const createEmployeeFailure = (): CreateEmployeeFailureAction => {
  return {
    type: EMPLOYEE_CREATE_EMPLOYEE_FAILURE,
  };
};
//-------------------update-------------------//
export type UpdateEmployeeAction = {
  type: typeof EMPLOYEE_UPDATE_EMPLOYEE;
  patchEmployee: Partial<EmployeeType>;
  id: number;
};

export const updateEmployee = (
  id: number,
  patchEmployee: Partial<EmployeeType>
): UpdateEmployeeAction => {
  return { id, patchEmployee, type: EMPLOYEE_UPDATE_EMPLOYEE };
};

type UpdateEmployeeSuccessAction = {
  type: typeof EMPLOYEE_UPDATE_EMPLOYEE_SUCCESS;
  UpdatedEmployee: EmployeeType;
};

export const updateEmployeeSuccess = (
  UpdatedEmployee: EmployeeType
): UpdateEmployeeSuccessAction => {
  return {
    type: EMPLOYEE_UPDATE_EMPLOYEE_SUCCESS,
    UpdatedEmployee,
  };
};

type UpdateEmployeeFailureAction = {
  type: typeof EMPLOYEE_UPDATE_EMPLOYEE_FAILURE;
};

export const updateEmployeeFailure = (): UpdateEmployeeFailureAction => {
  return {
    type: EMPLOYEE_UPDATE_EMPLOYEE_FAILURE,
  };
};
export type EmployeeAction =
  | GetEmployeeAction
  | GetEmployeeSuccessAction
  | GetEmployeeFailureAction
  | CreateEmployeeAction
  | CreateEmployeeSuccessAction
  | CreateEmployeeFailureAction
  | employeeManagerReduxStateAction
  | UpdateEmployeeAction
  | UpdateEmployeeSuccessAction
  | UpdateEmployeeFailureAction
  | GetEmployeeLawBonusAction
  | GetEmployeeLawBonusSuccessAction
  | GetEmployeeLawBonusFailureAction;
