import { Nullable } from "./general.type"

export interface ResponseGenerator{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?:any,
    status?:number,
    statusText?:string
}
export type ResponseMetadata = {
    currentPage: number
    totalPages: number
    count: number
    totalRows: number
    pageSize: number
    links?: PaginationLinks
  }
  export type PaginationLinks = {
    nextPage: Nullable<string>
    previousPage: Nullable<string>
  }  