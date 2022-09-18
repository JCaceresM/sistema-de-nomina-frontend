/* eslint-disable @typescript-eslint/no-unused-vars */
import React ,{
  ReactElement,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPayroll,
  PayrollType,
} from "../../actions/payroll/payroll.actions";
import {
  CustomButton,
  CustomCol,
  CustomDatePicker,
  CustomForm,
  CustomFormItem,
  CustomRow,
  CustomSelect,
  CustomTable,
} from "../../common/components";
import CustomLayoutBoxShadow from "../../common/components/CustomLayoutBoxShadow";
import { addPropertyKey } from "../../common/utils";
import { state } from "../../common/utils/table/transform.utils";
import { RootState } from "../../reducers/root_reducers";
import {
  ExportOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  EmployeeType,
} from "../../actions/employee/employee.actions";

import { currencyLocale } from "../../common/utils/locale/locale.format.utils";
import {
  getPayrollRecordCollection,
  PayrollRecordDetailType,
  PayrollRecordType,
} from "../../actions/payroll record/payroll-record.actions";
import { Select } from "antd";
import {
  sumNews,
  totalDiscount,
} from "../../common/utils/tax/index.helpers";
import { SelectConditionType } from "../../common/types/general.type";
import {
  formItemLayout,
  validateMessages,
} from "../../common/utils/forms/validations";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const ReportsPayroll = (): ReactElement => {
  const dispatch = useDispatch();
  const { Option } = Select;

  const { payroll } = useSelector((state: RootState) => state.payroll);
  const { payrollRecord } = useSelector(
    (state: RootState) => state.payrollRecord
  );
  const [conditions, setConditions] = useState<SelectConditionType[]>([]); 
  const [payrollSelected, setPayrollSelected] = useState<Record<string, any>>(
    {}
  );
  const columns = [
    {
      title: "código",
      dataIndex: "id",
    },
    {
      title: "Nómina",
      dataIndex: "name",
    },
    {
      title: "Cant. Emp.",
      render: (record: any) => record.payroll_record_detail.length || 0,
    },
    // {
    //   title: "Descuentos",
    //   render: (record: EmployeeType) => {
    //     // eslint-disable-next-line no-console

    //     return   currencyLocale(totalDiscount(record, []))
    //   },
    //   ellipsis: true,
    // },
    {
      title: "Neto",
      render: (record: any) => {
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
      title: "Operaciones",
      render: (record: any) => {
        return (
          <CustomRow justify={"center"}>
            <CustomCol style={{ textAlign: "right" }} xs={8}>
            <Download record={record as unknown as PayrollRecordType} />
            </CustomCol>
          </CustomRow>
        );
      },
    },
  ];
 
  useEffect(() => {
    dispatch(getAllPayroll());
  }, []);

  return (
    <CustomLayoutBoxShadow>
      <CustomRow>
        <CustomCol xs={24}>
          <CustomForm
            {...formItemLayout}
            // form={form}
            name={"department"}
            validateMessages={validateMessages}
            labelAlign="left"
          >
            <CustomRow>
              <CustomCol xs={6}>
                <CustomFormItem label={"Nomina"} name={"Nomina"}>
                  <CustomSelect
                    onChange={(e: any, data: any) => {
                      // eslint-disable-next-line no-console
                      console.log(data, "d");
                      setPayrollSelected(data.data);
                      setConditions((item) => [
                        ...item.filter((item) => item.field !== "payroll_id"),
                        { field: "payroll_id", operator: "=", condition: e },
                      ]);
                    }}
                    // loading={getPayrollIsLoading}
                    showSearch
                    value={payrollSelected.id}
                    style={{ width: "80%" }}
                  >
                    {payroll.map((item: PayrollType, ind: number) => (
                      <Option key={`${ind}`} value={item.id} data={item}>
                        {item.name}
                      </Option>
                    ))}
                  </CustomSelect>
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={6}>
                <CustomFormItem label={"Estado"} name={"Estado"}>
                  <CustomSelect
                    onChange={(e: any) => {
                      setConditions((item) => [
                        ...item.filter((item) => item.field !== "status"),
                        { field: "status", operator: "=", condition: e },
                      ]);
                    }}
                    // loading={getPayrollIsLoading}
                    style={{ width: "80%" }}
                  >
                    <Option value={"AU"}>Autorizada</Option>
                    <Option value={"A"}>Aprobada</Option>
                    <Option value={"R"}>Registrada</Option>
                    <Option value={"D"}>Declinada</Option>
                  </CustomSelect>
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={6}>
                <CustomFormItem label={"Mes"} name={"Mes"}>
                  <CustomDatePicker
                    onChange={(e) => {
                      const currentDate = new Date(e?.toISOString() || "");
                      e?.toISOString() &&
                        setConditions((item) => [
                          ...item.filter((item) => item.field !== "created_at"),
                          {
                            field: "created_at",
                            operator: "BETWEEN",
                            condition: `${currentDate.getFullYear()}-${
                              currentDate.getMonth() + 1
                            }-01 , ${currentDate.getFullYear()}-${
                              currentDate.getMonth() === 10
                                ? 1
                                : currentDate.getMonth() + 2
                            }-01 `,
                          },
                        ]);
                    }}
                    format={"MMMM-YYYY"}
                    picker="month"
                  />
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={4}>
                <CustomFormItem label={"Buscar"}>
                  <CustomButton
                    icon={<SearchOutlined />}
                    onClick={() => {
                      dispatch(getPayrollRecordCollection(conditions));
                    }}
                  />
                </CustomFormItem>
              </CustomCol>

              <CustomCol xs={2}/>
            </CustomRow>
          </CustomForm>
        </CustomCol>
        <CustomCol xs={24}>
          <CustomTable
            dataSource={addPropertyKey(payrollRecord)}
            columns={columns}
          ></CustomTable>
        </CustomCol>
      </CustomRow>
    </CustomLayoutBoxShadow>
  );
};

export default ReportsPayroll;

const Download = ({ record }: { record: PayrollRecordType }) => {
  return (
    <ExcelFile
      name={`${record.name}-m`}
      element={<CustomButton icon={<ExportOutlined />} />}
    >
      <ExcelSheet data={record.payroll_record_detail || []} name={`Nomina`}>
        <ExcelColumn label="Nombre" value="first_name" />
        <ExcelColumn label="Apellido" value="last_name" />
        <ExcelColumn label="Cedula" value="document_id" />
        <ExcelColumn label="Genero" value="gender" />
        <ExcelColumn
          label="descuentos"
          value={(col: PayrollRecordDetailType) =>
            currencyLocale(
              totalDiscount(
                {
                  salary: col.salary || 0,
                  payroll_news: col.payroll_news_record || [],
                } as unknown as EmployeeType,
                []
              )
            )
          }
        />
        <ExcelColumn label="Salario" value="salary" />
      </ExcelSheet>
      <ExcelSheet
        data={(record.payroll_record_detail || []).reduce((prev: any, next) => {
          return [
            ...prev,
            ...next.payroll_news_record.map((item) => ({
              ...item,
              first_name: next.first_name,
              last_name: next.last_name,
            })),
          ];
        }, [])}
        name={` Ingresos-Descuentos `}
      >
        <ExcelColumn label="Nombre" value="first_name" />
        <ExcelColumn label="Apellido" value="last_name" />
        <ExcelColumn label="Nombre del descuento" value="name" />
        <ExcelColumn label="Operacion del descuento" value="operation" />
        <ExcelColumn
          label="Estado del decuento"
          value={(e: string) => state[e]}
        />
        <ExcelColumn
          label="Creacion del decuento"
          value={(e: PayrollRecordDetailType) => new Date(e.created_at)}
        />
        <ExcelColumn label="monto" value="amount" />
      </ExcelSheet>
    </ExcelFile>
  );
};
