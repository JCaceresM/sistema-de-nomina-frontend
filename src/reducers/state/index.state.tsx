import { InitialStateActions, STATE_SET_STATE_STATE } from "../../actions/state/index.state"

const InitialState = (
  state:Record<string, unknown>= {} ,
  action: InitialStateActions
): Record<string, unknown> => {
  switch (action.type) {
    case STATE_SET_STATE_STATE:
      return {
        ...state,
      }
    default:
      return state
  }
}

export default InitialState
