import { ResponseMetadata } from "../../common/types/response.type"
import {
  POSITIONS_CREATE_POSITIONS,
  POSITIONS_CREATE_POSITIONS_FAILURE,
  POSITIONS_CREATE_POSITIONS_SUCCESS,
  POSITIONS_GET_ALL_POSITIONS,
  POSITIONS_GET_ALL_POSITIONS_FAILURE,
  POSITIONS_GET_ALL_POSITIONS_SUCCESS,
  POSITIONS_MANAGER_REDUX_STATE_POSITIONS,
} from "../../constants/positions/positions.constants"
import { PositionState } from "../../reducers/positions/positions.reducers"
// eslint-disable-next-line @typescript-eslint/ban-types
export type PositionsType = {}

export type DepartmentManagerReduxStateAction = {
  state: Partial<PositionState>
  type: typeof POSITIONS_MANAGER_REDUX_STATE_POSITIONS
}

export const positionsManagerReduxState = (
  state:  Partial<PositionState>
): DepartmentManagerReduxStateAction => {
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
export type PositionsActions =
  | GetAllPositionAction
  | GetAllPositionSuccessAction
  | GetAllPositionFailureAction
  | CreatePositionAction
  | CreatePositionSuccessAction
  | CreatePositionFailureAction
