import React, { ReactElement, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { EmployeeType, getEmployee } from "../../actions/employee/employee.actions"
import {
  CustomButton,
  CustomCol,
  CustomForm,
  CustomFormItem,
  CustomRow,
  CustomSelect,
  CustomTable,
} from "../../common/components"
import CustomLayoutBoxShadow from "../../common/components/CustomLayoutBoxShadow"
import { addPropertyKey } from "../../common/utils/json/mutate-json"
import { getTablePagination } from "../../common/utils/table/paginate"
import { state } from "../../common/utils/table/transform.utils"
import { RootState } from "../../reducers/root_reducers"
import ReactExport from "react-export-excel";
import { PayrollRecordDetailType } from "../../actions/payroll record/payroll-record.actions"
import {
  ExportOutlined,
  SearchOutlined
} from "@ant-design/icons";
import { currencyLocale } from "../../common/utils/locale/locale.format.utils"
import { formItemLayout, validateMessages } from "../../common/utils/forms/validations"
import { Select } from "antd"
import { DepartmentType, getAllDepartment } from "../../actions/department/department.actions"
import { SelectConditionType } from "../../common/types/general.type"
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ReportsEmployees = (): ReactElement => {
  const dispatch = useDispatch()
  const { employees, employeesMetadata, getEmployeesIsLoading: isLoading } = useSelector(
    (state: RootState) => state.employee
  )
  const [conditions, setConditions] = useState<SelectConditionType[]>([]); 

  const {departments } = useSelector(
    (state: RootState) => state.departments
  )
  const { Option } = Select;

  const columns = [
    {
      key: 4,
      title: "código",
      dataIndex: "id",
    },
    {
      title: "Name",
      render: (record: EmployeeType) => {
        const  name = `${record.first_name ? record.first_name:'-'  } ${record.last_name ? record.last_name:'-'}`
        return name
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

  ]
  useEffect(() => {
 
    dispatch(getAllDepartment())
  }, [])

  
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
                <CustomFormItem label={"Tipo de nomina"} name={"Nomina"}>
                  <CustomSelect
                    onChange={(e: string| number, ) => {
                      // eslint-disable-next-line no-console
                      // setPayrollSelected(data.data);
                      e !== 'T'&& setConditions((item) => [
                        ...item.filter((item) => item.field !== "type"),
                        { field: "type", operator: "=", condition: e },
                      ]);
                    }}
                    // loading={getPayrollIsLoading}
                    showSearch
                    // value={payrollSelected.id}
                    style={{ width: "80%" }}
                  >
                 <Option value={"F"}>Nomina Fija</Option>
                 <Option value={"O"}>Nomina Ocacional</Option>
                 <Option value={"S"}>Nomina Subvencional</Option>
                 <Option value={"P"}>Nomina Pencionados</Option>
                 <Option value={"T"}>Todas</Option>
                   
                  </CustomSelect>
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={6}>
                <CustomFormItem label={"Departamento"} name={"dep"}>
                  <CustomSelect
                    onChange={(e) => {
                      e!=='T'&& setConditions((item) => [
                        ...item.filter((item) => item.field !== "department_id"),
                        { field: "department_id", operator: "=", condition: e },
                      ]);
                    }}
                    // loading={getPayrollIsLoading}
                    style={{ width: "80%" }}
                  >
                   {departments.map((item: DepartmentType, ind: number) => (
                      <Option key={`${ind}`} value={item.id} data={item}>
                        {item.name}
                      </Option>
                    ))}
                    <Option value={"T"}>Todas</Option>
                  </CustomSelect>
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={6}>
                <CustomFormItem label={"Estado"} name={"Estado"}>
                  <CustomSelect
                    onChange={(e) => {
                      setConditions((item) => [
                        ...item.filter((item) => item.field !== "status"),
                        { field: "status", operator: "=", condition: e },
                      ]);
                    }}
                    // loading={getPayrollIsLoading}
                    style={{ width: "80%" }}
                  >
                    <Option value={"A"}>Activo</Option>
                    <Option value={"I"}>Inactivo</Option>
                  </CustomSelect>
                </CustomFormItem>
              </CustomCol>
            
              <CustomCol xs={4}>
                <CustomFormItem label={"Buscar"}>
                  <CustomButton
                    icon={<SearchOutlined />}
                    onClick={() => {
                      dispatch(getEmployee({pagination:{ skip: 0, take: 15 }, searchConditions: conditions}))
                    }}
                  />
                </CustomFormItem>
              </CustomCol>

              <CustomCol xs={2}>
              <Download record={employees} />
              </CustomCol>
            </CustomRow>
          </CustomForm>
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
          />
        </CustomCol>
      </CustomRow>
      
    </CustomLayoutBoxShadow>
  )
}
const Download = ({ record }: { record: EmployeeType[] }) => {
  return (
    <ExcelFile
      name={`Employees- (${new Date()})`}
      element={<CustomButton icon={<ExportOutlined />} />}
    >
      <ExcelSheet data={record || []} name={`Nomina`}>
        <ExcelColumn label="Nombre" value="first_name" />
        <ExcelColumn label="Apellido" value="last_name" />
        <ExcelColumn label="Cedula" value="document_id" />
        <ExcelColumn label="Genero" value="gender" />
        <ExcelColumn label="Departamento" value="department" />
        <ExcelColumn
          label="salario"
          value={(col: PayrollRecordDetailType) =>
            currencyLocale(
             col.salary
            )
          }
        />
      </ExcelSheet>
    </ExcelFile>
  );
};
export default ReportsEmployees
