import { PaginationType } from "../../common/types/general.type"
import { ResponseMetadata } from "../../common/types/response.type"
import {
  EMPLOYEE_GET_ALL_EMPLOYEE,
  EMPLOYEE_GET_ALL_EMPLOYEE_FAILURE,
  EMPLOYEE_GET_ALL_EMPLOYEE_SUCCESS,
} from "../../constants/employee/employee.constants"
// eslint-disable-next-line @typescript-eslint/ban-types
export type EmployeeType = {}
export type GetAllEmployeeAction = {
  type: typeof EMPLOYEE_GET_ALL_EMPLOYEE
  pagination: PaginationType
}

export const getAllEmployee = (
  pagination: PaginationType
): GetAllEmployeeAction => {
  return {
    type: EMPLOYEE_GET_ALL_EMPLOYEE,
    pagination,
  }
}

type GetAllEmployeeSuccessAction = {
  type: typeof EMPLOYEE_GET_ALL_EMPLOYEE_SUCCESS
  AllEmployee: EmployeeType[]
  metadata: ResponseMetadata
}

export const getAllEmployeeSuccess = (
  AllEmployee: EmployeeType[],
  metadata: ResponseMetadata
): GetAllEmployeeSuccessAction => {
  return {
    type: EMPLOYEE_GET_ALL_EMPLOYEE_SUCCESS,
    AllEmployee,
    metadata,
  }
}

type GetAllEmployeeFailureAction = {
  type: typeof EMPLOYEE_GET_ALL_EMPLOYEE_FAILURE
}

export const getAllEmployeeFailure = (): GetAllEmployeeFailureAction => {
  return {
    type: EMPLOYEE_GET_ALL_EMPLOYEE_FAILURE,
  }
}

export type EmployeeAction =
  | GetAllEmployeeAction
  | GetAllEmployeeSuccessAction
  | GetAllEmployeeFailureAction
