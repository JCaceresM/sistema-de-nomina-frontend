import { AxiosResponse } from "axios"
import { DepartmentType } from "../actions/department/department.actions"
import {
  WEB_SERVICE_API_DEPARTMENT_ALL,
  WEB_SERVICE_API_DEPARTMENT_CREATE,
} from "../common/constants/external-route.constants"
import { PaginationType } from "../common/types/general.type"
import { axiosHelper } from "./http-method.helper"
const { getRequest, postRequest } = axiosHelper

const getDepartments = (): Promise<AxiosResponse<PaginationType>> => {
  return getRequest(WEB_SERVICE_API_DEPARTMENT_ALL)
}
const createDepartment = (
  creatData: DepartmentType
): Promise<AxiosResponse<DepartmentType>> => {
  return postRequest(WEB_SERVICE_API_DEPARTMENT_CREATE, creatData)
}

export const DepartmentApiRequest = {
  getDepartments,
  createDepartment,
}
