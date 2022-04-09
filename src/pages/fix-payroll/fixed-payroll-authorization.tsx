/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CheckCircleTwoTone,
  DeleteTwoTone,
  EyeTwoTone,
} from "@ant-design/icons";
import { Form, Select } from "antd";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AccountType,
  getAccounts,
} from "../../actions/accounts/accounts.actions";
import {
  getPayrollRecordCollection,
  payrollRecordAuthorized,
  payrollRecordManagerReduxState,
  PayrollRecordType,
  updatePayrollRecord,
} from "../../actions/payroll record/payroll-record.actions";
import {
  CustomButton,
  CustomCol,
  CustomForm,
  CustomFormItem,
  CustomModal,
  CustomRow,
  CustomSelect,
  CustomTable,
  CustomTitle,
  CustomTooltip,
} from "../../common/components";
import CustomLayoutBoxShadow from "../../common/components/CustomLayoutBoxShadow";
import CustomPopConfirm from "../../common/components/CustomPopConfirm";
import CustomSpin from "../../common/components/CustomSpin";
import { addPropertyKey, getSessionInfo } from "../../common/utils";
import { getDateAsSpanishShortDate } from "../../common/utils/date/date.helpers";
import {
  formItemLayout,
  validateMessages,
} from "../../common/utils/forms/validations";
import { currencyLocale } from "../../common/utils/locale/locale.format.utils";
import { sumNews } from "../../common/utils/tax/index.helpers";
import { RootState } from "../../reducers/root_reducers";

