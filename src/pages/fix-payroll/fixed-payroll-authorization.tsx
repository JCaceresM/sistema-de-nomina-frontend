/* eslint-disable @typescript-eslint/no-unused-vars */
import { CheckCircleTwoTone, DeleteTwoTone, EyeTwoTone } from "@ant-design/icons"
import React, { ReactElement, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPayrollRecordCollection, updatePayrollRecord } from "../../actions/payroll record/payroll-record.actions"
import { CustomButton, CustomCol, CustomRow, CustomTable, CustomTitle, CustomTooltip } from "../../common/components"
import CustomLayoutBoxShadow from "../../common/components/CustomLayoutBoxShadow"
import CustomPopConfirm from "../../common/components/CustomPopConfirm"
import { addPropertyKey, getSessionInfo } from "../../common/utils"
import { getDateAsSpanishShortDate } from "../../common/utils/date/date.helpers"
import { currencyLocale } from "../../common/utils/locale/locale.format.utils"
import { RootState } from "../../reducers/root_reducers"

const FixedPayrollAuthorization = (): ReactElement => {
  const dispatch = useDispatch();
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
            (prev: number, next: Record<string, number>) => prev + next.salary,
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
            <CustomCol style={{ textAlign: "center" }} xs={12}>
            <CustomPopConfirm
                title={"¿Declinar nomina?"}
                onConfirm={() => {
                  dispatch(updatePayrollRecord(record.id, { status: "D" , company_id: getSessionInfo().businessId,
                  user_update: getSessionInfo().username }));
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
              </CustomPopConfirm>
            </CustomCol>
            <CustomCol style={{ textAlign: "left" }} xs={12}>
              <CustomPopConfirm
                title={"¿Aprobar nomina?"}
                onConfirm={() => {
                  dispatch(updatePayrollRecord(record.id, { status: "A" , company_id: getSessionInfo().businessId,
                  user_update: getSessionInfo().username }));
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
  useEffect(() => {
    !isPayrollRecordUpdated &&
      dispatch(
        getPayrollRecordCollection([
          { field: "status", operator: "=", condition: "A" },
        ])
      );
  }, [isPayrollRecordUpdated]);
  return (
    <CustomLayoutBoxShadow>
        <CustomRow>
            <CustomCol xs={24}><CustomTitle level={3}>Consulta</CustomTitle></CustomCol>
            <CustomCol xs={24}><CustomTable columns={columns} dataSource={addPropertyKey(payrollRecord)}></CustomTable></CustomCol>
        </CustomRow>
      
    </CustomLayoutBoxShadow>
  )
}
export default FixedPayrollAuthorization
