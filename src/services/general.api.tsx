import { AxiosResponse } from "axios"
import {  WEB_SERVICE_API_PROVINCES_ALL } from "../common/constants/external-route.constants"
import { PaginationType } from "../common/types/general.type"
import { axiosHelper } from "./http-method.helper"
const { getRequest } = axiosHelper

const getProvinces = (): Promise<AxiosResponse<PaginationType>> => {
  return getRequest(
    WEB_SERVICE_API_PROVINCES_ALL, 
  )
}

export const GeneralRequest = {
    getProvinces,
}
