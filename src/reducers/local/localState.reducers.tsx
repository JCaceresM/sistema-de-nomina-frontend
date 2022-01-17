

import { LocalStateActions, LocalStateType } from "../../actions/local/localState.actions"
import { LOCAL_SET_LOCAL_STATE, LOCAL_SET_LOCAL_STATE_FAILURE, LOCAL_SET_LOCAL_STATE_SUCCESS } from "../../constants/local/localState.constans"
  
  type LocalState = {
    state: Record<string,LocalStateType|LocalStateType[]>
    isLoading: boolean,

  }
  
  const initialState = {
    isLoading: false,
    state: {} as    Record<string,LocalStateType|LocalStateType[]>

  }
  
  const dynamicLocalState = (
    state: LocalState = initialState,
    action: LocalStateActions
  ): LocalState => {
    switch (action.type) {
      case LOCAL_SET_LOCAL_STATE:
        return {
          ...state,
  
          isLoading: true,
        }
      case LOCAL_SET_LOCAL_STATE_FAILURE:
        return {
          ...state,
          isLoading: false,
        }
      case LOCAL_SET_LOCAL_STATE_SUCCESS:
          
        return {
          ...state,
          state: action.state,
         
          isLoading: false,
        }
      default:
        return state
    }
  }
  
  export default dynamicLocalState
  