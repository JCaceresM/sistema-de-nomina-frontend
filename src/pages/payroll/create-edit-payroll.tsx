/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form, Select, Steps } from "antd";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteTwoTone,
  EditTwoTone,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons"
import {
  createDepartment,
  departmentManagerReduxState,
  DepartmentType,
  getAllDepartment,
} from "../../actions/department/department.actions";
import { setLocalState } from "../../actions/local/localState.actions";
import { createPayroll, payrollManagerReduxState } from "../../actions/payroll/payroll.actions";
import {
  CustomButton,
  CustomCol,
  CustomContent,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomInputNumber,
  CustomModal,
  CustomRow,
  CustomSelect,
  CustomTable,
  CustomText,
  CustomTextArea,
  CustomTooltip,
} from "../../common/components";
import { CustomModalConfirmation } from "../../common/components/ConfirmModalMethod";
import { getDateAsSpanishShortDate } from "../../common/components/CustomDateFormatFunction";
import CustomPopConfirm from "../../common/components/CustomPopConfirm";
import CustomSpin from "../../common/components/CustomSpin";
import { PropsType } from "../../common/types/modal.type";
import { addPropertyKey, getSessionInfo } from "../../common/utils";
import {
  validateMessages,
} from "../../common/utils/forms/validations";
import { currencyLocale } from "../../common/utils/locale/locale.format.utils";
import { state } from "../../common/utils/table/transform.utils";
import { RootState } from "../../reducers/root_reducers";

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 24 },
    xl: { span: 8 },
    xxl: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 24 },
    xl: { span: 16 },
    xxl: { span: 16 },
  },
}
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
  const [deparmentsSelected, setDeparmentSelected]=useState<DepartmentType[]>([])
  const { departmentsNotInPayroll, getDepartmentNotInPayrollIsLoading } = useSelector(
    (state: RootState) => state.departments
  );
  const columns = [
    {
      key: 4,
      title: "id",
      dataIndex: "id",    width: '25%',

    },
    {
      title: "Name",
      dataIndex: "name",    width: '25%',

    },
    {
      title: "Estado",
      dataIndex: "status",    width: '25%',

      render: (value: string) => state[value],
    },
    {
      title: (
        
            <CustomText>Operaciones</CustomText>
         
      ),
      ellipsis: true,
      width: "25%",
      render: (record: DepartmentType) => {
        return (
          <CustomRow justify={"center"}>
            <CustomCol xs={4}>
              {" "}
              <CustomPopConfirm
                title={"Quitar de la Nomina?"}
                onConfirm={() => {
 setDeparmentSelected(deparmentsSelected.filter((dep)=> dep.id !== record.id))                }}
              >
                <CustomTooltip placement={"bottom"} title={"Editar"}>
                  <CustomButton
                    type={"link"}
                    icon={<DeleteTwoTone twoToneColor={"red"} />}
                  />
                </CustomTooltip>
              </CustomPopConfirm>
            </CustomCol>
          </CustomRow>
        )
      },
    },
  ]
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
      dispatch(createPayroll({ ...data, company_id: getSessionInfo().businessId, status: "A",     user_insert: getSessionInfo().username,}));
    }
  };
  useEffect(() => {
    if (isPayrollCreated) {
      form.resetFields();
      isPayrollCreated && hideModal();
      dispatch(payrollManagerReduxState({ isPayrollCreated: false }));
    }
  }, [isPayrollCreated]);
  return (
    <CustomModal
      title={"Crear"}
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
            <CustomRow gutter={[5, 5]} justify={"space-around"} align="top">
         
              <CustomCol span={12} >
              <CustomCol xs={24}>
                <CustomFormItem
                  rules={[{ required: true }]}
                  name={"name"}
                  label={"Name"}
                  required
                >
                  <CustomInput placeholder={"Escriba el nombre"} />
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={24}>
                <CustomFormItem
                  rules={[{ required: true }]}
                  name={"bank_account"}
                  label={"Debitado de"}
                  required
                >
                  <CustomSelect
                  style={{ width: "100%" }}
                    placeholder={"Seleccione Cuenta predeterminada"}
                  >
                    <Option value={1}>Activo</Option>
                    <Option value={2}>Inactivo</Option>
                  </CustomSelect>
                </CustomFormItem>
              </CustomCol>
              
             

              <CustomCol xs={24}>
                <CustomFormItem
                 required
                 rules={[{ required: true }]}
                  name={"description"}
                  label={"Descripcion"}
                >
                  <CustomTextArea
                    placeholder={"Escriba una descripcion de la nomina"}
                  />
                </CustomFormItem>
              </CustomCol>
              </CustomCol>
              <CustomCol span={12}>
                 <CustomCol xs={24}>
                <CustomFormItem
                  required
                  rules={[{ required: true }]}
                  label={"Departamento"}
                >
                  <CustomSelect
                  style={{ width: "100%" }}
                    loading={getDepartmentNotInPayrollIsLoading}
                    placeholder={"Seleccione el departamento"}
                    onSelect={(_: any, e: Record<string, DepartmentType>) => {                      
                      setDeparmentSelected(
                        [...deparmentsSelected,(e )?.data ]
                      )
                      
                    }}
                  >
                    {(departmentsNotInPayroll.filter((dep)=> deparmentsSelected.every((item)=> item.id != dep.id) ) || []).map((dep: DepartmentType, ind) => (
                      <Option key={`${ind}`} value={dep.id} data={dep}>
                        {dep.name}
                      </Option>
                    ))}
                  </CustomSelect>
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={24}>

                <CustomTable pagination={false} columns={columns} dataSource={addPropertyKey(deparmentsSelected)} scroll={{y: 200, x:200}}/>
              </CustomCol>
              </CustomCol>
            </CustomRow>
          </CustomSpin>
        </CustomForm>
      </CustomContent>
    </CustomModal>
  );
};
export default CreatEditPayroll;
