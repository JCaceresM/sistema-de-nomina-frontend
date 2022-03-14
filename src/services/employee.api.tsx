import { AxiosResponse } from "axios"
import { EmployeeType } from "../actions/employee/employee.actions"
import {
  WEB_SERVICE_API_EMPLOYEE_ALL,
  WEB_SERVICE_API_EMPLOYEE_CREATE,
} from "../common/constants/external-route.constants"
import {
  PaginationType,
  SelectConditionType,
} from "../common/types/general.type"
import { axiosHelper } from "./http-method.helper"
const { getPaginatedUrl, postRequest, patchRequest } = axiosHelper

const getEmployees = ({
  pagination,
  searchConditions,
}: {
  searchConditions: SelectConditionType
  pagination: PaginationType
}): Promise<AxiosResponse<PaginationType>> => {
  return postRequest(
    getPaginatedUrl(
      WEB_SERVICE_API_EMPLOYEE_ALL,
      pagination.take,
      pagination.skip
    ),
    { searchConditions }
  )
}
const createEmployee = (
  create: Record<string, unknown>
): Promise<AxiosResponse<EmployeeType>> => {
  return postRequest(WEB_SERVICE_API_EMPLOYEE_CREATE, create)
}
const updateEmployee = (
  id: number,
  data: Partial<EmployeeType>
): Promise<AxiosResponse<EmployeeType>> => {
  return patchRequest(`${WEB_SERVICE_API_EMPLOYEE_CREATE}/${id}`, data)
}

export const EmployeeApiRequest = {
  getEmployees,
  createEmployee,
  updateEmployee
}
