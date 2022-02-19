import { Form, Select, Table } from "antd"
import { ColumnsType, TableRowSelection } from "antd/lib/table/interface"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  employeeManagerReduxState,
  EmployeeType,
  getEmployee,
} from "../../actions/employee/employee.actions"
import { PayrollNewsType } from "../../actions/payroll news/payroll-news.actions"
import {
  createPayrollRecord,
  payrollRecordManagerReduxState,
} from "../../actions/payroll record/payroll-record.actions"
import {
  getAllPayroll,
  PayrollType,
} from "../../actions/payroll/payroll.actions"
import {
  CustomButton,
  CustomCol,
  CustomDatePicker,
  CustomForm,
  CustomFormItem,
  CustomModal,
  CustomRow,
  CustomSelect,
  CustomTable,
  CustomText,
  CustomTitle,
} from "../../common/components"
import CustomLayoutBoxShadow from "../../common/components/CustomLayoutBoxShadow"
import { addPropertyKey, getSessionInfo } from "../../common/utils"
import { validateMessages } from "../../common/utils/forms/validations"
import { currencyLocale } from "../../common/utils/locale/locale.format.utils"
import {
  AFP,
  ISR,
  netEarnings,
  othersIncome,
  SFS,
  totalDiscount,
} from "../../common/utils/tax/index.helpers"
import { RootState } from "../../reducers/root_reducers"
const VerifyRegisterFixedPayroll = (): React.ReactElement => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [registerIsVisible, setRegisterIsVisible] = useState(false)
  const [payrollSelected, setPayrollSelected] = useState<PayrollType>(
    {} as PayrollType
  )
  const retentions: Record<string, PayrollNewsType> = {
    ISR: {
      id: 0,
      name: "ISR",
      operation: "RESTA",
      type: "P",
      amount: 0,
    },
    SFS: {
      id: 0,
      name: "SFS",
      operation: "RESTA",
      type: "P",
      amount: 0,
    },
    AFP: {
      id: 0,
      name: "AFP",
      operation: "RESTA",
      type: "P",
      amount: 0,
    },
  }
  const [discounts, setDiscounts] = useState<PayrollNewsType[]>([])
  const [employeeToRegister, setEmployeeToRegister] = useState<EmployeeType[]>(
    []
  )
  const [payrollDiscounts, setPayrollDiscounts] = useState<PayrollNewsType[]>(
    []
  )
  const [employeeNews, setEmployeeNews] = useState<PayrollNewsType[]>([])
  const [totals, setTotals] = useState<Record<string, number>>({})
  const { Option } = Select
  const {
    payroll: payrollState,
    employee: employeeState,
    payrollRecord: payrollRecordState,
  } = useSelector((state: RootState) => state)
  const { getPayrollIsLoading, payroll } = payrollState
  const { getEmployeesIsLoading, employees } = employeeState
  const { isPayrollRecordCreated } = payrollRecordState
  const columns: ColumnsType<EmployeeType> = [
    {
      key: 4,
      title: "código",
      dataIndex: "id",
    },
    {
      title: "Nombres y Apellidos",
      render: (record: EmployeeType) => {
        return record.first_name + " " + record.last_name || "-"
      },
      ellipsis: true,
    },

    {
      title: "Doc Identidad",
      dataIndex: "document_id",
      ellipsis: true,
    },
    {
      title: "Sueldo Bruto",
      dataIndex: "salary",
      render: (value: number) => currencyLocale(value),
      ellipsis: true,
      align: "right",
    },
    {
      title: "Descuentos",
      dataIndex: "Descuentos",
      render: (_: number, record: EmployeeType) =>
        currencyLocale(totalDiscount(record, payrollDiscounts)),
      ellipsis: true,
      align: "right",
    },
    {
      title: "Oros Ingresos",
      dataIndex: "Ingresos",
      render: (_: number, record: EmployeeType) =>
        currencyLocale(othersIncome(record, payrollDiscounts)),
      ellipsis: true,
      align: "right",
    },
    {
      title: "Sueldo Neto",
      dataIndex: "position",
      render: (_: number, record: EmployeeType) =>
        currencyLocale(netEarnings(record, payrollDiscounts)),
      ellipsis: true,
      align: "right",
    },
  ]
  const columnsDiscount = [
    {
      key: 4,
      title: "ID",
      dataIndex: "id",
      width: "12%",
      ellipsis: true,
    },
    {
      title: "Nombre",
      dataIndex: "name",

      ellipsis: true,
    },

    {
      title: "Operación",
      dataIndex: "operation",
      ellipsis: true,
    },

    {
      title: "Monto",
      dataIndex: "amount",
      render: (value: number) => currencyLocale(value),
      // ellipsis: true,
    },
  ]
  // rowSelection objects indicates the need for row selection
  const rowSelection: TableRowSelection<EmployeeType> = {
    onSelect: (record: EmployeeType) => {
      const discounts = [
        ...payrollDiscounts,
        { ...retentions.ISR, amount: ISR(record.salary) },
        { ...retentions.AFP, amount: AFP(record.salary) },
        { ...retentions.SFS, amount: SFS(record.salary) },
      ]
      setDiscounts(discounts)
      setEmployeeNews(record.payroll_news)
    },

    type: "radio",
  }
  const hideRegisterModal = () => {
    setRegisterIsVisible(false)
  }
  const searchEmployee = (record: PayrollType) => {
    setPayrollSelected(record)
    setPayrollDiscounts(record.payroll_news)
    setDiscounts(record.payroll_news)

    const condition = [
      {
        field: "payroll_id",
        operator: "=",
        condition: record.id,
      },
    ]
    dispatch(
      getEmployee({
        searchConditions: condition,
        pagination: { skip: 0, take: 155 },
      })
    )
  }
  const handleSubmit = async () => {
    // eslint-disable-next-line no-console
    const dataFields = await form.validateFields().catch((e) => e)
    if (!Object.getOwnPropertyDescriptor(dataFields, "errorFields")) {
      const payrollNewsPayrollSelected = payrollSelected?.payroll_news || []
      const data = {
        description: payrollSelected.description,
        type: payrollSelected.type,
        name: payrollSelected.name,

        payroll_id: payrollSelected.id,
        registered_at: dataFields.registered_at,
        user_id: getSessionInfo().userId,
        company_id: getSessionInfo().businessId,
        employees: employeeToRegister.map((employee) => {
          const payrollNewsCurrentEmployee = employee?.payroll_news || []
          return {
            salary: employee.salary,
      
            employee_id: employee.id,
            company_id: getSessionInfo().businessId,
          
            payroll_news: [
              ...payrollNewsPayrollSelected.map((item) => ({
                amount: item.amount,
                description: item.description,
                type: item.type,
                name: item.name,
                operation: item.operation,
              })),
              ...payrollNewsCurrentEmployee.map((item) => ({
                amount: item.amount,
                description: item.description,
                type: item.type,
                name: item.name,
                operation: item.operation,
              })),
            ],
          }
        }),
      }
      // eslint-disable-next-line no-console
      console.log(data)
      dispatch(createPayrollRecord(data))
    }
  }
  useEffect(() => {
    
    const condition = [
      {
        field: "type",
        operator: "=",
        condition: `F`,
      },
    ]
    dispatch(getAllPayroll(condition))
  }, [])
  useEffect(() => {
    const salaries = employeeToRegister.reduce(
      (acc, employee) => acc + employee.salary,
      0
    )
    const discounts = employeeToRegister.reduce(
      (acc, employee) => acc + totalDiscount(employee, payrollDiscounts),
      0
    )
    const income = employeeToRegister.reduce(
      (acc, employee) => acc + othersIncome(employee, payrollDiscounts),
      0
    )
    const earnings = employeeToRegister.reduce(
      (acc, employee) => acc + netEarnings(employee, payrollDiscounts),
      0
    )
    setTotals({ salaries, discounts, income, earnings })
  }, [employeeToRegister])
  useEffect(() => {
    setEmployeeToRegister(employees)
  }, [employees])
  useEffect(() => {
    if (isPayrollRecordCreated) {
      form.resetFields()
      isPayrollRecordCreated && hideRegisterModal()
      dispatch(
        payrollRecordManagerReduxState({ isPayrollRecordCreated: false })
      )
      dispatch(employeeManagerReduxState({ employees: [] }))
      setTotals({})
      setEmployeeNews([])
      setPayrollDiscounts([])
      setEmployeeToRegister([])
      setPayrollSelected({} as PayrollType)
      setDiscounts([])
    }
  }, [isPayrollRecordCreated])

  const Title = () => {
    return (
      <CustomRow>
        <CustomCol xs={10}>
          <CustomTitle level={3}>Consulta</CustomTitle>
        </CustomCol>
        <CustomCol xs={14}>
          <CustomRow justify={"end"}>
            <CustomFormItem noStyle>
              <CustomSelect
                onChange={(_, e) =>
                  searchEmployee((e as unknown as { data: PayrollType }).data)
                }
                loading={getPayrollIsLoading}
                showSearch
                value={payrollSelected.id}
                style={{ width: "80%" }}
              >
                {payroll.map((item: PayrollType, ind: number) => (
                  <Option key={`${ind}`} value={item.id} data={item}>
                    {item.name}
                  </Option>
                ))}
              </CustomSelect>
            </CustomFormItem>
          </CustomRow>
        </CustomCol>
      </CustomRow>
    )
  }
  const MenuOptions = () => {
    return (
      <CustomRow gutter={[16, 16]}>
        <CustomCol xs={6}>
          <CustomButton onClick={() => setRegisterIsVisible(true)}>
            Registrar
          </CustomButton>
        </CustomCol>
        <CustomCol xs={6} />
        <CustomCol xs={6} />
        <CustomCol xs={6} />
      </CustomRow>
    )
  }
  const summaryPaymentHistory = () => (
    <Table.Summary.Row>
      <Table.Summary.Cell colSpan={4} index={1} align={"right"}>
        <CustomText strong>Totales:</CustomText>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={2} align={"right"}>
        {currencyLocale(totals.salaries)}
      </Table.Summary.Cell>

      <Table.Summary.Cell index={4} align={"right"}>
        {currencyLocale(totals.discounts)}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={5} align={"right"}>
        {currencyLocale(totals.income)}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={5} align={"right"}>
        {currencyLocale(totals.earnings)}
      </Table.Summary.Cell>
    </Table.Summary.Row>
  )

  return (
    <CustomLayoutBoxShadow>
      <CustomRow gutter={[16, 16]}>
        <CustomCol xs={24}>
          <MenuOptions />
        </CustomCol>
        <CustomCol xs={24}>
          <Title />
        </CustomCol>
        <CustomCol xs={24}>
          <CustomTable
            loading={getEmployeesIsLoading}
            dataSource={addPropertyKey(employeeToRegister)}
            columns={columns}
            summary={summaryPaymentHistory}
            rowSelection={{ ...rowSelection }}
            pagination={false}
          />
        </CustomCol>
        <CustomCol style={{ minHeight: 222 }} xs={12}>
          {" "}
          <CustomRow align="top">
            <CustomCol xs={24}>
              <CustomTitle level={5}>
                Ingresos / Descuentos Por Empleado
              </CustomTitle>
            </CustomCol>
            <CustomCol xs={24}>
              <CustomTable
                dataSource={addPropertyKey(employeeNews)}
                columns={columnsDiscount}
                pagination={false}
              />
            </CustomCol>
          </CustomRow>
        </CustomCol>
        <CustomCol style={{ minHeight: 222 }} xs={12}>
          <CustomRow align="top">
            <CustomCol xs={24}>
              <CustomTitle level={5}>Descuentos Fijo</CustomTitle>
            </CustomCol>
            <CustomCol xs={24}>
              <CustomTable
                dataSource={addPropertyKey(discounts)}
                columns={columnsDiscount}
                // loading={isLoading}
                pagination={false}
                // style={{ justifyContent: "initial" }}
                scroll={{ y: 300 }}
                //   ...getTablePagination(employeesMetadata),
                //   defaultPageSize: 10,
                //   showSizeChanger: true,
                //   showQuickJumper: true,
                // }}
              />
            </CustomCol>
          </CustomRow>
        </CustomCol>

        <CustomCol xs={24}>
          <CustomModal
            title={"Registrar"}
            onCancel={hideRegisterModal}
            visible={registerIsVisible}
            width={"50%"}
            okText={"Registrar"}
            onOk={handleSubmit}
          >
            <CustomForm
              name={"employee"}
              validateMessages={validateMessages}
              form={form}
            >
              <CustomFormItem
                required
                rules={[{ required: true }]}
                name={"registered_at"}
                label={"Mes de nomina a registrar"}
              >
                <CustomDatePicker
                  style={{ width: "100%" }}
                  picker="month"
                  format={"DD-MM-YYYY"}
                />
              </CustomFormItem>
            </CustomForm>
          </CustomModal>
        </CustomCol>
      </CustomRow>
    </CustomLayoutBoxShadow>
  )
}

export default VerifyRegisterFixedPayroll