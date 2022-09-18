/* eslint-disable @typescript-eslint/no-unused-vars */
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  EmployeeType,
  getEmployee,
} from "../../actions/employee/employee.actions";
import { getAllPayroll } from "../../actions/payroll/payroll.actions";
import {
  CustomButton,
  CustomCol,
  CustomRow,
  CustomTable,
  CustomTitle,
  CustomTooltip,
} from "../../common/components";
import CustomLayoutBoxShadow from "../../common/components/CustomLayoutBoxShadow";
import CustomPopConfirm from "../../common/components/CustomPopConfirm";
import { addPropertyKey } from "../../common/utils/json/mutate-json";
import { getTablePagination } from "../../common/utils/table/paginate";
import { state } from "../../common/utils/table/transform.utils";
import { RootState } from "../../reducers/root_reducers";

const FixPayrollEmployeeConsulting = (): ReactElement => {
  const dispatch = useDispatch();
  const location = useLocation()
  const locationState = {...location.state as Record<string, string>} as {[key:string]: any}
  const {
    employees,
    employeesMetadata,
    getEmployeesIsLoading: isLoading,
  } = useSelector((state: RootState) => state.employee);

  const columns = [
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
      render: (value: string) => state[value],
    },

  ];
  useEffect(() => {
    const searchConditions = [
      {
        field: "TYPE",
        operator: "=",
        condition: locationState.type
      },
    ];
    dispatch(
      getEmployee({ searchConditions, pagination: { skip: 1, take: 100 } })
    );
  }, [location]);

 
  const Title = () => {
    return (
      <CustomRow>
        <CustomCol xs={24}>
          <CustomTitle level={3}>Consulta</CustomTitle>
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
            dataSource={addPropertyKey(employees)}
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
    </CustomLayoutBoxShadow>
  );
};
export default FixPayrollEmployeeConsulting;
