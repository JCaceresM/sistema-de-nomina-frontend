/* eslint-disable @typescript-eslint/no-unused-vars */
import { DeleteTwoTone, EditTwoTone, EyeTwoTone } from "@ant-design/icons"
import {TableRowSelection} from "antd/lib/table/interface"
import React, {ReactElement, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {EmployeeType} from "../../actions/employee/employee.actions"
import {getPayrollRecordCollection} from "../../actions/payroll record/payroll-record.actions"
import {
  CustomButton,
  CustomCol,
  CustomRow,
  CustomTable,
  CustomTitle,
  CustomTooltip,
} from "../../common/components"
import CustomLayoutBoxShadow from "../../common/components/CustomLayoutBoxShadow"
import CustomPopConfirm from "../../common/components/CustomPopConfirm"
import {addPropertyKey} from "../../common/utils"
import {getDateAsSpanishShortDate} from "../../common/utils/date/date.helpers"
import {currencyLocale} from "../../common/utils/locale/locale.format.utils"
import {RootState} from "../../reducers/root_reducers"

const ApproveFixedPayroll = (): ReactElement => {
  const dispatch = useDispatch()
  const {payrollRecord} = useSelector((state: RootState) => state.payrollRecord)
  const columns = [
    {
      title: "Año",
      render: (record: {registered_at: string | Date | undefined}) => {
        const date = getDateAsSpanishShortDate(record.registered_at, "es-ES", {
          month: undefined,
          day: undefined,
          year: "numeric",
        })
        return date.date
      },
    },
    {
      title: "Mes",
      render: (record: {registered_at: string | Date | undefined}) => {
        const date = getDateAsSpanishShortDate(record.registered_at, "es-ES", {
          month: "long",
          day: undefined,
          year: undefined,
        })
        return date.date
      },
    },
    {
      title: "Nombre",
      dataIndex: "name",
    },
    {
      title: "Descripción",
      dataIndex: "description",
    },

    {
      title: "Total",
      render: (record: Record<string, any>) => {
        return currencyLocale(
          record.payroll_record.reduce(
            (prev: number, next: Record<string, number>) => prev + next.salary,
            0
          )
        )
      },
    },
    {
      title: "Cant. Emp",
      render: (record: Record<string, any>) => {
        return record.payroll_record.length
      },
    },
    {
      title: "Revisar",
      render: () => {
        return (
          <CustomRow justify={"center"}>
           
            <CustomCol xs={24}>
            
                <CustomTooltip placement={"bottom"} title={"Revisar"}>
                  <CustomButton
                    type={"link"}
                    icon={<EyeTwoTone  />}
                  /></CustomTooltip>
            </CustomCol>
          </CustomRow>
        )
      },
    },
  ]

  useEffect(() => {
    dispatch(getPayrollRecordCollection())
  }, [])
  return (
    <CustomLayoutBoxShadow>
      <CustomRow>
        <CustomCol xs={24}>
          <CustomTitle level={3}>Consulta</CustomTitle>
        </CustomCol>
        <CustomCol xs={24}>
          <CustomTable
            dataSource={addPropertyKey(payrollRecord)}
            columns={columns}
          />
        </CustomCol>
      </CustomRow>
    </CustomLayoutBoxShadow>
  )
}
export default ApproveFixedPayroll
