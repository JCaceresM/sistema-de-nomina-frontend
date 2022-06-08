/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Form, Select } from "antd";
import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { EmployeeType } from "../../actions/employee/employee.actions";
import {
  createPayrollNews,
  createPayrollNewsEmployee,
  payrollNewsManagerReduxState,
  PayrollNewsType,
} from "../../actions/payroll-news/payroll-news.actions";
import {
  getAllPayroll,
  PayrollType,
} from "../../actions/payroll/payroll.actions";
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
import { validateMessages } from "../../common/utils/forms/validations";

import { RootState } from "../../reducers/root_reducers";
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 8 },
    lg: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 16 },
    lg: { span: 18 },
  },
};
const FixPayrollCreatEditNews = ({
  visible,
  width,
  hideModal,
  type,
  employeeSelected,
}: PropsType & {
  employeeSelected: EmployeeType | undefined;
  type: string;
}): ReactElement => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const location = useLocation()
  const locationState = {...location.state as Record<string, string>} as {[key:string]: any}
  const { Option } = Select;
  const [newsName, setNewsName] = useState("");
  const {
    createPayrollNewsEmployeeIsLoading,
    isPayrollNewsEmployeeCreated,
    isPayrollNewsCreated,
  } = useSelector((state: RootState) => state.payrollNews);
  const { payroll, getPayrollIsLoading } = useSelector(
    (state: RootState) => state.payroll
  );

  const cancelPayment = () => {
    CustomModalConfirmation({
      content: "¿Seguro que desea cancelar la operación?",
      onOk: () => {
        hideModal();
        form.resetFields();
      },
    });
  };
  const handleSubmit = async () => {
    const data = await form.validateFields().catch((e: any) => e);
    // eslint-disable-next-line no-console
    console.log(data);

    if (!Object.getOwnPropertyDescriptor(data, "errorFields")) {
      const payrollNews = {
        type: locationState.type,
        description: data.description,
        name: data.name,
        operation: type === "Descuentos" ? "RESTA" : "SUMA",
        status: "A",
        amount: data.amount,
        company_id: getSessionInfo().businessId,
        user_insert: getSessionInfo().username,
      } as unknown as Partial<PayrollNewsType>;
     
      dispatch(
        createPayrollNewsEmployee(employeeSelected?.id as number, payrollNews)
      );
    }
  };
  useEffect(() => {
    if (isPayrollNewsEmployeeCreated) {
      form.resetFields();
      isPayrollNewsEmployeeCreated && hideModal();
      dispatch(
        payrollNewsManagerReduxState({ isPayrollNewsEmployeeCreated: false })
      );
    }
  }, [isPayrollNewsEmployeeCreated]);

  return (
    <CustomModal
      title={`Crear ${type}`}
      onCancel={cancelPayment}
      visible={visible}
      width={width}
      onOk={handleSubmit}
      confirmLoading={createPayrollNewsEmployeeIsLoading}
      closable={!createPayrollNewsEmployeeIsLoading}
      maskClosable={!createPayrollNewsEmployeeIsLoading}
      cancelButtonProps={{ disabled: createPayrollNewsEmployeeIsLoading }}
      okButtonProps={{ disabled: createPayrollNewsEmployeeIsLoading }}
    >
      <CustomSpin spinning={createPayrollNewsEmployeeIsLoading}>
        <CustomContent>
          <CustomForm
            {...formItemLayout}
            name={"payroll_news"}
            validateMessages={validateMessages}
            form={form}
          >
            <CustomRow gutter={[5, 5]}>
              <CustomCol xs={12}>
                <CustomFormItem
                  rules={[{ required: true }]}
                  name={newsName !== "" ? "name" : undefined}
                  label={`${type}`}
                >
                  <CustomSelect
                    onChange={(value: any) => {
                      setNewsName(`${value}`);
                    }}
                    placeholder={`Seleccione el tipo de ${type}`}
                  >
                    <Option
                      value={type == "Descuentos" ? "Prestamos" : "Incentivos"}
                    >
                      {type == "Descuentos" ? "Prestamos" : "Incentivos"}
                    </Option>
                    <Option
                      value={type == "Descuentos" ? "Sanciones" : "Bonos"}
                    >
                      {type == "Descuentos" ? "Sanciones" : "Bonos"}
                    </Option>
                    <Option value={`Escriba ${type}`}>Otros</Option>
                  </CustomSelect>
                </CustomFormItem>
              </CustomCol>

              {newsName === `Escriba ${type}` ?? (
                <CustomCol xs={12}>
                  <CustomFormItem
                    rules={[{ required: true }]}
                    name={"name"}
                    label={`${type}`}
                    initialValue={""}
                  >
                    <CustomInput></CustomInput>
                  </CustomFormItem>
                </CustomCol>
              ) }

              <CustomCol xs={12}>
                <CustomFormItem
                  rules={[{ required: true }]}
                  name={"amount"}
                  label={"Monto"}
                >
                  <CustomInputNumber
                    min={0}
                    placeholder="Digite el monto"
                    style={{ width: "100%" }}
                  />
                </CustomFormItem>
              </CustomCol>
              {/* <CustomCol xs={12}>
                {news === "H" ? (
                  <CustomFormItem
                    rules={[{ required: true }]}
                    name={"hours"}
                    label={"Horas"}
                  >
                    <CustomInputNumber min={0} />
                  </CustomFormItem>
                ) : (
                  <p />
                )}
              </CustomCol> */}
              <CustomCol xs={12}>
                {/* <CustomFormItem
                  rules={[{ required: true }]}
                  name={"employee_id"}
                  label={"Empleado"}
                >
                  <CustomSelect placeholder={'seleccione el empleado'} loading={getPayrollIsLoading}>
                    {(payroll || []).map((province: PayrollType, ind) => (
                      <Option
                        key={`${ind}`}
                        value={province.id}
                        data={province}
                      >
                        {province.name}
                      </Option>
                    ))} */}
                {/* </CustomSelect>
                </CustomFormItem> */}
              </CustomCol>
              <CustomCol xs={24} />

              <CustomCol xs={24}>
                <CustomFormItem
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 21 }}
                  rules={[{ required: true }]}
                  name={"description"}
                  label={"Descripcion"}
                >
                  <CustomTextArea
                    placeholder={`Escriba una descripcion de la ${type}`}
                  />
                </CustomFormItem>
              </CustomCol>
            </CustomRow>
          </CustomForm>
        </CustomContent>
      </CustomSpin>
    </CustomModal>
  );
};

export default FixPayrollCreatEditNews;
