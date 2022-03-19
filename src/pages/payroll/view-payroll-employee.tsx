/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "antd";
import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EmployeeType,
  getEmployee,
} from "../../actions/employee/employee.actions";
import {
  DeleteTwoTone,
  EditTwoTone,
  EyeTwoTone,
  PlusCircleTwoTone,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  getAllPayroll,
  PayrollType,
} from "../../actions/payroll/payroll.actions";
import {
  CustomButton,
  CustomCol,
  CustomContent,
  CustomModal,
  CustomRow,
  CustomTable,
  CustomText,
  CustomTooltip,
} from "../../common/components";
import { CustomModalConfirmation } from "../../common/components/ConfirmModalMethod";
import CustomPopConfirm from "../../common/components/CustomPopConfirm";
import { PropsType } from "../../common/types/modal.type";
import { addPropertyKey, getTablePagination } from "../../common/utils";
import { RootState } from "../../reducers/root_reducers";
import { currencyLocale } from "../../common/utils/locale/locale.format.utils";
import { ColumnsType } from "antd/lib/table";
import { state } from "../../common/utils/table/transform.utils";

const ViewPayrollEmployee = ({
  visible,
  hideModal,
  payrollId,
}: PropsType & { payrollId: number | undefined }): ReactElement => {
  const dispatch = useDispatch();
  const {
    employees,
    employeesMetadata,
    getEmployeesIsLoading: isLoading,
  } = useSelector((state: RootState) => state.employee);
  const [employeesSelected, setEmployeesSelected] = useState<EmployeeType[]>(
    []
  );
  const columns: ColumnsType<EmployeeType> = [
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
      title: "Estado",
      dataIndex: "status",      render: (value: string) => state[value],

    },
    {
      title: "Salario",
      dataIndex: "salary",
      render: (value: number) => currencyLocale(value),
      ellipsis: true,
    },
    {
      title: (
        <CustomRow justify={"center"}>
          <CustomCol xs={18}>
            <CustomText>Operaciones</CustomText>
          </CustomCol>
          <CustomCol style={{ textAlign: "center" }} xs={6}>
            <CustomTooltip title={"Refrescar"}>
              <CustomButton
                icon={<ReloadOutlined size={10} />}
                onClick={() => searchEmployee()}
              />
            </CustomTooltip>
          </CustomCol>
        </CustomRow>
      ),
      width: "15%",
      render: (record: EmployeeType) => {
        return (
          <CustomRow justify={"center"}>
            <CustomCol xs={4}>
              {" "}
              <CustomPopConfirm
                title={"¿Eliminar turno?"}
                onConfirm={() => {
                  setEmployeesSelected(
                    employeesSelected.filter((item) => item.id !== record.id)
                  );
                }}
              >
                <CustomTooltip placement={"bottom"} title={"Editar"}>
                  <CustomButton
                    type={"link"}
                    icon={<DeleteTwoTone twoToneColor={"red"} />}
                  />
                </CustomTooltip>
              </CustomPopConfirm>
            </CustomCol>
          </CustomRow>
        );
      },
    },
  ];
  const cancelPayment = () => {
    hideModal();
    setEmployeesSelected([]);
  };
  const searchEmployee = () => {
    const conditions = [
      {
        field: "payroll_id",
        operator: "=",
        condition: parseInt(`${payrollId}`),
      },
    ];
    visible &&
      payrollId &&
      dispatch(
        getEmployee({
          pagination: { take: 10, skip: 1 },
          searchConditions: conditions,
        })
      );
  };
  useEffect(() => {
    searchEmployee();
  }, [visible]);
  useEffect(() => {
    employees.length && setEmployeesSelected(employees);
  }, [employees]);
  return (
    <CustomModal
      title={"Empleados de la Nomina"}
      onCancel={cancelPayment}
      visible={visible}
      width={"60%"}
      destroyOnClose
      cancelText
      // confirmLoading={createPayrollIsLoading}
      // closable={!createPayrollIsLoading}
      // maskClosable={!createPayrollIsLoading}
      // cancelButtonProps={{ disabled: createPayrollIsLoading }}
      // okButtonProps={{ disabled: createPayrollIsLoading }}
      onOk={cancelPayment}
    >
      <CustomContent>
        <CustomRow>
          <CustomCol xs={24}>
            <CustomTable
              dataSource={addPropertyKey(employeesSelected)}
              columns={columns}
              loading={isLoading}
              pagination={{
                ...getTablePagination(employeesMetadata),
                defaultPageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
              }}
            ></CustomTable>
          </CustomCol>
        </CustomRow>
      </CustomContent>
    </CustomModal>
  );
};

export default ViewPayrollEmployee;
