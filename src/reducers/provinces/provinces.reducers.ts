import {
  ProvincesAction,
  ProvincesType,
} from "../../actions/provinces/provinces.actions"
import {
  PROVINCES_GET_ALL_PROVINCES,
  PROVINCES_GET_ALL_PROVINCES_FAILURE,
  PROVINCES_GET_ALL_PROVINCES_SUCCESS,
} from "../../constants/provinces/provinces.constants"

export type PositionState = {
  getProvincesIsLoading: boolean
  provinces: ProvincesType[]
}

const initialState = {
  getProvincesIsLoading: false,
  provinces: new Array<ProvincesType>(),
}

const provinces = (
  state: PositionState = initialState,
  action: ProvincesAction
): PositionState => {
  switch (action.type) {
    case PROVINCES_GET_ALL_PROVINCES:
      return {
        ...state,

        getProvincesIsLoading: true,
      }
    case PROVINCES_GET_ALL_PROVINCES_FAILURE:
      return {
        ...state,

        getProvincesIsLoading: false,
      }
    case PROVINCES_GET_ALL_PROVINCES_SUCCESS:
      return {
        ...state,
        provinces: action.AllProvinces,
        getProvincesIsLoading: false,
      }
    default:
      return state
  }
}

export default provinces
