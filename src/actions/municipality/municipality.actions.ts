import {
  MUNICIPALITY_GET_MUNICIPALITY,
  MUNICIPALITY_GET_MUNICIPALITY_FAILURE,
  MUNICIPALITY_GET_MUNICIPALITY_SUCCESS,
} from "../../constants/municipality/municipality.constants"

export type MunicipalityType = { ProvinceId: number; id: 206; Name: string }
export type GetMunicipalityAction = {
  type: typeof MUNICIPALITY_GET_MUNICIPALITY
  ProvinceId: number
}

export const getMunicipality = (ProvinceId: number): GetMunicipalityAction => {
  return {
    type: MUNICIPALITY_GET_MUNICIPALITY,
    ProvinceId,
  }
}

type GetMunicipalitySuccessAction = {
  type: typeof MUNICIPALITY_GET_MUNICIPALITY_SUCCESS
  municipalities: MunicipalityType[]
}

export const getMunicipalitySuccess = (
  municipalities: MunicipalityType[]
): GetMunicipalitySuccessAction => {
  return {
    type: MUNICIPALITY_GET_MUNICIPALITY_SUCCESS,
    municipalities: municipalities,
  }
}

type GetMunicipalityFailureAction = {
  type: typeof MUNICIPALITY_GET_MUNICIPALITY_FAILURE
}

export const getMunicipalityFailure = (): GetMunicipalityFailureAction => {
  return {
    type: MUNICIPALITY_GET_MUNICIPALITY_FAILURE,
  }
}

export type MunicipalityActions =
  | GetMunicipalityAction
  | GetMunicipalitySuccessAction
  | GetMunicipalityFailureAction
