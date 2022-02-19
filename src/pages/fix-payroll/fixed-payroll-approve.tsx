/* eslint-disable @typescript-eslint/no-unused-vars */
import { TableRowSelection } from "antd/lib/table/interface"
import React, { ReactElement } from "react"
import { EmployeeType } from "../../actions/employee/employee.actions"
import {
  CustomCol,
  CustomRow,
  CustomTable,
  CustomTitle,
} from "../../common/components"
import CustomLayoutBoxShadow from "../../common/components/CustomLayoutBoxShadow"

const ApproveFixedPayroll = (): ReactElement => {
  const columns = [
    {
      title: "Año",
    },
    {
      title: "Mes",
    },
    {
      title: "Autorización",
    },
    {
      title: "Descripción",
    },

    {
      title: "Total",
    },
    {
      title: "Cant. Emp",
    },
  ]
  // rowSelection objects indicates the need for row selection
  const rowSelection: TableRowSelection<EmployeeType> = {
    onSelect: (record: EmployeeType) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const discounts = []
    },
  }
  return (
    <CustomLayoutBoxShadow>
      <CustomRow>
        <CustomCol xs={24}>
          <CustomTitle level={3}>Consulta</CustomTitle>
        </CustomCol>
        <CustomCol xs={24}>
          <CustomTable rowSelection={rowSelection} columns={columns} />
        </CustomCol>
      </CustomRow>
    </CustomLayoutBoxShadow>
  )
}
export default ApproveFixedPayroll
