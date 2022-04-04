import { AxiosResponse } from "axios"
import { AccountType } from "../actions/accounts/accounts.actions"
import { WEB_SERVICE_API_ACCOUNTS } from "../common/constants/external-route.constants"

import {
  PaginationType,
  SelectConditionType,
} from "../common/types/general.type"
import { axiosHelper } from "./http-method.helper"
const { getPaginatedUrl, postRequest, patchRequest } = axiosHelper

const getAccounts = ({
  pagination,
  searchConditions,
}: {
  searchConditions: SelectConditionType
  pagination: PaginationType
}): Promise<AxiosResponse<PaginationType>> => {
  return postRequest(
    getPaginatedUrl(
      `${WEB_SERVICE_API_ACCOUNTS}/collection`,
      pagination.take,
      pagination.skip
    ),
    { searchConditions }
  )
}
const createAccount = (
  create: Record<string, unknown>
): Promise<AxiosResponse<AccountType>> => {
  return postRequest( `${WEB_SERVICE_API_ACCOUNTS}`, create)
}
const updateAccount = (
  id: number,
  data: Partial<AccountType>
): Promise<AxiosResponse<AccountType>> => {
  return patchRequest(`${WEB_SERVICE_API_ACCOUNTS}/${id}`, data)
}

export const AccountsApiRequest = {
  getAccounts,
  createAccount,
  updateAccount
}
