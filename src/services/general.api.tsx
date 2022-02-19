import { AxiosResponse } from "axios"
import {  WEB_SERVICE_API_MUNICIPALITY_ALL, WEB_SERVICE_API_PROVINCES_ALL, WEB_SERVICE_API_SECTOR_PROVINCES_ALL } from "../common/constants/external-route.constants"
import { PaginationType } from "../common/types/general.type"
import { axiosHelper } from "./http-method.helper"
const { getRequest } = axiosHelper

const getProvinces = (): Promise<AxiosResponse<PaginationType>> => {
  return getRequest(
    WEB_SERVICE_API_PROVINCES_ALL, 
  )
}
const getMunicipalities = ({ProvinceId}:{ProvinceId:number}): Promise<AxiosResponse<PaginationType>> => {
  return getRequest(
    WEB_SERVICE_API_MUNICIPALITY_ALL, {ProvinceId}
  )
}
const getSector = ({MunicipalityId}:{MunicipalityId:number}): Promise<AxiosResponse<PaginationType>> => {
  return getRequest(
    WEB_SERVICE_API_SECTOR_PROVINCES_ALL, {MunicipalityId}
  )
}

export const GeneralRequest = {
    getProvinces,getMunicipalities,getSector
}
