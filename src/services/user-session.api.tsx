import { AxiosResponse } from 'axios'
import { WEB_SERVICE_API_LOGIN, WEB_SERVICE_API_PERSONAL_MENU } from '../common/constants/external-route.constants'
import {axiosHelper} from './http-method.helper'
type authenticateUserPayload = {
    username: string
    password: string
  }
  
const authenticateUser = (
    data: authenticateUserPayload
  ): Promise<AxiosResponse<authenticateUserPayload>> => {
    return axiosHelper.unauthorizedPostRequest<authenticateUserPayload>(
      WEB_SERVICE_API_LOGIN,
      data
    )
  }
  
  type FetchUserMenuOptionsPayload = {
    username: string
    businessId: string
  }
  
  const getUserMenuOptions = (
    data: FetchUserMenuOptionsPayload
  ): Promise<AxiosResponse<FetchUserMenuOptionsPayload>> => {
    return axiosHelper.postRequest(WEB_SERVICE_API_PERSONAL_MENU, data)
  }
  
  export const userApiRequest = {
    authenticateUser,
    getUserMenuOptions,
  }