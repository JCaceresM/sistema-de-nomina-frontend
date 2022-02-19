export const STATE_SET_STATE_STATE="STATE_SET_STATE_STATE";
    export const STATE_SET_STATE_STATE_FAILURE="STATE_SET_STATE_STATE_FAILURE";
    export const STATE_SET_STATE_STATE_SUCCESS="STATE_SET_STATE_STATE_SUCCESS";
 
  

  export type SetInitialStateAction = {
    type: typeof STATE_SET_STATE_STATE
  }
  
  export const setInitialState = (): SetInitialStateAction => {
    return {
      type: STATE_SET_STATE_STATE,
    }
  }
  
  type SetInitialStateSuccessAction = {
    type: typeof STATE_SET_STATE_STATE_SUCCESS
  }
  
  export const setInitialStateSuccess = (
 
  ): SetInitialStateSuccessAction => {
    return {
      type: STATE_SET_STATE_STATE_SUCCESS,

    }
  }
  
  type SetInitialStateFailureAction = {
    type: typeof STATE_SET_STATE_STATE_FAILURE
  }
  
  export const setSTATEStateFailure = (): SetInitialStateFailureAction => {
    return {
      type: STATE_SET_STATE_STATE_FAILURE,
    }
  }
  
  export type InitialStateActions =
    | SetInitialStateAction
    | SetInitialStateSuccessAction
    | SetInitialStateFailureAction
  