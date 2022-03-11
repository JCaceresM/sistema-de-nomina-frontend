import { Select } from "antd"
import { FormInstance } from "antd/lib/form"
import React, { ReactElement, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  DepartmentType,
  getAllDepartment,
} from "../../actions/department/department.actions"
import {
  getAllPayroll,
  PayrollType,
} from "../../actions/payroll/payroll.actions"
import {
  getPositionDepartment,
  PositionsType,
} from "../../actions/positions/positions.actions"
import {
  CustomCol,
  CustomDatePicker,
  CustomDivider,
  CustomForm,
  CustomFormItem,
  CustomInputNumber,
  CustomRow,
  CustomSelect,
} from "../../common/components"
import { validateMessages } from "../../common/utils/forms/validations"
import { RootState } from "../../reducers/root_reducers"
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 24 },
    xl: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 24 },
    xl: { span: 16 },
  },
}
const JobInfo = ({
  form,
}: {
  form: FormInstance
  stepChanger: (step: number) => void
}): ReactElement => {
  const { Option } = Select
  const {
    departments: departmentsState,
    positions: positionsState,
    payroll: payrollState,
  } = useSelector((state: RootState) => state)
  const { departments } = departmentsState
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(1)
  const { positionsDepartment = [] } = positionsState
  const { payroll = [] } = payrollState
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllDepartment())
  }, [])
  return (
    <CustomForm
      {...formItemLayout}
      form={form}
      name={"contactInfo"}
      validateMessages={validateMessages}
      labelAlign="left"
    >
      <CustomRow gutter={[0, 0]}>
        <CustomCol xs={24}>
          <CustomDivider orientation="left">Contacto personal</CustomDivider>
        </CustomCol>

        <CustomCol xs={12}>
          <CustomFormItem name={"department_id"} label="Departamento">
            <CustomSelect
              allowClear
              onChange={(value) => {
                form.resetFields(["position_id", "payroll_id"])
                const condition = [
                  {
                    field: "",
                    operator: "=",
                    condition: `${value}`,
                  },
                ]
          
                
                dispatch(getAllPayroll(condition))
                dispatch(getPositionDepartment(parseInt(`${value}`)))
              }}
              placeholder={"Seleccione un departamento"}
            >
              {(departments || []).map((province: DepartmentType, ind) => (
                <Option key={`${ind}`} value={province.id} data={province}>
                  {province.name}
                </Option>
              ))}
            </CustomSelect>
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={12}>
          <CustomFormItem name={"working_time"} label="Modo de trabajo">
            <CustomSelect placeholder={"Seleccione una jornada de trabajo"}>
              <Option value={"FT"}>Tiempo Completo</Option>
              <Option value={"MT"}>Medio tiempo</Option>
            </CustomSelect>
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={12}>
          <CustomFormItem name={"position_id"} label="Posicion">
            <CustomSelect
              placeholder={"Seleccione una posicion"}
              onChange={(_, e) => {
                setMin(
                  (e as Record<string, PositionsType>)?.data.min_salary || 0
                )
                setMax(
                  (e as Record<string, PositionsType>)?.data.max_salary || 0
                )
              }}
            >
              {(positionsDepartment || []).map((item: PositionsType, ind) => (
                <Option key={`${ind}`} value={item.id} data={item}>
                  {item.name}
                </Option>
              ))}
            </CustomSelect>
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={12}>
          <CustomFormItem name={"payroll_id"} label="Nomina">
            <CustomSelect placeholder={"Seleccione una nomina"}>
              {payroll.map((item: PayrollType, ind: number) => (
                <Option key={`${ind}`} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </CustomSelect>
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={12}>
          <CustomFormItem
            initialValue={0}
            required
            rules={[{ required: true }]}
            name={"salary"}
            label="Sueldo"
          >
            <CustomInputNumber
              min={min}
              max={max}
              placeholder={"Escriba sueldo"}
              style={{ width: "100%" }}
            />
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={12}>
          <CustomFormItem name={"hire_date"} label="Fecha contratacion">
            <CustomDatePicker style={{ width: "100%" }} format={"DD-MM-YYYY"} />
          </CustomFormItem>
        </CustomCol>
      </CustomRow>
    </CustomForm>
  )
}
export default JobInfo
