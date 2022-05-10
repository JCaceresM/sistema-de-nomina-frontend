import Table, { ColumnsType } from "antd/lib/table";
import React, { ReactElement, useEffect, useState } from "react";
import {
  CustomCol,
  CustomFormItem,
  CustomInput,
  CustomModal,
  CustomRow,
  CustomTable,
  CustomText,
} from "../../common/components";
import CustomDateFormatFunction from "../../common/components/CustomDateFormatFunction";
import { PropsType } from "../../common/types/modal.type";
import { addPropertyKey } from "../../common/utils";
import { currencyLocale } from "../../common/utils/locale/locale.format.utils";
import { sumNews } from "../../common/utils/tax/index.helpers";

const FixPayrollModalDetail = ({
  visible,
  hideModal,
  payrollSelected,dataView
}: PropsType & { payrollSelected: Record<string, any>, dataView: Array<any> }): ReactElement => {
    const viewColumns: ColumnsType<any> = [
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
                sumNews(record.payroll_news_record, 'SUMA')

            );
          },
        },
        {
          align: "right",
          title: "Descuentos",
          render: (record: Record<string, any>) => {
             
              
            return currencyLocale(
                sumNews(record.payroll_news_record)
            );
          },
        },
      ];
      const [totals, setTotals] = useState<Record<string, number>>({});

    
      useEffect(() => {
        const salaries = dataView.reduce(
          (acc, item: Record<string, any>) => acc + item.salary,
          0
        );
        const discounts = dataView.reduce(
          (acc, news: any) => acc + sumNews(news.payroll_news_record, "RESTA"),
          0
        );
    
        const income = dataView.reduce(
          (acc, news: any) => acc + sumNews(news.payroll_news_record, "SUMA"),
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
              value={CustomDateFormatFunction(payrollSelected.created_at).date}
              readOnly
            />
          </CustomFormItem>
        </CustomCol>
        <CustomCol xs={24}>
          <CustomTable
            dataSource={addPropertyKey(dataView)}
            columns={viewColumns}
            summary={summaryPaymentHistory}
            pagination={false}
            scroll={{ y: 400 }}
          />
        </CustomCol>
        <CustomCol xs={24} />
      </CustomRow>
    </CustomModal>
  );
};
export default FixPayrollModalDetail;
