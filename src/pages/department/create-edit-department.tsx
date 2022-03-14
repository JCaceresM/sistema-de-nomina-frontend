/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form, Select, Steps } from "antd"
import React, { ReactElement, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createDepartment, departmentManagerReduxState } from "../../actions/department/department.actions"
import { setLocalState } from "../../actions/local/localState.actions"
import {
  CustomCol,
  CustomContent,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomInputNumber,
  CustomModal,
  CustomRow,
  CustomSelect,
} from "../../common/components"
import { CustomModalConfirmation  } from "../../common/components/ConfirmModalMethod"
import CustomSpin from "../../common/components/CustomSpin"
import { PropsType } from "../../common/types/modal.type"
import {
  formItemLayout,
  validateMessages,
} from "../../common/utils/forms/validations"
import { RootState } from "../../reducers/root_reducers"

const { Option } = Select

const CreatEditEmployee = ({
  visible,
  width,
  hideModal,
}: PropsType): ReactElement => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { createDepartmentsIsLoading,isCreated } = useSelector(
    (state: RootState) => state.departments
  )
  const cancelPayment = () => {
    CustomModalConfirmation({
      content: "¿Seguro que desea cancelar la operación?",
      onOk: () => {
        hideModal()
      },
    })
  }
  const handleSubmit = async () => {
    const data = await form.validateFields().catch((e) => e)    
    if (!Object.getOwnPropertyDescriptor(data, "errorFields")) {
      dispatch(createDepartment({ ...data,  }))
    }
  }
  useEffect(() => {
    if (isCreated) {
      form.resetFields()
      isCreated&&hideModal()
      dispatch(departmentManagerReduxState({isCreated:false }))
    }
  },[isCreated])
  
  return (
    <CustomModal
      title={"Modal"}
      onCancel={cancelPayment}
      visible={visible}
      width={width}
      confirmLoading={createDepartmentsIsLoading}
      closable={!createDepartmentsIsLoading}
      maskClosable={!createDepartmentsIsLoading}
      cancelButtonProps={{ disabled: createDepartmentsIsLoading }}
      okButtonProps={{ disabled: createDepartmentsIsLoading }}
      onOk={handleSubmit}
    >
      <CustomContent>
        <CustomForm
          {...formItemLayout}
          form={form}
          name={"department"}
          validateMessages={validateMessages}
          labelAlign="left"
        >
          <CustomSpin spinning={createDepartmentsIsLoading}>
            <CustomRow>
              <CustomCol xs={12}>
                <CustomFormItem
                  rules={[
                    { required: true,  },
                  ]}
                  name={"name"}
                  label={"Name"}
                  required
                >
                  <CustomInput placeholder={"Escriba el nombre"}/>
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={12}>
                <CustomFormItem
                  rules={[{ required: true, type: "number" }]}
                  name={"budget"}
                  label={"Presupuesto"}
                  required
                >
                  <CustomInputNumber placeholder={"Escriba el presupuesto"} />
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={12}>
                <CustomFormItem name={"status"} label={"Estado"}>
                  <CustomSelect placeholder={"Seleccione el estado"}>
                    <Option value={"A"}>Activo</Option>
                    <Option value={"I"}>Inactivo</Option>
                  </CustomSelect>
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={12}>
              <CustomFormItem  name={"location"} label={"Oficina"}>
                <CustomInput placeholder={"oficina de localización"}></CustomInput>
              </CustomFormItem>
            </CustomCol>

              <CustomCol xs={12} pull={12}>
                <CustomFormItem name={"type"} label={"Tipo"}>
                <CustomSelect placeholder={"Seleccione el tipo"}>
                    <Option value={"P"}>Provisional</Option>
                    <Option value={"F"}>Fijo</Option>
                  </CustomSelect>
                </CustomFormItem>
              </CustomCol>
            </CustomRow>
          </CustomSpin>
        </CustomForm>
      </CustomContent>
    </CustomModal>
  )
}
export default CreatEditEmployee
