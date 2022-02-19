import { SectorActions, SectorType } from "../../actions/sector/sector.actions"
import { SECTOR_GET_SECTOR, SECTOR_GET_SECTOR_FAILURE, SECTOR_GET_SECTOR_SUCCESS } from "../../constants/sector/sector.constants"

export type MunicipalityState = {
  getSectorsIsLoading: boolean
  sectors: SectorType[]
}

const initialState = {
  getSectorsIsLoading: false,
  sectors: new Array<SectorType>(),
}

const sector = (
  state: MunicipalityState = initialState,
  action: SectorActions
): MunicipalityState => {
  switch (action.type) {
    case SECTOR_GET_SECTOR:
      return {
        ...state,

        getSectorsIsLoading: true,
      }
    case SECTOR_GET_SECTOR_FAILURE:
      return {
        ...state,

        getSectorsIsLoading: false,
      }
    case SECTOR_GET_SECTOR_SUCCESS:
      return {
        ...state,
        sectors: action.Sector,
        getSectorsIsLoading: false,
      }
    default:
      return state
  }
}

export default sector
