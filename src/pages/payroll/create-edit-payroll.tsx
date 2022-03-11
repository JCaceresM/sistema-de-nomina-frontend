/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form, Select, Steps } from "antd";
import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createDepartment,
  departmentManagerReduxState,
  DepartmentType,
  getAllDepartment,
} from "../../actions/department/department.actions";
import { setLocalState } from "../../actions/local/localState.actions";
import { createPayroll, payrollManagerReduxState } from "../../actions/payroll/payroll.actions";
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
  CustomTextArea,
} from "../../common/components";
import { CustomModalConfirmation } from "../../common/components/ConfirmModalMethod";
import CustomSpin from "../../common/components/CustomSpin";
import { PropsType } from "../../common/types/modal.type";
import { getSessionInfo } from "../../common/utils";
import {
  formItemLayout,
  validateMessages,
} from "../../common/utils/forms/validations";
import { RootState } from "../../reducers/root_reducers";

const { Option } = Select;

const CreatEditPayroll = ({
  visible,
  width,
  hideModal,
}: PropsType): ReactElement => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { createPayrollIsLoading, isPayrollCreated } = useSelector(
    (state: RootState) => state.payroll
  );
  const { departments, createDepartmentsIsLoading } = useSelector(
    (state: RootState) => state.departments
  );
  const cancelPayment = () => {
    CustomModalConfirmation({
      content: "¿Seguro que desea cancelar la operación?",
      onOk: () => {
        hideModal();
      },
    });
  };
  const handleSubmit = async () => {
    const data = await form.validateFields().catch((e) => e);
    if (!Object.getOwnPropertyDescriptor(data, "errorFields")) {
      dispatch(createPayroll({ ...data, company_id: getSessionInfo().businessId, status: "A", }));
    }
  };
  useEffect(() => {
    if (isPayrollCreated) {
      form.resetFields();
      isPayrollCreated && hideModal();
      dispatch(payrollManagerReduxState({ isPayrollCreated: false }));
    }
  }, [isPayrollCreated]);
  useEffect(() => {
    dispatch(getAllDepartment());
  }, []);
  return (
    <CustomModal
      title={"Modal"}
      onCancel={cancelPayment}
      visible={visible}
      width={width}
      confirmLoading={createPayrollIsLoading}
      closable={!createPayrollIsLoading}
      maskClosable={!createPayrollIsLoading}
      cancelButtonProps={{ disabled: createPayrollIsLoading }}
      okButtonProps={{ disabled: createPayrollIsLoading }}
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
          <CustomSpin spinning={createPayrollIsLoading}>
            <CustomRow>
              <CustomCol xs={12}>
                <CustomFormItem
                  rules={[{ required: true }]}
                  name={"name"}
                  label={"Name"}
                  required
                >
                  <CustomInput placeholder={"Escriba el nombre"} />
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={12}>
                <CustomFormItem
                  rules={[{ required: true }]}
                  name={"bank_account"}
                  label={"Debitado de"}
                  required
                >
                  <CustomSelect
                    placeholder={"Seleccione Cuenta predeterminada"}
                  >
                    <Option value={1}>Activo</Option>
                    <Option value={2}>Inactivo</Option>
                  </CustomSelect>
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={12}>
                <CustomFormItem
                  required
                  rules={[{ required: true }]}
                  name={"type"}
                  label={"Tipo"}
                >
                  <CustomSelect placeholder={"Seleccione el estado"}>
                    <Option value={"F"}>Fija </Option>
                    <Option value={"O"}>Ocacional</Option>
                  </CustomSelect>
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={12}>
                <CustomFormItem
                  required
                  rules={[{ required: true }]}
                  name={"deparmentd_id"}
                  label={"Departamento"}
                >
                  <CustomSelect
                    loading={createDepartmentsIsLoading}
                    placeholder={"Seleccione el departamento"}
                  >
                    {(departments || []).map((dep: DepartmentType, ind) => (
                      <Option key={`${ind}`} value={dep.id}>
                        {dep.name}
                      </Option>
                    ))}
                  </CustomSelect>
                </CustomFormItem>
              </CustomCol>

              <CustomCol xs={24}>
                <CustomFormItem
                 required
                 rules={[{ required: true }]}
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                  name={"description"}
                  label={"Descripcion"}
                >
                  <CustomTextArea
                    placeholder={"Escriba una descripcion de la nomina"}
                  />
                </CustomFormItem>
              </CustomCol>
            </CustomRow>
          </CustomSpin>
        </CustomForm>
      </CustomContent>
    </CustomModal>
  );
};
export default CreatEditPayroll;
