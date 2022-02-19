import { AxiosResponse } from "axios"
import {
  WEB_SERVICE_API_EMPLOYEE_ALL,
  WEB_SERVICE_API_EMPLOYEE_CREATE,
} from "../common/constants/external-route.constants"
import {
  PaginationType,
  SelectConditionType,
} from "../common/types/general.type"
import { axiosHelper } from "./http-method.helper"
const { getPaginatedUrl, postRequest } = axiosHelper

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
): Promise<AxiosResponse<any>> => {
  return postRequest(WEB_SERVICE_API_EMPLOYEE_CREATE, create)
}

export const EmployeeApiRequest = {
  getEmployees,
  createEmployee,
}
