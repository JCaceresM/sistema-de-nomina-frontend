/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  EyeTwoTone,
} from "@ant-design/icons";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  getPayrollRecordCollection,
  payrollRecordManagerReduxState,
} from "../../actions/payroll record/payroll-record.actions";
import {
  CustomButton,
  CustomCol,
  CustomRow,
  CustomTable,
  CustomTitle,
  CustomTooltip,
} from "../../common/components";
import CustomLayoutBoxShadow from "../../common/components/CustomLayoutBoxShadow";
import { addPropertyKey } from "../../common/utils";
import { getDateAsSpanishShortDate } from "../../common/utils/date/date.helpers";
import { currencyLocale } from "../../common/utils/locale/locale.format.utils";
import { sumNews } from "../../common/utils/tax/index.helpers";
import { RootState } from "../../reducers/root_reducers";
import FixPayrollModalDetail from "./fix-payroll-datails";

const FixedPayrollRevert = (): ReactElement => {
  const dispatch = useDispatch();
  const location = useLocation()
  const locationState = {...location.state as Record<string, string>} as {[key:string]: any}
  const { payrollRecord, isPayrollRecordUpdated } = useSelector(
    (state: RootState) => state.payrollRecord
  );
  const [visible, setVisible] = useState(false);
  const [dataView, setDataView] = useState([]);
  const [payrollSelected, setPayrollSelected] = useState<Record<string, any>>(
    {}
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
            (prev: number, next: { salary: number; payroll_news_record: never[] | undefined; }) =>
              prev +
              next?.salary +
              sumNews(next.payroll_news_record, "SUMA"),
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
         
            <CustomCol style={{ textAlign: "center" }} xs={8}>
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
          { field: "status", operator: "=", condition: "D" },{
            field: "type",
            operator: "=",
            condition: locationState.type
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
        { field: "status", operator: "=", condition: "D" },{
          field: "type",
          operator: "=",
          condition: locationState.type
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
            columns={columns}
            dataSource={addPropertyKey(payrollRecord)}
          ></CustomTable>
        </CustomCol>
        <CustomCol xs={24}>
        <FixPayrollModalDetail
            visible={visible}
            hideModal={hideModal}
            payrollSelected={payrollSelected}
            dataView={dataView}
          />
        </CustomCol>
      </CustomRow>
    </CustomLayoutBoxShadow>
  );
};
export default FixedPayrollRevert;
