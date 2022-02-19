/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios"
import { PositionsType } from "../actions/positions/positions.actions"
import { WEB_SERVICE_API_POSITION_ALL, WEB_SERVICE_API_POSITION_CREATE, WEB_SERVICE_API_POSITION_DEPARTMENT } from "../common/constants/external-route.constants"
import { PaginationType } from "../common/types/general.type"
import { axiosHelper } from "./http-method.helper"
const {  getRequest,postRequest } = axiosHelper

const getPosition = (): Promise<AxiosResponse<any>> => {
  return getRequest(WEB_SERVICE_API_POSITION_ALL, )
}
const getPositionsDepartment = (departmentId:number): Promise<AxiosResponse<any>> => {
  return getRequest(WEB_SERVICE_API_POSITION_DEPARTMENT,{department_id:departmentId} )
}
const createPosition = (createData: PositionsType): Promise<AxiosResponse<PaginationType>> => {
  return postRequest(WEB_SERVICE_API_POSITION_CREATE, createData)
}

export const PositionsApiRequest = {
  getPosition,createPosition,getPositionsDepartment
}
