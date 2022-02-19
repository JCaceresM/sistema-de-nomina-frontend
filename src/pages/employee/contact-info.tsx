
import { Select } from "antd"
import { FormInstance } from "antd/lib/form"
import React, { ReactElement, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMunicipality } from "../../actions/municipality/municipality.actions"
import { getAllProvinces, ProvincesType } from "../../actions/provinces/provinces.actions"
import { getSector, SectorType } from "../../actions/sector/sector.actions"
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
}: {
  form: FormInstance
  stepChanger: (step: number) => void
}): ReactElement => {
  const { Option } = Select
  const dispatch = useDispatch()
  const {
    provinces: provinceState,
    municipality,
    sector,
  } = useSelector((state: RootState) => state)
  const { provinces = [] } = provinceState
  const { municipalities = [] } = municipality
  const { sectors = [] } = sector
  useEffect(() => {
    dispatch(getAllProvinces())
  }, [])
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
            <CustomInputNumber
              placeholder={"Escriba un numero Movil"}
              maxLength={10}
            />
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
            label="Teléfono"
          >
            <CustomInputNumber
              placeholder={"Escriba un numero telefónico"}
              maxLength={10}
            />
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={24} lg={12}>
          <CustomFormItem name={"fax"} label="fax">
            <CustomInput placeholder={"Escriba un fax"} />
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
            <CustomInput placeholder={"Escriba un correo"} />
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={24}>
          <CustomDivider orientation="left">
            Dirección de residencia
          </CustomDivider>
        </CustomCol>
        <CustomCol xs={24} lg={12}>
          <CustomFormItem
            required
            rules={[{ required: true }]}
            name={"province"}
            label="Provincia"
          >
            <CustomSelect
              onChange={(value) => {
                form.resetFields(["municipality", "sector"])

                dispatch(getMunicipality(parseInt(`${value}`)))
              }}
              placeholder={"Seleccione un Provincia"}
            >
              {(provinces || []).map((province: ProvincesType, ind) => (
                <Option key={`${ind}`} value={province.id}>
                  {province.Name}
                </Option>
              ))}
            </CustomSelect>
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={24} lg={12}>
          <CustomFormItem
            required
            rules={[{ required: true }]}
            name={"municipality"}
            label="Municipio"
          >
            <CustomSelect
              onChange={(value) => {
                form.resetFields(["sector"])

                dispatch(getSector(parseInt(`${value}`)))
              }}
              placeholder={"Seleccione un Municipio"}
            >
              {municipalities.map((municipality: ProvincesType, ind) => (
                <Option key={`${ind}`} value={municipality.id}>
                  {municipality.Name}
                </Option>
              ))}
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
              {sectors.map((sector: SectorType, ind) => (
                <Option key={`${ind}`} value={sector.id}>
                  {sector.Name}
                </Option>
              ))}
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
            <CustomInput placeholder={"Escriba nombre completo"} />
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
            <CustomInputNumber
              placeholder={"Escriba un Movil"}
              maxLength={10}
            />
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={24} lg={12}>
          <CustomFormItem
            name={"tell_emergency_contact"}
            label="Teléfono"
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
            <CustomInputNumber
              placeholder={"Escriba un numero telefónico"}
              maxLength={10}
            />
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
