/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form, Select, Steps } from "antd"
import moment from "moment"
import React, { ReactElement } from "react"
import { useDispatch } from "react-redux"
import { setLocalState } from "../../actions/local/localState.actions"
import {
  CustomCol,
  CustomContent,
  CustomDatePicker,
  CustomDivider,
  CustomForm,
  CustomFormItem,
  CustomFormProvider,
  CustomInput,
  CustomModal,
  CustomRow,
  CustomSelect,
  CustomStep,
  CustomSteps,
  CustomTitle,
} from "../../common/components"
import { CustomModalConfirmation } from "../../common/components/ConfirmModalMethod"
import { PropsType } from "../../common/types/modal.type"
import {
  formItemLayout,
  validateMessages,
} from "../../common/utils/forms/validations"
import { getFromLocalState } from "../../common/utils/local/dynamicState.helper"
import ContactInfo from "./contact-info"
import GeneralData from "./general-data"
import JobInfo from "./job-info"

type Steps = {
  title: string
  description: string
  node: React.ReactNode
}
const forms: { [key: number]: string } = {
  0: "employeeGeneralFormsData",
  1: "employeeGeneralFormsData",
}
const CreatEditEmployee = ({
  visible,
  width,
  hideModal,
}: PropsType): ReactElement => {
  const [form] = Form.useForm()
  const [state11, setState1] = React.useState(2)
  const dispatch = useDispatch()
  const stepChanger = (step: number) => setState1(step)
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
      title: "Informcion de empleo",
      description: "Información de Empleo",
      node: <JobInfo form={form} stepChanger={stepChanger} />,
    },
  ]
  const cancelPayment = () => {
    CustomModalConfirmation({
      content: "¿Seguro que desea cancelar la operación?",
      onOk: () => {
        hideModal()
      },
    })
  }

  return (
    <CustomModal
      title={"Modal"}
      onCancel={cancelPayment}
      visible={visible}
      width={width}
      cancelText={state11 > 0 ? "Atras" : "Cancelar"}
      okText={state11 < 2 ? "Siguiente" : "Finalizar"}
      cancelButtonProps={{
        onClick: () =>
          state11 === 0 ? cancelPayment() : stepChanger(state11 - 1),
      }}
      onOk={(e) => {
        dispatch(
          setLocalState({ [forms[state11]]: [{ ...form.getFieldsValue() }] })
        )
        state11 < 2 ? stepChanger(state11 + 1) : stepChanger(0)
      }}
    >
      <CustomContent>
        <CustomSteps size="small" style={{ margin: 0 }} current={state11}>
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
          {steps[state11].node}
        </CustomContent>
      </CustomContent>
    </CustomModal>
  )
}
export default CreatEditEmployee
