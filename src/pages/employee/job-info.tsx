/* eslint-disable @typescript-eslint/no-unused-vars */
import { Select } from "antd"
import { FormInstance } from "antd/lib/form"
import React, { ReactElement } from "react"
import {
  CustomCol,
  CustomDatePicker,
  CustomDivider,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomRow,
  CustomSelect,
} from "../../common/components"
import {
  validateMessages,
} from "../../common/utils/forms/validations"
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
  stepChanger,
}: {
  form: FormInstance
  stepChanger: (step: number) => void
}): ReactElement => {
  const { Option } = Select
  // const [state, setState] = React.useState(0)
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
          <CustomDivider orientation="left">
            Contacto personal
          </CustomDivider>
        </CustomCol>
        
        <CustomCol xs={12}>
          <CustomFormItem name={"department_id"} label="Departamento">
          <CustomSelect
              placeholder={"Seleccione un departamento"}
            >
              <Option value={"M"}>A</Option>
              <Option value={"F"}>B</Option></CustomSelect>
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={12}>
          <CustomFormItem name={"working_time"} label="Modo de trabajo">
          <CustomSelect
              placeholder={"Seleccione una jornada de trabajo"}
            >
              <Option value={"M"}>A</Option>
              <Option value={"F"}>B</Option></CustomSelect>
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={12}>
          <CustomFormItem name={"position_id"} label="Posicion">
          <CustomSelect
              placeholder={"Seleccione una posicion"}
            >
              <Option value={"M"}>A</Option>
              <Option value={"F"}>B</Option></CustomSelect>
          </CustomFormItem>
        </CustomCol>
       
        <CustomCol xs={12}>
          <CustomFormItem name={"hire_date"} label="Fecha contratacion">
            <CustomDatePicker style={{width:'100%'}} format={'DD-MM-YYYY'} />
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={12} pull={12}>
          <CustomFormItem name={"status"} label="Estado de empleado">
          <CustomSelect
              placeholder={"Seleccione el estado"}
            >
              <Option value={"M"}>A</Option>
              <Option value={"F"}>B</Option></CustomSelect>
          </CustomFormItem>
        </CustomCol>
       
      </CustomRow>
    </CustomForm>
  )
}
export default JobInfo
