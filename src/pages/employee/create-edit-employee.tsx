import { Form, Steps } from "antd"
import React, { ReactElement, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  createEmployee,
  employeeManagerReduxState,
} from "../../actions/employee/employee.actions"
import { setLocalState } from "../../actions/local/localState.actions"
import {
  CustomContent,
  CustomDivider,
  CustomModal,
  CustomStep,
  CustomSteps,
} from "../../common/components"
import { CustomModalConfirmation } from "../../common/components/ConfirmModalMethod"
import CustomSpin from "../../common/components/CustomSpin"
import { PropsType } from "../../common/types/modal.type"
import { getSessionInfo } from "../../common/utils"

import { getFromLocalState } from "../../common/utils/local/dynamicState.helper"
import { RootState } from "../../reducers/root_reducers"
import ContactInfo from "./contact-info"
import GeneralData from "./general-data"
import JobInfo from "./job-info"

type Steps = {
  title: string
  description: string
  node: React.ReactNode
}
const CreatEditEmployee = ({
  visible,
  width,
  hideModal,
}: PropsType): ReactElement => {
  const [form] = Form.useForm()
  const [stepState, setStepState] = React.useState(0)
  const dispatch = useDispatch()
  const { isEmployeeCreated, createEmployeesIsLoading } = useSelector(
    (state: RootState) => state.employee
  )
  const stepChanger = (step: number) => setStepState(step)
  const steps: Steps[] = [
    {
      title: "Datos generales",
      description: "Información básica",
      node: <GeneralData form={form} stepChanger={stepChanger} />,
    },
    {
      title: "Contactos",
      description: "Información de Contacto",
      node: <ContactInfo form={form} stepChanger={stepChanger} />,
    },
    {
      title: "Información de empleo",
      description: "Información de Empleo",
      node: <JobInfo form={form} stepChanger={stepChanger} />,
    },
  ]
  const cancelPayment = () => {
    CustomModalConfirmation({
      content: "¿Seguro que desea cancelar la operación?",
      onOk: () => {
        hideModal()
        form.resetFields()
        dispatch(
          setLocalState({
            dataEmployee: {},
          })
        )
      },
    })
  }
  const handleSubmit = async () => {
    const data = await form.validateFields().catch((e) => e)
    if (!Object.getOwnPropertyDescriptor(data, "errorFields")) {
      const prevData: Record<string, unknown> =
        getFromLocalState("dataEmployee")

      dispatch(
        setLocalState({
          dataEmployee: { ...prevData, ...form.getFieldsValue(), status: "A" },
        })
      )
      if (stepState === 2) {
        const data: Record<string, unknown> = getFromLocalState("dataEmployee")
        delete data.ageStored
        dispatch(createEmployee({ ...data, company_id: getSessionInfo().businessId,
          user_insert: getSessionInfo().username }))
      }
      stepState < 2 && stepChanger(stepState + 1)
    }
  }
  useEffect(() => {
    if (isEmployeeCreated) {
      form.resetFields()
      isEmployeeCreated && hideModal()
      dispatch(
        setLocalState({
          dataEmployee: {},
        })
      )
      dispatch(employeeManagerReduxState({ isEmployeeCreated: false }))
    }
  }, [isEmployeeCreated])
  return (
    <CustomModal
      title={"Modal"}
      onCancel={cancelPayment}
      visible={visible}
      width={width}
      confirmLoading={createEmployeesIsLoading}
      closable={!createEmployeesIsLoading}
      maskClosable={!createEmployeesIsLoading}
      okButtonProps={{ disabled: createEmployeesIsLoading }}
      cancelText={stepState > 0 ? "Atrás" : "Cancelar"}
      okText={stepState < 2 ? "Siguiente" : "Finalizar"}
      cancelButtonProps={{
        disabled: createEmployeesIsLoading,
        onClick: () =>
          stepState === 0 ? cancelPayment() : stepChanger(stepState - 1),
      }}
      onOk={handleSubmit}
    >
      <CustomSpin spinning={createEmployeesIsLoading}>
        <CustomContent>
          <CustomSteps size="small" style={{ margin: 0 }} current={stepState}>
            {steps.map((step: Steps) => (
              <CustomStep
                description={step.description}
                key={step.title}
                title={step.title}
              />
            ))}
          </CustomSteps>
          <CustomDivider style={{ marginTop: 0, marginBottom: 10 }} />
          <CustomContent style={{ margin: 0 }}>
            {" "}
            {steps[stepState].node}
          </CustomContent>
        </CustomContent>
      </CustomSpin>
    </CustomModal>
  )
}
export default CreatEditEmployee
