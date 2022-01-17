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
  
  export type GetMenuOptionsAction = {
    type: typeof USER_GET_MENU_OPTIONS
    userId: string
  }
  
  export const getMenuOptions = (
    userId: string,
  ): GetMenuOptionsAction => {
    return {
      type: USER_GET_MENU_OPTIONS,
      userId,
    }
  }
  
  type GetMenuOptionsSuccessAction = {
    type: typeof USER_GET_MENU_OPTIONS_SUCCESS
    menuOptions: MenuOption[]
  }
  
  export const getMenuOptionsSuccess = (
    menuOptions: MenuOption[]
  ): GetMenuOptionsSuccessAction => {
    return {
      type: USER_GET_MENU_OPTIONS_SUCCESS,
      menuOptions,
    }
  }
  
  type GetMenuOptionsFailureAction = {
    type: typeof USER_GET_MENU_OPTIONS_FAILURE
  }
  
  export const getMenuOptionsFailure = (): GetMenuOptionsFailureAction => {
    return {
      type: USER_GET_MENU_OPTIONS_FAILURE,
    }
  }
  
  export type AuthenticateUserAction = {
    type: typeof USER_AUTHENTICATE
    username: string
    password: string
  }
  
  export const authenticateUser = (
    username: string,
    password: string
  ): AuthenticateUserAction => {
    return {
      type: USER_AUTHENTICATE,
      username,
      password,
    }
  }
  
  type AuthenticateUserSuccessAction = {
    type: typeof USER_AUTHENTICATE_SUCCESS
  }
  
  export const authenticateUserSuccess = (): AuthenticateUserSuccessAction => {
    return {
      type: USER_AUTHENTICATE_SUCCESS,
    }
  }
  
  type AuthenticateUserFailureAction = {
    type: typeof USER_AUTHENTICATE_FAILURE
  }
  
  export const authenticateUserFailure = (): AuthenticateUserFailureAction => {
    return {
      type: USER_AUTHENTICATE_FAILURE,
    }
  }
  
  type AuthenticateUserHideErrorAction = {
    type: typeof USER_AUTHENTICATE_HIDE_ERROR
  }
  
  export const authenticateUserHideError = (): AuthenticateUserHideErrorAction => {
    return {
      type: USER_AUTHENTICATE_HIDE_ERROR,
    }
  }
  
  export type UserAction =
    | GetMenuOptionsAction
    | GetMenuOptionsSuccessAction
    | GetMenuOptionsFailureAction
    | AuthenticateUserHideErrorAction
    | AuthenticateUserAction
    | AuthenticateUserSuccessAction
    | AuthenticateUserFailureAction
  