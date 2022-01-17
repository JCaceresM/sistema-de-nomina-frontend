import {
  PROVINCES_GET_ALL_PROVINCES,
  PROVINCES_GET_ALL_PROVINCES_FAILURE,
  PROVINCES_GET_ALL_PROVINCES_SUCCESS,
} from "../../constants/provinces/provinces.constants"
// eslint-disable-next-line @typescript-eslint/ban-types
export type ProvincesType = {}
export type GetAllProvincesAction = {
  type: typeof PROVINCES_GET_ALL_PROVINCES
}

export const getAllProvinces = (
): GetAllProvincesAction => {
  return {
    type: PROVINCES_GET_ALL_PROVINCES,
  }
}

type GetAllProvincesSuccessAction = {
  type: typeof PROVINCES_GET_ALL_PROVINCES_SUCCESS
  AllProvinces: ProvincesType[]
 
}

export const getAllProvincesSuccess = (
  AllProvinces: ProvincesType[],
 
): GetAllProvincesSuccessAction => {
  return {
    type: PROVINCES_GET_ALL_PROVINCES_SUCCESS,
    AllProvinces,
  }
}

type GetAllProvincesFailureAction = {
  type: typeof PROVINCES_GET_ALL_PROVINCES_FAILURE
}

export const getAllProvincesFailure = (): GetAllProvincesFailureAction => {
  return {
    type: PROVINCES_GET_ALL_PROVINCES_FAILURE,
  }
}

export type ProvincesAction =
  | GetAllProvincesAction
  | GetAllProvincesSuccessAction
  | GetAllProvincesFailureAction
