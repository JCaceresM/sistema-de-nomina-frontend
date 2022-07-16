/* eslint-disable space-before-function-paren */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { EyeTwoTone } from "@ant-design/icons";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeLawBonus } from "../../actions/employee/employee.actions";
import {
  createPayrollLawBonusRecord,
  getPayrollRecordCollection,
  PayrollRecordDetailType,
  payrollRecordManagerReduxState,
} from "../../actions/payroll record/payroll-record.actions";

import {
  getAllPayroll,
  PayrollType,
} from "../../actions/payroll/payroll.actions";
import {
  CustomButton,
  CustomCol,
  CustomModal,
  CustomRow,
  CustomTable,
  CustomText,
  CustomTitle,
  CustomTooltip,
} from "../../common/components";
import { CustomModalConfirmation } from "../../common/components/ConfirmModalMethod";
import CustomLayoutBoxShadow from "../../common/components/CustomLayoutBoxShadow";
import HtmlToPrint from "../../common/components/HtmlToPrint";
import { getSessionInfo } from "../../common/utils";
import { getDateAsSpanishShortDate } from "../../common/utils/date/date.helpers";
import { addPropertyKey } from "../../common/utils/json/mutate-json";
import { showNotification } from "../../common/utils/notification";
import { state } from "../../common/utils/table/transform.utils";
import { RootState } from "../../reducers/root_reducers";

const EasterBonusPayment = (): ReactElement => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const [isPrintModalVisible, setPrintModal] = useState(false);
  const { payroll } = useSelector((state: RootState) => state.payroll);
  const {
    payrollRecordLawBonus,
    payrollRecord,
    isPayrollRecordLawBonusCreated,
  } = useSelector((state: RootState) => state.payrollRecord);
  const { employeesLawBonus, employeesLawBonusIsLoading } = useSelector(
    (state: RootState) => state.employee
  );
  const columns = [
    {
      key: 4,
      title: "id",
      dataIndex: "id",
    },
    {
      title: "Name",
      render: (value: Record<string, string>) => {
        return value.first_name + " " + value.last_name;
      },
    },
    {
      title: "Estado",
      dataIndex: "status",
      render: (value: string) => state[value],
    },
    {
      title: "Monto",
      // dataIndex: "created_at",
      render: (value: Record<string, any>) =>
        value.payroll_record_detail.reduce(
          (prev: number, item: PayrollRecordDetailType) => prev + item.salary,
          0
        ) / value.payroll_record_detail.length,
    },
    {
      title: (
        <CustomRow justify={"center"}>
          <CustomCol xs={24}>
            <CustomText>Operaciones</CustomText>
          </CustomCol>
        </CustomRow>
      ),
      width: "15%",
      render: (record: any) => {
        return (
          <CustomRow justify={"center"}>
            <CustomCol xs={4}>
              <CustomTooltip placement={"bottom"} title={"Ver"}>
                <CustomButton
                  onClick={() => {
                    setVisible(true);
                    setData(record.payroll_record_detail || []);
                    // eslint-disable-next-line no-console
                    console.log(record);
                  }}
                  type={"link"}
                  icon={<EyeTwoTone />}
                />
              </CustomTooltip>
            </CustomCol>
          </CustomRow>
        );
      },
    },
  ];
  const columnsView = [
    {
      key: 4,
      title: "Mes",
      render: (value: any) => {
        // eslint-disable-next-line no-console
        console.log(
          getDateAsSpanishShortDate(value.created_at, "es-ES", {
            year: undefined,
            month: "long",
            day: undefined,
          })
        );

        return getDateAsSpanishShortDate(value.created_at, "es-ES", {
          year: undefined,
          month: "long",
          day: undefined,
        }).date;
      },
    },
    {
      title: "salario",
      dataIndex: "salary",
    },
  ];
  const handleSubmit = async () => {
    CustomModalConfirmation({
      type: "info",
      onOk: () => {
        // eslint-disable-next-line no-console
        console.log(payroll.length , employeesLawBonus.length);
        
        if (payroll.length && employeesLawBonus.length) {
          const data = {
            description: payroll[0].description,
            type: payroll[0].type,
            name: payroll[0].name,

            payroll_id: payroll[0].id,
            bank_account_id: payroll[0].bank_account_id,
            registered_at: new Date().toISOString(),
            user_id: getSessionInfo().userId,
            company_id: getSessionInfo().businessId,
            user_insert: getSessionInfo().username,
            employees: employeesLawBonus.map((employee) => {
              return {
                salary: employee.salary,

                employee_id: employee.id,
                company_id: getSessionInfo().businessId,
                user_insert: getSessionInfo().username,
              };
            }),
          };

          dispatch(createPayrollLawBonusRecord(data));
        } else {
          showNotification({
            type: "error",
            title: "Error",
            description: "No se pudo hacer el pago",
          });
        }
      },
      content: "Va a realizar el pago de la regalia pascual ",
      title: "Aviso",
    });
  };
  useEffect(() => {
    dispatch(
      getAllPayroll([
        {
          field: "type",
          condition: "R",
          operator: "=",
        },
      ])
    );
    dispatch(getEmployeeLawBonus({}));
  }, []);
  useEffect(() => {
    if (isPayrollRecordLawBonusCreated) {
      setPrintModal(true);
      dispatch(
        getPayrollRecordCollection([
          {
            field: "type",
            condition: "R",
            operator: "=",
          },
          {
            field: "id",
            condition: payrollRecordLawBonus.id,
            operator: "=",
          },
        ])
      );
      payrollRecordManagerReduxState({ isPayrollRecordLawBonusCreated: false });
    }
  }, [isPayrollRecordLawBonusCreated]);

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
                onClick={handleSubmit}
                disabled={!employeesLawBonus.length}
              >
                Pagar
              </CustomButton>
            </CustomTooltip>
          </CustomRow>
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
            dataSource={addPropertyKey(employeesLawBonus)}
            columns={columns}
            loading={employeesLawBonusIsLoading}
            pagination={false}
          ></CustomTable>
        </CustomCol>
        <CustomCol xs={24}>
          <CustomModal
            title={"Montos cobrados"}
            visible={isVisible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            cancelButtonProps={{ hidden: true }}
          >
            <CustomRow>
              <CustomCol xs={24}>
                <CustomTable
                  pagination={false}
                  columns={columnsView}
                  dataSource={addPropertyKey(data)}
                />
              </CustomCol>
            </CustomRow>
          </CustomModal>
        </CustomCol>
        <CustomCol xs={24}>
          <CustomModal
            title={"Imprimir"}
            visible={isPrintModalVisible}
            onOk={() => setPrintModal(false)}
            onCancel={() => setPrintModal(false)}
            cancelButtonProps={{ hidden: true }}
          >
            <CustomRow>
              <CustomCol xs={24}>
                {payrollRecord.length && (
                  <HtmlToPrint
                    data={payrollRecord[0].payroll_record_detail || []}
                  />
                )}
              </CustomCol>
            </CustomRow>
          </CustomModal>
        </CustomCol>
      </CustomRow>
    </CustomLayoutBoxShadow>
  );
};

export default EasterBonusPayment;
