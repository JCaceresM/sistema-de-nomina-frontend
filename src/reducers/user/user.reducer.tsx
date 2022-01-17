import { MenuOption } from '../../common/types/general.type'
import {
    USER_AUTHENTICATE,
    USER_AUTHENTICATE_FAILURE,
    USER_AUTHENTICATE_HIDE_ERROR,
    USER_AUTHENTICATE_SUCCESS,
    USER_GET_MENU_OPTIONS,
    USER_GET_MENU_OPTIONS_FAILURE,
    USER_GET_MENU_OPTIONS_SUCCESS,
  } from '../../constants/user/user.constants'
  import { UserAction } from '../../actions/user/user.actions'
  

  
   type UserState = {
    isLoggedIn: boolean
    isSubmitted: boolean
    menuOptions: MenuOption[]
    showAuthenticationError: boolean
  }
  
  const initialState = {
    isLoggedIn: false,
    isSubmitted: false,
    menuOptions: new Array<MenuOption>(),
    showAuthenticationError: false,
  }
  
  const user = (
    state: UserState = initialState,
    action: UserAction
  ): UserState => {
    switch (action.type) {
      case USER_GET_MENU_OPTIONS_SUCCESS: {
        const { menuOptions } = action
  
        return {
          ...state,
          menuOptions,
        }
      }
      case USER_AUTHENTICATE:
        return {
          ...state,
          isSubmitted: true,
        }
      case USER_AUTHENTICATE_SUCCESS:
        return {
          ...state,
          isLoggedIn: false,
          isSubmitted: false,
        }
      case USER_AUTHENTICATE_FAILURE:
        return {
          ...state,
          isLoggedIn: false,
          isSubmitted: false,
          showAuthenticationError: true,
        }
      case USER_AUTHENTICATE_HIDE_ERROR:
        return {
          ...state,
          showAuthenticationError: false,
        }
      case USER_GET_MENU_OPTIONS:
      case USER_GET_MENU_OPTIONS_FAILURE:
      default:
        return state
    }
  }
  
  export default user
  