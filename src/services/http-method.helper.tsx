import axios, { AxiosResponse } from "axios"
import { getSessionToken } from "../common/utils/session/session"

type RequestHeaders = {
  headers: {
    "Content-Type": string
    Authorization: string
  }
}

const getResponseParams = (): RequestHeaders => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: getSessionToken(),
    },
  }
}

function postRequest<T>(
  url: string,
  data: Record<string, unknown>
): Promise<AxiosResponse<T>> {
  const config = getResponseParams()
  const result = axios.post(url, data, config)

  return result
}

function putRequest<T>(
  url: string,
  data: Record<string, unknown>
): Promise<AxiosResponse<T>> {
  const config = getResponseParams()
  const result = axios.put(url, data, config)

  return result
}

function unauthorizedPostRequest<T>(
  url: string,
  data: T
): Promise<AxiosResponse<T>> {
  const config = getResponseParams()

  return axios.post(url, data, config)
}

function getRequest<T>(
  url: string,
  params: Record<string, unknown>={}
): Promise<AxiosResponse<T>> {
  const config = getResponseParams()

  return axios.get(url, { ...config, params })
}
const getPaginatedUrl = (url: string, take = 1, skip = 1): string => {
  return `${url}?take=${take}&skip=${skip}`
}

export const axiosHelper = {
  getResponseParams,
  postRequest,
  putRequest,
  unauthorizedPostRequest,
  getRequest,
  getPaginatedUrl,
}
