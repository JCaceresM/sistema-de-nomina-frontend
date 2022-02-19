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
import { DepartmentState } from "../../reducers/department/department.reducer"
export type DepartmentType = {
  id:string
name:string
location:string
budget:string
status:string
type:string
updated_at:string
created_at:string
user_update:string
user_insert:string
}
export type DepartmentManagerReduxStateAction = {
  state: Partial<DepartmentState>
  type: typeof DEPARTMENT_MANAGER_REDUX_STATE_DEPARTMENT
}

export const departmentManagerReduxState = (
  state: Partial<DepartmentState>
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
