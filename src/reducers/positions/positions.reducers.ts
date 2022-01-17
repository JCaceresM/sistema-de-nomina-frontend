

import { PositionsActions, PositionsType } from "../../actions/positions/positions.actions"
import { POSITIONS_CREATE_POSITIONS, POSITIONS_CREATE_POSITIONS_FAILURE, POSITIONS_CREATE_POSITIONS_SUCCESS, POSITIONS_GET_ALL_POSITIONS, POSITIONS_GET_ALL_POSITIONS_FAILURE, POSITIONS_GET_ALL_POSITIONS_SUCCESS } from "../../constants/positions/positions.constants"
  
 export  type PositionState = {
    getPositionsIsLoading: boolean
    createPositionsIsLoading: boolean
    isCreated: boolean
    positions: PositionsType[],
  
  }
  
  const initialState = {
    getPositionsIsLoading: false,
    createPositionsIsLoading: false,
    isCreated: false,
    positions: new Array<PositionsType>(),
  }
  
  const positions = (
    state: PositionState = initialState,
    action: PositionsActions
  ): PositionState => {
    switch (action.type) {
      case POSITIONS_GET_ALL_POSITIONS:
        return {
          ...state,
  
          getPositionsIsLoading: true,
        }
      case POSITIONS_GET_ALL_POSITIONS_FAILURE:
        return {
          ...state,
          getPositionsIsLoading: false,
        }
      case POSITIONS_GET_ALL_POSITIONS_SUCCESS:          
        return {
          ...state,
          positions: action.AllPositions,
          getPositionsIsLoading: false,
        }
      case POSITIONS_CREATE_POSITIONS:
        return {
          ...state,          createPositionsIsLoading: true,

          getPositionsIsLoading: true,
        }
      case POSITIONS_CREATE_POSITIONS_FAILURE:
        return {
          ...state,          createPositionsIsLoading: false,

          getPositionsIsLoading: false,
        }
      case POSITIONS_CREATE_POSITIONS_SUCCESS:          
        return {
          ...state,
          positions:[...state.positions,action.created],
          createPositionsIsLoading: false,
          getPositionsIsLoading: false,isCreated:true,
        }
      default:
        return state
    }
  }
  
  export default positions
  