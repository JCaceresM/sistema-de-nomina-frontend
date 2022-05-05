import { AxiosResponse } from "axios"
import { DepartmentType } from "../actions/department/department.actions"
import {
  WEB_SERVICE_API_DEPARTMENT,
  WEB_SERVICE_API_DEPARTMENT_ALL,
} from "../common/constants/external-route.constants"
import { PaginationType, SelectConditionType } from "../common/types/general.type"
import { axiosHelper } from "./http-method.helper"
const { getRequest, postRequest,getPaginatedUrl } = axiosHelper

const getDepartments = (): Promise<AxiosResponse<PaginationType>> => {
  return getRequest(WEB_SERVICE_API_DEPARTMENT_ALL)
}
const createDepartment = (
  creatData: DepartmentType
): Promise<AxiosResponse<DepartmentType>> => {
  return postRequest(WEB_SERVICE_API_DEPARTMENT, creatData)
}
const getDepartmentEmployees = (
  pagination: PaginationType,
  searchConditions?: SelectConditionType[],
): Promise<AxiosResponse<DepartmentType>> => {
  return    postRequest(
    getPaginatedUrl(
      `${WEB_SERVICE_API_DEPARTMENT}/employees`,
      pagination.take,
      pagination.skip
    ),
    { searchConditions }
  )
}
const getDepartmentsNotInPayroll = (
  pagination={
    take: 15,
    skip:0
  },
  searchConditions?: SelectConditionType[],
): Promise<AxiosResponse<DepartmentType>> => {
  return    postRequest(
    getPaginatedUrl(
      `${WEB_SERVICE_API_DEPARTMENT}/not-in-payroll`,
      pagination.take,
      pagination.skip
    ),
    { searchConditions }
  )
}
const getDepartmentsInPayroll = (
  pagination={
    take: 15,
    skip:0
  },
  searchConditions?: SelectConditionType[],
): Promise<AxiosResponse<DepartmentType>> => {
  return    postRequest(
    getPaginatedUrl(
      `${WEB_SERVICE_API_DEPARTMENT}/in-payroll`,
      pagination.take,
      pagination.skip
    ),
    { searchConditions }
  )
}
const deleteDepartmentPayroll = (
  payrollId: number,departmentId: number
): Promise<AxiosResponse<DepartmentType>> => {
  return    postRequest(
 
      `${WEB_SERVICE_API_DEPARTMENT}/delete/payroll-department`,
   
    { payrollId,departmentId }
  )
}
export const DepartmentApiRequest = {
  getDepartments,
  createDepartment,getDepartmentEmployees,getDepartmentsNotInPayroll,getDepartmentsInPayroll,deleteDepartmentPayroll
}
