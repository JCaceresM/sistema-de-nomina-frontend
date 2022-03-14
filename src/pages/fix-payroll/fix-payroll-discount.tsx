import React, { Form, Select } from "antd";
import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPayrollNews, getPayrollnewsCollection, payrollNewsManagerReduxState } from "../../actions/payroll-news/payroll-news.actions";
import { getAllPayroll, PayrollType } from "../../actions/payroll/payroll.actions";
import { CustomButton, CustomCol, CustomContent, CustomForm, CustomFormItem, CustomInput, CustomInputNumber, CustomModal, CustomRow, CustomSelect, CustomTable, CustomTextArea, CustomTitle, CustomTooltip } from "../../common/components";
import { CustomModalConfirmation } from "../../common/components/ConfirmModalMethod";
import CustomLayoutBoxShadow from "../../common/components/CustomLayoutBoxShadow";
import CustomSpin from "../../common/components/CustomSpin";
import { PropsType } from "../../common/types/modal.type";
import { addPropertyKey, getSessionInfo } from "../../common/utils";
import {  validateMessages } from "../../common/utils/forms/validations";
import { currencyLocale } from "../../common/utils/locale/locale.format.utils";
import { RootState } from "../../reducers/root_reducers";
import {PlusOutlined} from "@ant-design/icons";
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
const FixPayrollDiscount = (): ReactElement => {
    const dispatch = useDispatch();
    const {Option}= Select
    const [createEditIsVisible, setCreateEditIsVisible] = useState(false);
    const [payrollSelected, setPayrollSelected] = useState<PayrollType>();
    const hideModal = () => setCreateEditIsVisible(false);
    const { payrollNews } = useSelector((state: RootState) => state.payrollNews);
    const { payroll } = useSelector((state: RootState) => state.payroll);
    const columns = [
      {
        title: "código",
        dataIndex: "id",
      },
      {
        title: "Nombre",
        dataIndex: "name",
      },
      {
        title: "Accion",
        dataIndex: "operation",
      },
      {
        title: "Descripcion",
        dataIndex: "description",
        elipsis: true
      },
      {
        title: "Monto",
        dataIndex: "amount",
        render: (value: number) => currencyLocale(value),
      },
      {
        title: "Activo",
        dataIndex: "status",
      },
      {
        title: "Nomina",
        dataIndex: "payroll_id",
        render: (value: number) => {
          return payroll.find((item) => item.id == value)?.name || '--';
        },
      },
    ];
  
    useEffect(() => {
      dispatch(
        getAllPayroll([
          {
            field: "type",
            operator: "=",
            condition: "F",
          },
        ])
      );
    }, []);
    const Title = () => {
      return (
        <CustomRow>
          <CustomCol xs={18}>
            <CustomTitle level={3}>Consulta</CustomTitle>
          </CustomCol>
          <CustomCol xs={6}>
            <CustomRow justify={"end"}>
              <CustomTooltip title={"Registrar"}>
                <CustomButton
                  icon={<PlusOutlined />}
                  onClick={() => setCreateEditIsVisible(true)}
                ></CustomButton>
              </CustomTooltip>
            </CustomRow>
          </CustomCol>
          <CustomCol xs={12}>
            <CustomFormItem name={'a'} label={'Nomina'}>
                <CustomSelect defaultValue={payrollSelected?.id} onChange={(value, option)=> {
                    dispatch(getPayrollnewsCollection(
                        [
                            {
                              field: "payroll_id",
                              operator: "=",
                              condition: `${value}`,
                            },
                          ]
                    ));
                    setPayrollSelected( (option as Record<string, PayrollType>).data)
                }} placeholder={'Seleccione una nomina'}>
                {(payroll || []).map((item: PayrollType, ind) => (
                <Option key={`${ind}`} value={item.id} data={item}>
                  {item.name}
                </Option>
              ))}
                </CustomSelect>
            </CustomFormItem>
          </CustomCol>
         
        </CustomRow>
      );
    };
    return (
      <CustomLayoutBoxShadow>
        <CustomRow>
          <CustomCol xs={24}>
            <Title />
          </CustomCol>
          <CustomCol xs={24}>
            <CustomTable
              dataSource={addPropertyKey(payrollNews)}
              columns={columns}
            ></CustomTable>
          </CustomCol>
          <CustomCol xs={24}>
            <FixPayrollCreatEditNews
              width={"60%"}
              hideModal={hideModal}
              visible={createEditIsVisible}
            />
          </CustomCol>
        </CustomRow>
      </CustomLayoutBoxShadow>
    );
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
export default FixPayrollDiscount;
