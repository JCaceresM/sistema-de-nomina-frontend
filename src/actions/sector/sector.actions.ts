import {
  SECTOR_GET_SECTOR,
  SECTOR_GET_SECTOR_FAILURE,
  SECTOR_GET_SECTOR_SUCCESS,
} from "../../constants/sector/sector.constants"

export type SectorType = { MunicipalityId: number; id: number; Name: string }
export type GetSectorAction = {
  type: typeof SECTOR_GET_SECTOR
  MunicipalityId: number
}

export const getSector = (MunicipalityId: number): GetSectorAction => {
  return {
    type: SECTOR_GET_SECTOR,
    MunicipalityId: MunicipalityId,
  }
}

type GetSectorSuccessAction = {
  type: typeof SECTOR_GET_SECTOR_SUCCESS
  Sector: SectorType[]
}

export const getSectorSuccess = (
  Sector: SectorType[]
): GetSectorSuccessAction => {
  return {
    type: SECTOR_GET_SECTOR_SUCCESS,
    Sector,
  }
}

type GetSectorFailureAction = {
  type: typeof SECTOR_GET_SECTOR_FAILURE
}

export const getSectorFailure = (): GetSectorFailureAction => {
  return {
    type: SECTOR_GET_SECTOR_FAILURE,
  }
}

export type SectorActions =
  | GetSectorAction
  | GetSectorSuccessAction
  | GetSectorFailureAction