const FixedPayrollAuthorization = (): ReactElement => {
  const dispatch = useDispatch();
  const { payrollRecord, isPayrollRecordUpdated, paymentIsComplete, paymentIsLoading } = useSelector(
    (state: RootState) => state.payrollRecord
  );
  const { accounts, getAccountsIsLoading } = useSelector(
    (state: RootState) => state.accounts
  );
  const [form] = Form.useForm();
  const { Option } = Select;

  const [visible, setVisible] = useState(false);
  const [payrollRecordSelected, setPayrollRecordSelected] = useState<
    Record<string, any>
  >({});
  const columns = [
    {
      title: "Año",
      render: (record: { registered_at: string | Date | undefined }) => {
        const date = getDateAsSpanishShortDate(record.registered_at, "es-ES", {
          month: undefined,
          day: undefined,
          year: "numeric",
        });
        return date.date;
      },
    },
    {
      title: "Mes",
      render: (record: { registered_at: string | Date | undefined }) => {
        const date = getDateAsSpanishShortDate(record.registered_at, "es-ES", {
          month: "long",
          day: undefined,
          year: undefined,
        });
        return date.date;
      },
    },
    {
      title: "Nombre",
      dataIndex: "name",
    },
    {
      title: "Descripción",
      dataIndex: "description",
    },

    {
      title: "Monto total",
      render: (record: Record<string, any>) => {
        return currencyLocale(
          record.payroll_record_detail.reduce(
            (prev: number, next: Record<string, number>) =>
              prev +
              next?.salary +
              sumNews(record.payroll_record_detail.payroll_news_record, "SUMA"),
            0
          )
        );
      },
    },
    {
      title: "Cant. Emp",
      render: (record: Record<string, any>) => {
        return record?.payroll_record_detail?.length || 0;
      },
    },
    {
      title: "Operaciones",
      render: (record: PayrollRecordType) => {
        return (
          <CustomRow justify={"center"}>
            <CustomCol style={{ textAlign: "center" }} xs={12}>
              <CustomPopConfirm
                title={"¿Declinar nomina?"}
                onConfirm={() => {
                  dispatch(
                    updatePayrollRecord(record.id, {
                      status: "D",
                      company_id: getSessionInfo().businessId,
                      user_update: getSessionInfo().username,
                    })
                  );
                }}
              >
                <CustomTooltip placement={"bottom"} title={"Declinar"}>
                  <CustomButton
                    type={"link"}
                    icon={<DeleteTwoTone twoToneColor={"red"} />}
                    // onClick={() => {
                    //   setPayrollRecordSelected(record);
                    //   setVisible(true);
                    // }}
                    //   setVisible(true);
                    //   setDataView(record.payroll_record_detail || []);
                    //   setPayrollSelected(record);
                    // }}
                  />
                </CustomTooltip>
              </CustomPopConfirm>
            </CustomCol>
            <CustomCol style={{ textAlign: "left" }} xs={12}>
              {/* <CustomPopConfirm
                title={"¿Aprobar nomina?"}
                onConfirm={() => {
                  dispatch(payrollRecordAuthorized(record.id, { status: "AU" , company_id: getSessionInfo().businessId,
                  user_update: getSessionInfo().username }));
                }}
              > */}
              <CustomTooltip placement={"bottom"} title={"Aprobar"}>
                <CustomButton
                  type={"link"}
                  icon={<CheckCircleTwoTone />}
                  onClick={() => {
                    setPayrollRecordSelected(record);
                    setVisible(true);
                  }}
                />
              </CustomTooltip>
              {/* </CustomPopConfirm> */}
            </CustomCol>
          </CustomRow>
        );
      },
    },
  ];
  const hideModal = () => setVisible(false);
  useEffect(() => {
    if (isPayrollRecordUpdated) {
      dispatch(
        getPayrollRecordCollection([
          { field: "status", operator: "=", condition: "A" },
        ])
      );
      dispatch(
        payrollRecordManagerReduxState({ isPayrollRecordUpdated: false })
      );
    }
  }, [isPayrollRecordUpdated]);
  useEffect(() => {
    dispatch(
      getPayrollRecordCollection([
        { field: "status", operator: "=", condition: "A" },
      ])
    );
    dispatch(
      getAccounts({
        searchConditions: [{ field: "status", operator: "=", condition: "A" }],
        pagination: { take: 10, skip: 0 },
      })
    );
  }, []);
  useEffect(() => {
   if (paymentIsComplete) {
    hideModal()
    dispatch(payrollRecordManagerReduxState({paymentIsComplete: false}))
   }
  }, [paymentIsComplete]);
  return (
    <CustomLayoutBoxShadow>
      <CustomRow>
        <CustomCol xs={24}>
          <CustomTitle level={3}>Consulta</CustomTitle>
        </CustomCol>
        <CustomCol xs={24}>
          <CustomTable
            columns={columns}
            dataSource={addPropertyKey(payrollRecord)}
          ></CustomTable>
        </CustomCol>
        <CustomCol xs={24}>
          <CustomModal
            title={"Pago"}
            onCancel={hideModal}
            visible={visible}
            width={"50%"}
            confirmLoading={paymentIsLoading}
            closable={!paymentIsLoading}
            maskClosable={!paymentIsLoading}
            okButtonProps={{ disabled: paymentIsLoading }}
            // cancelText={stepState > 0 ? "Atrás" : "Cancelar"}
            // okText={stepState < 2 ? "Siguiente" : "Finalizar"}
            cancelButtonProps={{
              disabled: paymentIsLoading,
              onClick: () => hideModal(),
            }}
            onOk={async () => {
              const data = await form.validateFields().catch((e) => e);
              // eslint-disable-next-line no-console
              console.log(data);

              if (!Object.getOwnPropertyDescriptor(data, "errorFields")) {
                if (
                  Object.prototype.hasOwnProperty.call(
                    payrollRecordSelected,
                    "id"
                  )
                ) {
                  dispatch(
                    payrollRecordAuthorized(
                      data.bank_account_id,
                      payrollRecordSelected.id,
                      "DV"
                    )
                  );
                }
              }
            }}
          >
            <CustomSpin spinning={paymentIsLoading}>
              <CustomForm
                {...formItemLayout}
                name={"payroll_news"}
                validateMessages={validateMessages}
                form={form}
              >
                <CustomRow>
                  <CustomCol xs={24}>
                    <CustomFormItem
                      name={"bank_account_id"}
                      required
                      rules={[{ required: true }]}
                    >
                      <CustomSelect
                        defaultValue={payrollRecordSelected.bank_account_id}
                        loading={getAccountsIsLoading}
                      >
                        {(accounts || []).map((item: AccountType, ind) => (
                          <Option key={`${ind}`} value={item.id} data={item}>
                            {item.name}
                          </Option>
                        ))}
                      </CustomSelect>
                    </CustomFormItem>
                  </CustomCol>
                  <CustomCol xs={24}></CustomCol>
                  <CustomCol xs={24}></CustomCol>
                </CustomRow>
              </CustomForm>
            </CustomSpin>
          </CustomModal>
        </CustomCol>
      </CustomRow>
    </CustomLayoutBoxShadow>
  );
};
export default FixedPayrollAuthorization;
