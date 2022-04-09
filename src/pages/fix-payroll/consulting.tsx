/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPayroll, payrollManagerReduxState } from "../../actions/payroll/payroll.actions";
import {
  CustomButton,
  CustomCol,
  CustomModal,
  CustomRow,
  CustomTable,
  CustomTitle,
  CustomTooltip,
} from "../../common/components";
import CustomLayoutBoxShadow from "../../common/components/CustomLayoutBoxShadow";
import { addPropertyKey } from "../../common/utils";
import { state } from "../../common/utils/table/transform.utils";
import { RootState } from "../../reducers/root_reducers";
import { EyeTwoTone } from "@ant-design/icons";
import { PropsType } from "../../common/types/modal.type";
import {
  employeeManagerReduxState,
  EmployeeType,
  getEmployee,
} from "../../actions/employee/employee.actions";
import { getPayrollnewsCollection, payrollNewsManagerReduxState } from "../../actions/payroll-news/payroll-news.actions";
import { currencyLocale } from "../../common/utils/locale/locale.format.utils";
const Consulting = (): ReactElement => {
  const dispatch = useDispatch();
  const { payroll } = useSelector((state: RootState) => state.payroll);
  const [visible, setVisible] = useState(false);
  const [payrollSelected, setPayrollSelected] = useState<Record<string, any>>(
    {}
  );
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
      dataIndex: "num_employees",
    },
    {
      title: "Estado",
      dataIndex: "status",
      render: (value: string) => state[value],
    },
    {
      title: "Descripcion",
      render: (record: Record<string, any>) => {

        return record?.description;
      },
      ellipsis: true,
    },
    {
      title: "Departamento",
      render: (record: Record<string, any>) => {
        // eslint-disable-next-line no-console
        console.log(record.payroll_record_detail);

        return record?.department_name;
      },
      ellipsis: true,
    },
    {
      title: "Cuenta",
      dataIndex: "bank_account_name",
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
      getAllPayroll([
        {
          field: "type",
          operator: "=",
          condition: "F",
        },
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
            dataSource={addPropertyKey(payroll)}
            columns={columns}
          ></CustomTable>
        </CustomCol>
        <CustomCol xs={24}>
          <ViewModal
            visible={visible}
            hideModal={hideModal}
            payrollSelected={payrollSelected}
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
}: PropsType & { payrollSelected: Record<string, any> }): ReactElement => {
  const dispatch = useDispatch();
  const { employees } = useSelector((state: RootState) => state.employee);
  const { payrollNews } = useSelector((state: RootState) => state.payrollNews);
  const payrollNewsColumns = [
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
      ellipsis: true,
    },
    {
      title: "Monto",
      dataIndex: "amount",
      render: (value: number) => currencyLocale(value),
    },
    {
      title: "Activo",
      dataIndex: "status",
      render: (value: string) => state[value],

    },
  ];
  const employeeColumns = [
    {
      key: 4,
      title: "código",
      dataIndex: "id",
    },
    {
      title: "Name",
      render: (record: EmployeeType) => {
        const name = `${record.first_name ? record.first_name : "-"} ${
          record.last_name ? record.last_name : "-"
        }`;
        return name;
      },
    },
    {
      title: "Doc Id",
      dataIndex: "document_id",
    },
    {
      title: "Salario",
      dataIndex: "salary",
    },
  ];
  const beforeHideModal=()=>{
    hideModal()
    dispatch(employeeManagerReduxState({employees:[]}))
    dispatch(payrollNewsManagerReduxState({payrollNews:[]}))
  }
  useEffect(() => {
    if (payrollSelected.id && visible) {
      
    
    dispatch(
      getPayrollnewsCollection([
        {
          field: "payroll_id",
          operator: "=",
          condition: payrollSelected.id,
        },
      ])
    );
    dispatch(
      getEmployee({
        pagination: { take: 10, skip: 0 },
        searchConditions: [
          {
            field: "type",
            operator: "=",
            condition: "F",
          },
          {
            field: "payroll_id",
            operator: "=",
            condition: payrollSelected.id,
          },
        ],
      })
    );}
  }, [visible]);
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
          <CustomTable title={()=>'Empleados'} pagination={false} scroll={{y:400}}  columns={employeeColumns} dataSource={employees} />
        </CustomCol>
        <CustomCol xs={24}>
          <CustomTable title={()=>'Descuentos'} pagination={false} scroll={{y:400}} columns={payrollNewsColumns} dataSource={payrollNews} />
        </CustomCol>
       
      </CustomRow>
    </CustomModal>
  );
};
export default Consulting;
