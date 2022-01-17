/* eslint-disable @typescript-eslint/no-unused-vars */
import { ResponseMetadata } from "../../types/response.type"
import { TablePaginationData } from "../../types/table.type"

export const getTablePagination = ({
    currentPage,
    totalRows,
    pageSize,
  }: ResponseMetadata): Partial<TablePaginationData> => {
    return {
      current: currentPage,
      pageSize,
      total: totalRows 
    }
  }