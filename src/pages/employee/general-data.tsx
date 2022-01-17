/* eslint-disable @typescript-eslint/no-unused-vars */
import { Select } from "antd"
import { FormInstance } from "antd/lib/form"
import moment from "moment"
import React, { ReactElement } from "react"
import {
  CustomCol,
  CustomDatePicker,
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
    sm: { span: 8 },
    md: { span: 8 },
    lg: { span: 10 },
    xl: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    md: { span: 16 },
    lg: { span: 14 },
    xl: { span: 16 },
  },
}
const GeneralData = ({ form ,stepChanger}: { form: FormInstance, stepChanger: (step:number) => void}): ReactElement => {
  const { Option } = Select
  // const [state, setState] = React.useState(0)
  return (
    <CustomForm
      {...formItemLayout}
      form={form}
      name={"employee"}
      validateMessages={validateMessages}
    >
      <CustomRow gutter={[0, 0]}>
        <CustomCol xs={24} lg={12}>
          <CustomFormItem required rules={[{required: true}]} name={"first_name"} label="Nombres">
            <CustomInput placeholder="Escriba sus nombres" />
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={24} lg={12}>
          <CustomFormItem required rules={[{required: true}]} name={"last_name"} label="Apellidos">
            <CustomInput placeholder="Escriba sus apellidos" />
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={24} lg={12}>
          <CustomFormItem required rules={[{required: true}]} name={"document_id"} label="Doc. Identidad">
            <CustomInput placeholder="Escriba su documento de identidad" />
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={24} lg={12}>
          <CustomFormItem  required rules={[{required: true}]} name={"gender"} label="Género">
            <CustomSelect
              placeholder={"Seleccione su genero"}
            >
              <Option value={"M"}>Masculino</Option>
              <Option value={"F"}>Femenino</Option>
            </CustomSelect>
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={24} lg={12}>
          <CustomFormItem  required rules={[{required: true}]} name={"born_date"} label="Fecha de naci.">
            <CustomDatePicker
              onChange={(e) => {
                const a = moment().subtract(18, 'years').calendar()
                const b = moment().days()
                // eslint-disable-next-line no-console
                console.log(a,new Date(777));
                
                const days = moment().diff(e, "d")
                const diff = moment.duration(days,'days')
                form.setFieldsValue({
                  age: `Año(s) ${Number(diff.years())}, Meses ${Number(
                    diff.months()
                  )} , Dias ${diff.days()}`,
                  ageStored: days
                })
              }}
              style={{ width: "100%" }}
              disabledDate={(date: moment.Moment) => {
                
                return date && date > moment().subtract(18, 'years').endOf('day')
              }}
            />
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={24} lg={12}>
          <CustomFormItem  required rules={[{required: true}]} name={"age"} label="Edad">
            <CustomInput readOnly placeholder="Aqui aparece la edad" />
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={24} lg={12}>
          <CustomFormItem required rules={[{required: true}]}  name={"marital_status"} label="Estado civil">
            <CustomSelect
              placeholder={"Seleccione su estado civil"}
            >
              <Option value={"S"}>Soltero</Option>
              <Option value={"C"}>Casado</Option>
            </CustomSelect>
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={24} lg={12}>
          <CustomFormItem required rules={[{required: true}]}  name={"nss"} label="NSS">
            <CustomInput placeholder="Escriba su NSS"            
 />
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={24} lg={12} >
          <CustomFormItem  required rules={[{required: true}]} name={"blond_type"} label="Tipo de sangre">
            <CustomSelect
              placeholder={"Seleccione su tipo de sangre"}
            >
              <Option value={"A+"}>A Positivo</Option>
              <Option value={"A-"}>A Negativo</Option>
              <Option value={"B+"}>B Positivo</Option>
              <Option value={"B-"}>B Negativo</Option>
              <Option value={"AB+"}>AB Positivo</Option>
              <Option value={"AB-"}>AB Negativo</Option>
              <Option value={"O+"}>O Positivo</Option>
              <Option value={"O-"}>O Negativo</Option>
             
            </CustomSelect>
          </CustomFormItem>
        </CustomCol><CustomCol xs={0} lg={12}/>
      </CustomRow>
    </CustomForm>
  )
}
export default GeneralData
