/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CheckCircleTwoTone,
  DeleteTwoTone,
  EyeTwoTone,
  PrinterTwoTone,
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
  payrollRecordManagerReduxState,
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
import { addPropertyKey, getSessionInfo } from "../../common/utils";
import { getDateAsSpanishShortDate } from "../../common/utils/date/date.helpers";
import {
  formItemLayout,
  validateMessages,
} from "../../common/utils/forms/validations";
import { currencyLocale } from "../../common/utils/locale/locale.format.utils";
import {
  netEarnings,
  othersIncome,
  sumNews,
  totalDiscount,
} from "../../common/utils/tax/index.helpers";
import { RootState } from "../../reducers/root_reducers";
import FixPayrollModalDetail from "./fix-payroll-datails";
import { useLocation } from "react-router-dom";
import HtmlToPrint from "../../common/components/HtmlToPrint";
import HtmlToPrintApprove from "../../common/components/HtmlToPrintAprove";

const ApproveFixedPayroll = (): ReactElement => {
  const dispatch = useDispatch();
  const location = useLocation();
  const locationState = { ...(location.state as Record<string, string>) } as {
    [key: string]: any;
  };
  const [visible, setVisible] = useState(false);
  const [dataView, setDataView] = useState([]);
  const [payrollSelected, setPayrollSelected] = useState<Record<string, any>>(
    {}
  );
  const [payrollToPrint, setPayrollToPrint] = useState(
    {}
  );
  const [printIsVisible, setPrintIsVisible] = useState(false);

  const { payrollRecord, isPayrollRecordUpdated } = useSelector(
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
        return record.payroll_record_detail.length;
      },
    },
    {
      title: "Operaciones",
      render: (record: any) => {
        return (
          <CustomRow justify={"center"}>
            <CustomCol style={{ textAlign: "right" }} xs={6}>
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
                  />
                </CustomTooltip>
              </CustomPopConfirm>
            </CustomCol>
            <CustomCol style={{ textAlign: "center" }} xs={6}>
              <CustomTooltip placement={"bottom"} title={"Revisar"}>
                <CustomButton
                  type={"link"}
                  icon={<EyeTwoTone />}
                  onClick={() => {
                    setVisible(true);
                    setDataView(record.payroll_record_detail || []);
                    setPayrollSelected(record || {});
                  }}
                />
              </CustomTooltip>
            </CustomCol>
            <CustomCol style={{ textAlign: "left" }} xs={6}>
              <CustomTooltip placement={"bottom"} title={"Aprobar"}>
                <CustomButton
                  type={"link"}
                  icon={<PrinterTwoTone />}
                  onClick={() => {
                    setPrintIsVisible(true);
                    setPayrollToPrint(record||[]);
                  }}
                />
              </CustomTooltip>
            </CustomCol>
            <CustomCol style={{ textAlign: "left" }} xs={6}>
              <CustomPopConfirm
                title={"¿Aprobar nomina?"}
                onConfirm={() => {
                  dispatch(
                    updatePayrollRecord(record.id, {
                      status: "A",
                      company_id: getSessionInfo().businessId,
                      user_update: getSessionInfo().username,
                    })
                  );
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

  const hideModal = () => {
    setVisible(false);
  };
  useEffect(() => {
    if (isPayrollRecordUpdated) {
      dispatch(
        getPayrollRecordCollection([
          { field: "status", operator: "=", condition: "R" },
          {
            field: "type",
            operator: "=",
            condition: locationState.type,
          },
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
        { field: "status", operator: "=", condition: "R" },
        {
          field: "type",
          operator: "=",
          condition: locationState.type,
        },
      ])
    );
  }, [location]);

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
          <FixPayrollModalDetail
            visible={visible}
            hideModal={hideModal}
            payrollSelected={payrollSelected}
            dataView={dataView}
          />
        </CustomCol>
        <CustomCol xs={24}>
          <CustomModal
            title={"Visualizacion de recibo"}
            visible={printIsVisible}
            width={"60%"}
            onCancel={() => setPrintIsVisible(false)}
            cancelText
            onOk={() => setPrintIsVisible(false)}
          >
            <CustomRow gutter={[5, 5]}>
              <CustomCol xs={24}>
                {" "}
                <HtmlToPrintApprove data={payrollToPrint} />
              </CustomCol>
            </CustomRow>
          </CustomModal>
        </CustomCol>
      </CustomRow>
    </CustomLayoutBoxShadow>
  );
};
export default ApproveFixedPayroll;
