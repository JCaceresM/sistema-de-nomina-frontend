/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CheckCircleTwoTone,
  DeleteTwoTone,
  EyeTwoTone,
} from "@ant-design/icons";
import { Form, Table } from "antd";
import { ColumnsType, TableRowSelection } from "antd/lib/table/interface";
import { AlignType } from "rc-table/lib/interface";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EmployeeType } from "../../actions/employee/employee.actions";
import { PayrollNewsType } from "../../actions/payroll-news/payroll-news.actions";
import {
  getPayrollRecordCollection,
  PayrollRecordType,
  updatePayrollRecord,
} from "../../actions/payroll record/payroll-record.actions";
import {
  CustomButton,
  CustomCol,
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
  CustomTitle,
  CustomTooltip,
} from "../../common/components";
import CustomDateFormatFunction from "../../common/components/CustomDateFormatFunction";
import CustomLayoutBoxShadow from "../../common/components/CustomLayoutBoxShadow";
import CustomPopConfirm from "../../common/components/CustomPopConfirm";
import { addPropertyKey } from "../../common/utils";
import { getDateAsSpanishShortDate } from "../../common/utils/date/date.helpers";
import {
  formItemLayout,
  validateMessages,
} from "../../common/utils/forms/validations";
import { currencyLocale } from "../../common/utils/locale/locale.format.utils";
import {
  netEarnings,
  othersIncome,
  totalDiscount,
} from "../../common/utils/tax/index.helpers";
import { RootState } from "../../reducers/root_reducers";

