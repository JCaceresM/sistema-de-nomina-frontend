import { AxiosResponse } from "axios"
import { WEB_SERVICE_API_EMPLOYEE_ALL } from "../common/constants/external-route.constants"
import { PaginationType } from "../common/types/general.type"
import { axiosHelper } from "./http-method.helper"
const { getPaginatedUrl,getRequest } = axiosHelper

const getEmployees = ({
  skip,
  take,
}: PaginationType): Promise<AxiosResponse<PaginationType>> => {
  return getRequest(
    getPaginatedUrl(WEB_SERVICE_API_EMPLOYEE_ALL, take, skip)
  )
}

export const EmployeeApiRequest = {
  getEmployees,
}
