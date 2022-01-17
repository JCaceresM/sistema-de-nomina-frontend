/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Select } from "antd"
import { FormInstance } from "antd/lib/form"
import React, { ReactElement, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllProvinces } from "../../actions/provinces/provinces.actions"
import {
  CustomCol,
  CustomDivider,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomInputNumber,
  CustomRow,
  CustomSelect,
} from "../../common/components"
import {
  formItemLayout,
  validateMessages,
} from "../../common/utils/forms/validations"
import { RootState } from "../../reducers/root_reducers"

const ContactInfo = ({
  form,
  stepChanger,
}: {
  form: FormInstance
  stepChanger: (step: number) => void
}): ReactElement => {
  const { Option } = Select
  const dispatch = useDispatch()
  const {provinces=[]}= useSelector((state:RootState)=> state.provinces)
useEffect(() => {
 dispatch(getAllProvinces())
},[])
return (
    <CustomForm
      {...formItemLayout}
      form={form}
      name={"contactInfo"}
      validateMessages={validateMessages}
    >
      <CustomRow gutter={[0, 0]}>
        <CustomCol xs={24}>
          <CustomDivider orientation="left">Contacto personal</CustomDivider>
        </CustomCol>
        <CustomCol xs={24} lg={12}>
          <CustomFormItem
            name={"cell"}
            label="Movil"
            normalize={(value: string) => {
              return `${value}`.replace(/(\d{3})(\d{3})(\d{4})/g, "$1-$2-$3")
            }}
            rules={[
              {
                message: "Formato  incorrecto!",
                validator: (_, value) =>
                  /\d{10}/g.test(value.replace(/[-]/g, ""))
                    ? Promise.resolve()
                    : Promise.reject(),
              },
            ]}
          >
            <CustomInputNumber  placeholder={"Escriba un numero Movil"} maxLength={10} />
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={24} lg={12}>
          <CustomFormItem
            normalize={(value: string) => {
              return `${value}`.replace(/(\d{3})(\d{3})(\d{4})/g, "$1-$2-$3")
            }}
            rules={[
              {
                message: "Formato  incorrecto!",
                validator: (_, value) =>
                  /\d{10}/g.test(value.replace(/[-]/g, ""))
                    ? Promise.resolve()
                    : Promise.reject(),
              },
            ]}
            name={"tell"}
            label="Telefono"
          >
            <CustomInputNumber  placeholder={"Escriba un numero telefónico"} maxLength={10} />
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={24} lg={12}>
          <CustomFormItem name={"fax"} label="fax">
            <CustomInput  placeholder={"Escriba un fax"} />
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={24} lg={12}>
          <CustomFormItem
            rules={[
              {
                type: "email",
                message: "E-mail invalido!",
              },
            ]}
            name={"email"}
            label="Correo"
          >
            <CustomInput  placeholder={"Escriba un correo"} />
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={24}>
          <CustomDivider orientation="left">
            Direccion de residencia
          </CustomDivider>
        </CustomCol>
        <CustomCol xs={24} lg={12}>
          <CustomFormItem
            required
            rules={[{ required: true }]}
            name={"province"}
            label="Provincia"
          >
            <CustomSelect  placeholder={"Seleccione un Provincia"}>
              {(provinces||[]).map((province:any,ind)=>
                 (<Option key={`${ind}`} value={province.id}>{province.Name}</Option>))
              }
              
            </CustomSelect>
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={24} lg={12}>
          <CustomFormItem
            required
            rules={[{ required: true }]}
            name={"municipalities"}
            label="Municipio"
          >
            <CustomSelect placeholder={"Seleccione un Municipio"}>
              <Option value={"M"}>A</Option>
              <Option value={"F"}>B</Option>
            </CustomSelect>
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={24} lg={12}>
          <CustomFormItem
            required
            rules={[{ required: true }]}
            name={"sector"}
            label="Sector"
          >
            <CustomSelect placeholder={"Seleccione un Sector"}>
              <Option value={"M"}>A</Option>
              <Option value={"F"}>B</Option>
            </CustomSelect>
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={24} lg={12}>
          <CustomFormItem name={"street"} label="Dirección">
            <CustomInput placeholder={"C/ Duarte numero 6"} />
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={24}>
          <CustomDivider orientation="left">
            Contacto de emergencia
          </CustomDivider>
        </CustomCol>

        <CustomCol xs={24} lg={12}>
          <CustomFormItem name={"full_name_emergency_contact"} label="Nombres">
            <CustomInput  placeholder={"Escriba nombre completo"}/>
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={24} lg={12}>
          <CustomFormItem
            name={"cell_emergency_contact"}
            label="Movil"
            normalize={(value: string) => {
              return `${value}`.replace(/(\d{3})(\d{3})(\d{4})/g, "$1-$2-$3")
            }}
            rules={[
              {
                message: "Formato  incorrecto!",
                validator: (_, value) =>
                  /\d{10}/g.test(value.replace(/[-]/g, ""))
                    ? Promise.resolve()
                    : Promise.reject(),
              },
            ]}
          >
            <CustomInputNumber placeholder={"Escriba un Movil"} maxLength={10} />
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={24} lg={12}>
          <CustomFormItem
            name={"tell_emergency_contact"}
            label="Telefono"
            normalize={(value: string) => {
              return `${value}`.replace(/(\d{3})(\d{3})(\d{4})/g, "$1-$2-$3")
            }}
            rules={[
              {
                message: "Formato  incorrecto!",
                validator: (_, value) =>
                  /\d{10}/g.test(value.replace(/[-]/g, ""))
                    ? Promise.resolve()
                    : Promise.reject(),
              },
            ]}
          >
            <CustomInputNumber placeholder={"Escriba un numero telefónico"} maxLength={10} />
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={24} lg={12}>
          <CustomFormItem
            name={"relation_emergency_contact"}
            label="Parentesco"
          >
            <CustomInput placeholder={"Escriba Parentesco"} />
          </CustomFormItem>
        </CustomCol>
      </CustomRow>
    </CustomForm>
  )
}
export default ContactInfo
