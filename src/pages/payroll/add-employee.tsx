import React, { Select } from "antd";
import { ColumnsType } from "antd/lib/table";
import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EmployeeType,
  getEmployee,
} from "../../actions/employee/employee.actions";
import {
  PayrollType,
  updatePayrollEmployees,
} from "../../actions/payroll/payroll.actions";
import {
  CustomCol,
  CustomContent,
  CustomFormItem,
  CustomModal,
  CustomRow,
  CustomTable,
} from "../../common/components";
import { CustomModalConfirmation } from "../../common/components/ConfirmModalMethod";
import { PropsType } from "../../common/types/modal.type";
import { addPropertyKey } from "../../common/utils";
import { currencyLocale } from "../../common/utils/locale/locale.format.utils";
import { RootState } from "../../reducers/root_reducers";

const AddEmployee = ({
  payrollSelected,
  visible,
  hideModal,
}: PropsType & { payrollSelected: PayrollType | undefined }): ReactElement => {
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
      dataIndex: "status",
    },
    {
      title: "Salario",
      dataIndex: "salary",
      render: (value: number) => currencyLocale(value),
      ellipsis: true,
      //   align: "right",
    },
  ];
  const dispatch = useDispatch();
  const { employees, getEmployeesIsLoading: isLoading } = useSelector(
    (state: RootState) => state.employee
  );
  const { isPatched, updatePayrollIsloading } = useSelector(
    (state: RootState) => state.payroll
  );
  const [employeesSelected, setEmployeesSelected] = useState<EmployeeType[]>(
    []
  );

  const { Option } = Select;
  const cancelPayment = () => {
    CustomModalConfirmation({
      content: "¿Seguro que desea cancelar la operación?",
      onOk: () => {
        hideModal();
        setEmployeesSelected([]);
      },
    });
  };
  const handleSubmit = async () => {
    if (employeesSelected.length && typeof payrollSelected?.id === "number") {
      dispatch(
        updatePayrollEmployees(
          payrollSelected.id,
          employeesSelected.map((item) => ({ employee_id: item.id }))
        )
      );
    }
  };
  useEffect(() => {
    const conditions = [
      {
        field: "payroll_id",
        operator: "IS NULL",
        condition: "",
      },
    ];
    visible &&
      dispatch(
        getEmployee({
          pagination: { take: 10, skip: 1 },
          searchConditions: conditions,
        })
      );
  }, [visible]);
  useEffect(() => {
    if (isPatched) {
      hideModal();
      setEmployeesSelected([]);
    }
  }, [isPatched]);
  return (
    <CustomModal
      title={"Agregar Empleados a Nomina"}
      onCancel={cancelPayment}
      visible={visible}
      width={"60%"}
      confirmLoading={updatePayrollIsloading}
      closable={!updatePayrollIsloading}
      maskClosable={!updatePayrollIsloading}
      // cancelButtonProps={{ disabled: createPayrollIsLoading }}
      okButtonProps={{ disabled: updatePayrollIsloading }}
      onOk={handleSubmit}
    >
      <CustomContent>
        <CustomRow>
          <CustomCol xs={12}>
            {" "}
            <CustomFormItem label={"Empleados"}>
              <Select
                onChange={(_, option) => {
                  setEmployeesSelected([
                    ...employeesSelected,
                    (option as Record<string, EmployeeType>).data,
                  ]);
                }}
                placeholder={"Seleccione empleado"}
              >
                {employees.map((item, ind) => (
                  <Option key={ind} value={item.id} data={item}>
                    {item.first_name + " " + item.last_name}
                  </Option>
                ))}
              </Select>
            </CustomFormItem>
          </CustomCol>
          <CustomCol xs={24}>
            <CustomTable
              dataSource={addPropertyKey(employeesSelected)}
              columns={columns}
              loading={isLoading}
              pagination={false}
              scroll={{ y: 350 }}
            ></CustomTable>
          </CustomCol>
        </CustomRow>
      </CustomContent>
    </CustomModal>
  );
};

export default AddEmployee;
