import { ResponseMetadata } from "../../common/types/response.type"
import {
  DEPARTMENT_CREATE_DEPARTMENT,
  DEPARTMENT_CREATE_DEPARTMENT_FAILURE,
  DEPARTMENT_CREATE_DEPARTMENT_SUCCESS,
  DEPARTMENT_GET_ALL_DEPARTMENT,
  DEPARTMENT_GET_ALL_DEPARTMENT_FAILURE,
  DEPARTMENT_GET_ALL_DEPARTMENT_SUCCESS,
  DEPARTMENT_MANAGER_REDUX_STATE_DEPARTMENT,
} from "../../constants/department/department.constants"
// eslint-disable-next-line @typescript-eslint/ban-types
export type DepartmentType = {}
export type DepartmentManagerReduxStateAction = {
  state: DepartmentType
  type: typeof DEPARTMENT_MANAGER_REDUX_STATE_DEPARTMENT
}

export const departmentManagerReduxState = (
  state: DepartmentType
): DepartmentManagerReduxStateAction => {
  return {
    type: DEPARTMENT_MANAGER_REDUX_STATE_DEPARTMENT,
    state,
  }
}
export type GetAllDepartmentAction = {
  type: typeof DEPARTMENT_GET_ALL_DEPARTMENT
}

export const getAllDepartment = (): GetAllDepartmentAction => {
  return {
    type: DEPARTMENT_GET_ALL_DEPARTMENT,
  }
}

type GetAllDepartmentSuccessAction = {
  type: typeof DEPARTMENT_GET_ALL_DEPARTMENT_SUCCESS
  AllDepartment: DepartmentType[]
  metadata: ResponseMetadata
}

export const getAllDepartmentSuccess = (
  AllDepartment: DepartmentType[],
  metadata: ResponseMetadata
): GetAllDepartmentSuccessAction => {
  return {
    type: DEPARTMENT_GET_ALL_DEPARTMENT_SUCCESS,
    AllDepartment,
    metadata,
  }
}

type GetAllDepartmentFailureAction = {
  type: typeof DEPARTMENT_GET_ALL_DEPARTMENT_FAILURE
}

export const getAllDepartmentFailure = (): GetAllDepartmentFailureAction => {
  return {
    type: DEPARTMENT_GET_ALL_DEPARTMENT_FAILURE,
  }
}
// ---------------------------create-------------------------------------
export type CreateDepartmentAction = {
  type: typeof DEPARTMENT_CREATE_DEPARTMENT
  createDepartment: DepartmentType
}

export const createDepartment = (
  createDepartment: DepartmentType
): CreateDepartmentAction => {
  return {
    createDepartment,
    type: DEPARTMENT_CREATE_DEPARTMENT,
  }
}

type CreateDepartmentSuccessAction = {
  type: typeof DEPARTMENT_CREATE_DEPARTMENT_SUCCESS
  createDepartment: DepartmentType
}

export const createDepartmentSuccess = (
  createDepartment: DepartmentType
): CreateDepartmentSuccessAction => {
  return {
    type: DEPARTMENT_CREATE_DEPARTMENT_SUCCESS,
    createDepartment,
  }
}

type CreateDepartmentFailureAction = {
  type: typeof DEPARTMENT_CREATE_DEPARTMENT_FAILURE
}

export const createDepartmentFailure = (): CreateDepartmentFailureAction => {
  return {
    type: DEPARTMENT_CREATE_DEPARTMENT_FAILURE,
  }
}

export type DepartmentActions =
  | GetAllDepartmentAction
  | GetAllDepartmentSuccessAction
  | GetAllDepartmentFailureAction
  | CreateDepartmentFailureAction
  | CreateDepartmentSuccessAction
  | CreateDepartmentAction
  | DepartmentManagerReduxStateAction
