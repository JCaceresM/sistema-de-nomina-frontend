/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Form, Select } from "antd";
import { ReactElement, useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPayrollNews, payrollNewsManagerReduxState } from "../../actions/payroll-news/payroll-news.actions";
import { getAllPayroll, PayrollType } from "../../actions/payroll/payroll.actions";
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
}: PropsType): ReactElement => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { Option } = Select;
  const { createPayrollNewsIsLoading, isPayrollNewsCreated } = useSelector(
    (state: RootState) => state.payrollNews
  );
  const { payroll, getPayrollIsLoading } = useSelector(
    (state: RootState) => state.payroll
  );

  const cancelPayment = () => {
    CustomModalConfirmation({
      content: "¿Seguro que desea cancelar la operación?",
      onOk: () => {
        hideModal();
        form.resetFields()
      },
    });
  };
  const handleSubmit = async () => {
    const data = await form.validateFields().catch((e) => e);    
    if (!Object.getOwnPropertyDescriptor(data, "errorFields")) {
     dispatch(createPayrollNews({...data, company_id: getSessionInfo().businessId, status: "A", type: "F"}))
    }
  };
  useEffect(() => {
    if (isPayrollNewsCreated) {
      form.resetFields();
      isPayrollNewsCreated && hideModal();
      dispatch(payrollNewsManagerReduxState({ isPayrollNewsCreated: false }));
    }
  }, [isPayrollNewsCreated]);
 
  return (
    <CustomModal
      title={"Modal"}
      onCancel={cancelPayment}
      visible={visible}
      width={width}
      onOk={handleSubmit}
      confirmLoading={createPayrollNewsIsLoading}
      closable={!createPayrollNewsIsLoading}
      maskClosable={!createPayrollNewsIsLoading}
      cancelButtonProps={{ disabled: createPayrollNewsIsLoading }}
      okButtonProps={{ disabled: createPayrollNewsIsLoading }}

    >
      <CustomSpin spinning={createPayrollNewsIsLoading}>
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
                  name={"name"}
                  label={"Nombre"}
                >
                  <CustomInput />
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={12}>
                <CustomFormItem
                  rules={[{ required: true }]}
                  name={"amount"}
                  label={"Monto"}
                >
                  <CustomInputNumber style={{ width: "100%" }} />
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={12}>
                <CustomFormItem
                  rules={[{ required: true }]}
                  name={"operation"}
                  label={"Operacion"}
                >
                  <CustomSelect>
                    <Option value={"RESTA"}>Suma</Option>
                    <Option value={"RESTA"}>Resta</Option>
                  </CustomSelect>
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={12}>
                <CustomFormItem
                  rules={[{ required: true }]}
                  name={"payroll_id"}
                  label={"Nomina"}
                  
                >
                  <CustomSelect loading={getPayrollIsLoading}>
                  {(payroll || []).map((province: PayrollType, ind) => (
                <Option key={`${ind}`} value={province.id} data={province}>
                  {province.name}
                </Option>
              ))}
                  </CustomSelect>
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={24} />

              <CustomCol xs={24}>
                <CustomFormItem
                labelCol={{span:3}}
                wrapperCol={{span:21}}
                  rules={[{ required: true }]}
                  name={"description"}
                  label={"Descripcion"}
                >
                  <CustomTextArea />
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
