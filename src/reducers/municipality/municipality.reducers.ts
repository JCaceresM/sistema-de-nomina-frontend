import { MunicipalityActions, MunicipalityType } from "../../actions/municipality/municipality.actions"
import { MUNICIPALITY_GET_MUNICIPALITY, MUNICIPALITY_GET_MUNICIPALITY_FAILURE, MUNICIPALITY_GET_MUNICIPALITY_SUCCESS } from "../../constants/municipality/municipality.constants"

export type MunicipalityState = {
  getMunicipalitiesIsLoading: boolean
  municipalities: MunicipalityType[]
}

const initialState = {
  getMunicipalitiesIsLoading: false,
  municipalities: new Array<MunicipalityType>(),
}

const municipality = (
  state: MunicipalityState = initialState,
  action: MunicipalityActions
): MunicipalityState => {
  switch (action.type) {
    case MUNICIPALITY_GET_MUNICIPALITY:
      return {
        ...state,

        getMunicipalitiesIsLoading: true,
      }
    case MUNICIPALITY_GET_MUNICIPALITY_FAILURE:
      return {
        ...state,

        getMunicipalitiesIsLoading: false,
      }
    case MUNICIPALITY_GET_MUNICIPALITY_SUCCESS:
      return {
        ...state,
        municipalities: action.municipalities,
        getMunicipalitiesIsLoading: false,
      }
    default:
      return state
  }
}

export default municipality
