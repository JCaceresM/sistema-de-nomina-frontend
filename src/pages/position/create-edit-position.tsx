/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form, Input, Select, Steps } from "antd"
import React, { ReactElement, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  createDepartment,
  departmentManagerReduxState,
} from "../../actions/department/department.actions"
import { setLocalState } from "../../actions/local/localState.actions"
import {
  createPosition,
  positionsManagerReduxState,
} from "../../actions/positions/positions.actions"
import {
  CustomCol,
  CustomContent,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomInputGroup,
  CustomInputNumber,
  CustomModal,
  CustomRow,
  CustomSelect,
  CustomTextArea,
} from "../../common/components"
import { CustomModalConfirmation } from "../../common/components/ConfirmModalMethod"
import CustomSpin from "../../common/components/CustomSpin"
import { PropsType } from "../../common/types/modal.type"
import { getSessionInfo } from "../../common/utils"
import { validateMessages } from "../../common/utils/forms/validations"
import { RootState } from "../../reducers/root_reducers"

const { Option } = Select
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 9 },
    md: { span: 5 },
    lg: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 15 },
    md: { span: 19 },
    lg: { span: 20 },
  },
}
const CreatEditPosition = ({
  visible,
  width,
  hideModal,
}: PropsType): ReactElement => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [minSalary, setMinSalary] = useState(0)
  const { positions, departments:departmentState} = useSelector(
    (state: RootState) => state
  )
  const { createPositionsIsLoading, isCreated } = positions
  const { getDepartmentsIsLoading, departments } = departmentState
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
      dispatch(createPosition({ ...data ,company_id:getSessionInfo().businessId,}))
    }
  }
  useEffect(() => {
    if (isCreated) {
      form.resetFields()
      isCreated && hideModal()
      dispatch(positionsManagerReduxState({ isCreated: false }))
    }
  }, [isCreated])
  return (
    <CustomModal
      title={"Modal"}
      onCancel={cancelPayment}
      visible={visible}
      width={width}
      confirmLoading={createPositionsIsLoading}
      closable={!createPositionsIsLoading}
      maskClosable={!createPositionsIsLoading}
      cancelButtonProps={{ disabled: createPositionsIsLoading }}
      okButtonProps={{ disabled: createPositionsIsLoading }}
      onOk={handleSubmit}
    >
      <CustomContent>
        <CustomForm
          {...formItemLayout}
          form={form}
          name={"position"}
          validateMessages={validateMessages}
          labelAlign="left"
        >
          <CustomSpin spinning={createPositionsIsLoading}>
            <CustomRow>
              <CustomCol xs={24}>
                <CustomFormItem
                  rules={[{ required: true }]}
                  name={"name"}
                  label={"Nombre"}
                  required
                >
                  <CustomInput placeholder={"Escriba el nombre"} />
                </CustomFormItem>
              </CustomCol>

              <CustomCol xs={24}>
                <CustomFormItem
                  required
                  rules={[{ required: true, type: "number" }]}
                  name={"min_salary"}
                  label={"Salario"}
                >
                  <CustomInputGroup compact style={{ paddingRight: 0 }}>
                    <CustomCol style={{ paddingRight: 0 }} xs={11}>
                      <CustomFormItem
                        rules={[{ required: true, type: "number" }]}
                        name={"min_salary"}
                        label={"Salario mínimo"}
                        required
                        noStyle
                      >
                        <CustomInputNumber
                          onChange={(e) => {
                            setMinSalary(parseInt(`${e}`))
                          }}
                          placeholder={"monto mínimo"}
                        />
                      </CustomFormItem>
                    </CustomCol>

                    <CustomFormItem noStyle>
                      <CustomInput
                        className="site-input-split"
                        style={{
                          width: 30,
                          borderLeft: 0,
                          borderRight: 0,
                          pointerEvents: "none",
                        }}
                        placeholder="~"
                        disabled
                      />
                    </CustomFormItem>
                    <CustomCol xs={11}>
                      <CustomFormItem
                        rules={[
                          { required: true, min: minSalary, type: "number" },
                        ]}
                        name={"max_salary"}
                        label={"Salario máximo"}
                        required
                        noStyle
                      >
                        <CustomInputNumber
                          min={minSalary}
                          placeholder={"Monto máximo"}
                        />
                      </CustomFormItem>
                    </CustomCol>
                  </CustomInputGroup>
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={12}>
                <CustomFormItem
                  rules={[{ required: true }]}
                  required
                  labelCol={{ xs: 8 }}
                  wrapperCol={{ xs: 16 }}
                  name={"department_id"}
                  label={"Departamento"}
                >
                  <CustomSelect loading={getDepartmentsIsLoading} placeholder={"Seleccione el Departamento"}>
                  {departments.map((municipality: any, ind) => (
                <Option key={`${ind}`} value={municipality.id}>
                  {municipality.name}
                </Option>
              ))}
                  </CustomSelect>
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={12}>
                <CustomFormItem
                  rules={[{ required: true }]}
                  required
                  labelCol={{ xs: 8 }}
                  wrapperCol={{ xs: 16 }}
                  name={"status"}
                  label={"Estado"}
                >
                  <CustomSelect placeholder={"Seleccione el estado"}>
                    <Option value={"A"}>Activo</Option>
                    <Option value={"I"}>Inactivo</Option>
                  </CustomSelect>
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={24}>
                <CustomFormItem
                  rules={[{ required: true }]}
                  required
                  labelCol={{ xs: 4 }}
                  wrapperCol={{ xs: 20 }}
                  name={"description"}
                  label={"Descripción"}
                >
                  <CustomTextArea/>
                </CustomFormItem>
              </CustomCol>
            </CustomRow>
          </CustomSpin>
        </CustomForm>
      </CustomContent>
    </CustomModal>
  )
}
export default CreatEditPosition