const ApproveFixedPayroll = (): ReactElement => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [dataView, setDataView] = useState([]);
  const [payrollSelected, setPayrollSelected] = useState<Record<string, any>>(
    {}
  );
  const [totals, setTotals] = useState<Record<string, number>>({});

  const { payrollRecord , isPayrollRecordUpdated} = useSelector(
    (state: RootState) => state.payrollRecord
  );
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
            (prev: number, next: Record<string, number>) => prev + next?.salary,
            0
          )
        );
      },
    },
    {
      title: "Cant. Emp",
      render: (record: Record<string, any>) => {
        return record.payroll_record_detail.length;
      },
    },
    {
      title: "Revisar",
      render: (record: any) => {
        return (
          <CustomRow justify={"center"}>
            <CustomCol  style={{ textAlign: "right" }} xs={8}>
            <CustomPopConfirm
                title={"¿Declinar nomina?"}
                onConfirm={() => {
                  dispatch(updatePayrollRecord(record.id, { status: "D" }));
                }}
              >
              <CustomTooltip placement={"bottom"} title={"Declinar"}>
                <CustomButton
                  type={"link"}
                  icon={<DeleteTwoTone  twoToneColor={"red"}/>}
                  // onClick={() => {
                  //   setVisible(true);
                  //   setDataView(record.payroll_record_detail || []);
                  //   setPayrollSelected(record);
                  // }}
                />
              </CustomTooltip>
              </CustomPopConfirm></CustomCol>
            <CustomCol style={{ textAlign: "center" }} xs={8}>
              <CustomTooltip placement={"bottom"} title={"Revisar"}>
                <CustomButton
                  type={"link"}
                  icon={<EyeTwoTone />}
                  onClick={() => {
                    setVisible(true);
                    setDataView(record.payroll_record_detail || []);
                    setPayrollSelected(record);
                  }}
                />
              </CustomTooltip>
            </CustomCol>
            <CustomCol style={{ textAlign: "left" }} xs={8}>
              <CustomPopConfirm
                title={"¿Aprobar nomina?"}
                onConfirm={() => {
                  dispatch(updatePayrollRecord(record.id, { status: "A" }));
                }}
              >
                <CustomTooltip placement={"bottom"} title={"Aprobar"}>
                  <CustomButton
                    type={"link"}
                    icon={<CheckCircleTwoTone />}
                    // onClick={() => {}}
                  />
                </CustomTooltip>
              </CustomPopConfirm>
            </CustomCol>
          </CustomRow>
        );
      },
    },
  ];
  const wiewColumns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "nombre",
      render: (record: Record<string, any>) => {
        return record.first_name || "-" + record.last_name || "-";
      },
    },
    {
      title: "posicion",
      dataIndex: "position_name",
    },
    {
      title: "salario",
      dataIndex: "salary",
      render: (value: number) => currencyLocale(value),
      align: "right",
    },
    {
      align: "right",
      title: "Otros Ingresos",
      render: (record: Record<string, any>) => {
        return currencyLocale(
          record.payroll_news_record.reduce(
            (prev: number, next: Record<string, any>) =>
              next.operation === "SUMA" ? prev + next.amount || 0 : 0,
            0
          )
        );
      },
    },
    {
      align: "right",
      title: "Descuentos",
      render: (record: Record<string, any>) => {
        return currencyLocale(
          record.payroll_news_record.reduce(
            (prev: number, next: Record<string, any>) =>
              next.operation === "RESTA" ? prev + next.amount || 0 : 0,
            0
          )
        );
      },
    },
  ];
  const reduce = (arr = [], operation = "RESTA") => {
    return arr.reduce(
      (acc, item: Record<string, any>) =>
        operation === item.operation ? acc + item.amount : acc + 0,
      0
    );
  };
  const hideModal = () => {
    setVisible(false);
  };
  useEffect(() => {
    !isPayrollRecordUpdated &&
      dispatch(
        getPayrollRecordCollection([
          { field: "status", operator: "=", condition: "R" },
        ])
      );
  }, [isPayrollRecordUpdated]);
  useEffect(() => {
    const salaries = dataView.reduce(
      (acc, item: Record<string, any>) => acc + item.salary,
      0
    );
    const discounts = dataView.reduce(
      (acc, news: any) => acc + reduce(news.payroll_news_record, "RESTA"),
      0
    );

    const income = dataView.reduce(
      (acc, news: any) => acc + reduce(news.payroll_news_record, "SUMA"),
      0
    );

    setTotals({ salaries, discounts, income });
  }, [dataView]);
  const summaryPaymentHistory = () => (
    <Table.Summary.Row>
      <Table.Summary.Cell colSpan={3} index={1} align={"right"}>
        <CustomText strong>Totales:</CustomText>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={2} align={"right"}>
        {currencyLocale(totals.salaries)}
      </Table.Summary.Cell>

      <Table.Summary.Cell index={4} align={"right"}>
        {currencyLocale(totals.income)}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={5} align={"right"}>
        {currencyLocale(totals.discounts)}
      </Table.Summary.Cell>
      {/* <Table.Summary.Cell index={5} align={"right"}>
        {currencyLocale(totals.earnings)}
      </Table.Summary.Cell> */}
    </Table.Summary.Row>
  );
  return (
    <CustomLayoutBoxShadow>
      <CustomRow>
        <CustomCol xs={24}>
          <CustomTitle level={3}>Consulta</CustomTitle>
        </CustomCol>
        <CustomCol xs={24}>
          <CustomTable
            dataSource={addPropertyKey(payrollRecord)}
            columns={columns}
          />
        </CustomCol>
        <CustomCol xs={24}>
          <CustomCol xs={24}>
            <CustomModal
              title={"Informacion de la nomina"}
              visible={visible}
              width={"60%"}
              onCancel={hideModal}
              cancelText
              onOk={hideModal}
            >
              <CustomRow gutter={[5, 5]}>
                <CustomCol xs={12}>
                  <CustomFormItem label={"Registrado por"}>
                    <CustomInput
                      value={payrollSelected.user_insert || "Desconocido"}
                      readOnly
                    />
                  </CustomFormItem>
                </CustomCol>
                <CustomCol xs={12}>
                  <CustomFormItem label={"Fecha de registro"}>
                    <CustomInput
                      value={
                        CustomDateFormatFunction(payrollSelected.created_at)
                          .date
                      }
                      readOnly
                    />
                  </CustomFormItem>
                </CustomCol>
                <CustomCol xs={24}>
                  <CustomTable
                    dataSource={addPropertyKey(dataView)}
                    columns={wiewColumns}
                    summary={summaryPaymentHistory}
                    pagination={false}
                    scroll={{ y: 400 }}
                  />
                </CustomCol>
                <CustomCol xs={24} />
              </CustomRow>
            </CustomModal>
          </CustomCol>
        </CustomCol>
      </CustomRow>
    </CustomLayoutBoxShadow>
  );
};
export default ApproveFixedPayroll;
