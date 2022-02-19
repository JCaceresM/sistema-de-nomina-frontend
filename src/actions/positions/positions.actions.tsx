import { ResponseMetadata } from "../../common/types/response.type"
import {
  POSITIONS_CREATE_POSITIONS,
  POSITIONS_CREATE_POSITIONS_FAILURE,
  POSITIONS_CREATE_POSITIONS_SUCCESS,
  POSITIONS_GET_ALL_POSITIONS,
  POSITIONS_GET_ALL_POSITIONS_FAILURE,
  POSITIONS_GET_ALL_POSITIONS_SUCCESS,
  POSITIONS_GET_POSITIONS_DEPARTMENT,
  POSITIONS_GET_POSITIONS_DEPARTMENT_FAILURE,
  POSITIONS_GET_POSITIONS_DEPARTMENT_SUCCESS,
  POSITIONS_MANAGER_REDUX_STATE_POSITIONS,
} from "../../constants/positions/positions.constants"
import { PositionState } from "../../reducers/positions/positions.reducers"
export type PositionsType = {
  name: string
  min_salary: number
  max_salary: number
  department_id: number
  status: string
  description: string
  company_id: number
  updated_at: Date
  user_update: string
  user_insert: string
  id: number
  created_at: Date
}

export type PositionsManagerReduxStateAction = {
  state: Partial<PositionState>
  type: typeof POSITIONS_MANAGER_REDUX_STATE_POSITIONS
}

export const positionsManagerReduxState = (
  state: Partial<PositionState>
): PositionsManagerReduxStateAction => {
  return {
    type: POSITIONS_MANAGER_REDUX_STATE_POSITIONS,
    state,
  }
}

export type GetAllPositionAction = {
  type: typeof POSITIONS_GET_ALL_POSITIONS
}

export const getAllPosition = (): GetAllPositionAction => {
  return {
    type: POSITIONS_GET_ALL_POSITIONS,
  }
}

type GetAllPositionSuccessAction = {
  type: typeof POSITIONS_GET_ALL_POSITIONS_SUCCESS
  AllPositions: PositionsType[]
  metadata: ResponseMetadata
}

export const getAllPositionSuccess = (
  AllPositions: PositionsType[],
  metadata: ResponseMetadata
): GetAllPositionSuccessAction => {
  return {
    type: POSITIONS_GET_ALL_POSITIONS_SUCCESS,
    AllPositions,
    metadata,
  }
}

type GetAllPositionFailureAction = {
  type: typeof POSITIONS_GET_ALL_POSITIONS_FAILURE
}

export const getAllPositionFailure = (): GetAllPositionFailureAction => {
  return {
    type: POSITIONS_GET_ALL_POSITIONS_FAILURE,
  }
}
// --------------------------create----------------------------

export type CreatePositionAction = {
  type: typeof POSITIONS_CREATE_POSITIONS
  createData: PositionsType
}

export const createPosition = (
  createData: PositionsType
): CreatePositionAction => {
  return {
    type: POSITIONS_CREATE_POSITIONS,
    createData,
  }
}

type CreatePositionSuccessAction = {
  type: typeof POSITIONS_CREATE_POSITIONS_SUCCESS
  created: PositionsType
}

export const createPositionSuccess = (
  created: PositionsType
): CreatePositionSuccessAction => {
  return {
    type: POSITIONS_CREATE_POSITIONS_SUCCESS,
    created,
  }
}

type CreatePositionFailureAction = {
  type: typeof POSITIONS_CREATE_POSITIONS_FAILURE
}

export const createPositionFailure = (): CreatePositionFailureAction => {
  return {
    type: POSITIONS_CREATE_POSITIONS_FAILURE,
  }
}
// ------------------------get-position-department_id------------------------

export type GetPositionDepartmentAction = {
  type: typeof POSITIONS_GET_POSITIONS_DEPARTMENT
  departmentId: number
}

export const getPositionDepartment = (
  departmentId: number
): GetPositionDepartmentAction => {
  return {
    type: POSITIONS_GET_POSITIONS_DEPARTMENT,
    departmentId,
  }
}

type GetPositionDepartmentSuccessAction = {
  type: typeof POSITIONS_GET_POSITIONS_DEPARTMENT_SUCCESS
  positionsDepartment: PositionsType[]
}

export const getPositionDepartmentSuccess = (
  positionsDepartment: PositionsType[]
): GetPositionDepartmentSuccessAction => {
  return {
    type: POSITIONS_GET_POSITIONS_DEPARTMENT_SUCCESS,
    positionsDepartment,
  }
}

type GetPositionDepartmentFailureAction = {
  type: typeof POSITIONS_GET_POSITIONS_DEPARTMENT_FAILURE
}

export const getPositionDepartmentFailure =
  (): GetPositionDepartmentFailureAction => {
    return {
      type: POSITIONS_GET_POSITIONS_DEPARTMENT_FAILURE,
    }
  }
export type PositionsActions =
  | GetAllPositionAction
  | GetAllPositionSuccessAction
  | GetAllPositionFailureAction
  | CreatePositionAction
  | CreatePositionSuccessAction
  | CreatePositionFailureAction
  | GetPositionDepartmentFailureAction
  | GetPositionDepartmentSuccessAction
  | GetPositionDepartmentAction
