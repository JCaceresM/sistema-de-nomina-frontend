/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPayroll,
  payrollManagerReduxState,
} from "../../actions/payroll/payroll.actions";
import {
  CustomButton,
  CustomCol,
  CustomFormItem,
  CustomModal,
  CustomRow,
  CustomTable,
  CustomText,
  CustomTitle,
  CustomTooltip,
} from "../../common/components";
import CustomLayoutBoxShadow from "../../common/components/CustomLayoutBoxShadow";
import { addPropertyKey } from "../../common/utils";
import { state } from "../../common/utils/table/transform.utils";
import { RootState } from "../../reducers/root_reducers";
import { EyeTwoTone, PrinterTwoTone } from "@ant-design/icons";
import { PropsType } from "../../common/types/modal.type";
import {
  employeeManagerReduxState,
  EmployeeType,
  getEmployee,
} from "../../actions/employee/employee.actions";
import {
  getPayrollnewsCollection,
  payrollNewsManagerReduxState,
} from "../../actions/payroll-news/payroll-news.actions";
import { currencyLocale } from "../../common/utils/locale/locale.format.utils";
import { getPayrollRecordCollection } from "../../actions/payroll record/payroll-record.actions";
import { Table } from "antd";
import { netEarnings, sumNews } from "../../common/utils/tax/index.helpers";
import { ColumnsType } from "antd/lib/table";
import PrintComponentGeneral from "../../common/components/PrintComponentGeneral";
import HtmlToPrint from "../../common/components/HtmlToPrint";
import { useLocation, useNavigate } from "react-router-dom";
const ConsultingEasterBonus = (): ReactElement => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [payrollSelected, setPayrollSelected] = useState<any>(
    []
  );

  const {
    payrollRecord,

  } = useSelector((state: RootState) => state.payrollRecord);
  const hideModal = () => {
    setVisible(false);
  };

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
      render: (record: any)=>  record.payroll_record_detail.length
    },

    {
      title: "Descripcion",
      render: (record: Record<string, any>) => {
        return record?.description;
      },
      ellipsis: true,
    },
    {
      title: "Operaciones",
      render: (record: any) => {
        return (
          <CustomRow justify={"center"}>
            <CustomCol style={{ textAlign: "center" }} xs={8}>
              <CustomTooltip placement={"bottom"} title={"Revisar"}>
                <CustomButton
                  type={"link"}
                  icon={<EyeTwoTone />}
                  onClick={() => {
                    setVisible(true);
                    setPayrollSelected(record || {});
                  }}
                />
              </CustomTooltip>
            </CustomCol>
          </CustomRow>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(
      getPayrollRecordCollection([
        { field: "status", operator: "=", condition: "AU" },
        { field: "type", operator: "=", condition: "R" },
      ])
    );
  }, []);

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
          ></CustomTable>
        </CustomCol>
        <CustomCol xs={24}>
          <ViewModal
            visible={visible}
            hideModal={hideModal}
            payrollSelected={payrollSelected}
            dataView={[]}
          />
        </CustomCol>
      </CustomRow>
    </CustomLayoutBoxShadow>
  );
};
const ViewModal = ({
  visible,
  hideModal,
  payrollSelected,
}: PropsType & {
  payrollSelected: Record<string, any>;
  dataView: Record<string, any>;
}): ReactElement => {
  const dispatch = useDispatch();

  const [printIsVisible, setPrintIsVisible] = useState(false);
  const [employeeSelected, setEmployee] = useState<Record<string, any>>({});
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
      title: "Operaciones",
      width: "15%",
      render: (record) => {
        return (
          <CustomRow justify={"center"}>
            <CustomCol xs={4}>
              <CustomTooltip placement={"bottom"} title={"Editar"}>
                <CustomButton
                  type={"link"}
                  icon={<PrinterTwoTone />}
                  onClick={() => {
                    setEmployee(record);
                    setPrintIsVisible(true);
                  }}
                />
              </CustomTooltip>
            </CustomCol>
          </CustomRow>
        );
      },
    },
  ];

  const beforeHideModal = () => {
    hideModal();
    dispatch(employeeManagerReduxState({ employees: [] }));
    dispatch(payrollNewsManagerReduxState({ payrollNews: [] }));
  };
  // useEffect(() => {
  //   if (payrollSelected.id && visible) {
  //     dispatch(
  //       getPayrollnewsCollection([
  //         {
  //           field: "payroll_id",
  //           operator: "=",
  //           condition: payrollSelected.id,
  //         },
  //         {
  //           field: "type",
  //           operator: "=",
  //           condition: "R"
  //         },
  //       ])
  //     );
  //     dispatch(
  //       getEmployee({
  //         pagination: { take: 100, skip: 0 },
  //         searchConditions: [
  //           // {
  //           //   field: "type",
  //           //   operator: "=",
  //           //   condition: ""
  //           // },
  //           {
  //             field: "payroll_id",
  //             operator: "=",
  //             condition: payrollSelected.id,
  //           },
  //         ],
  //       })
  //     );
  //   }
  // }, [visible]);
  return (
    <CustomModal
      title={"Informacion de la nomina"}
      visible={visible}
      width={"60%"}
      onCancel={beforeHideModal}
      cancelText
      onOk={beforeHideModal}
    >
      <CustomRow gutter={[5, 5]}>
        <CustomCol xs={24}>
          <CustomFormItem label="Imprimir todo">
              <CustomTooltip placement={"bottom"} title={"Imprimir"}>
                <CustomButton
                  type={"link"}
                  icon={<PrinterTwoTone />}
                  onClick={() => {
                    setEmployee( payrollSelected.payroll_record_detail || []);
                    setPrintIsVisible(true);
                                     
                  }}
                />
              </CustomTooltip>
              </CustomFormItem>
        </CustomCol>
        <CustomCol xs={24}>
          <CustomTable
            dataSource={addPropertyKey(
              payrollSelected.payroll_record_detail || []
            )}
            columns={viewColumns}
            pagination={false}
            scroll={{ y: 400 }}
          />
        </CustomCol>
        <CustomCol xs={24}>
          <CustomModal
            title={"Visualizacion de recibo"}
            visible={printIsVisible}
            width={"40%"}
            onCancel={() => setPrintIsVisible(false)}
            cancelText
            onOk={() => setPrintIsVisible(false)}
          >
            <CustomRow gutter={[5, 5]}>
              <CustomCol xs={24}>
                {" "}
                <HtmlToPrint data={employeeSelected} />
              </CustomCol>
            </CustomRow>
          </CustomModal>
        </CustomCol>
      </CustomRow>
    </CustomModal>
  );
};
export default ConsultingEasterBonus;
