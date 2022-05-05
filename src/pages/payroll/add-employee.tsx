/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Form, Select } from "antd";
import { ColumnsType } from "antd/lib/table";
import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDeparmentPayroll,
  departmentManagerReduxState,
  DepartmentType,
  getDeparmentInPayroll,
  getDeparmentNotInPayroll,
} from "../../actions/department/department.actions";
import {
  EmployeeType,
  getEmployee,
} from "../../actions/employee/employee.actions";
import { CheckSquareOutlined, DeleteTwoTone } from "@ant-design/icons";
import {
  createPayroll,
  payrollManagerReduxState,
  PayrollType,
  updatePayrollEmployees,
} from "../../actions/payroll/payroll.actions";
import {
  CustomButton,
  CustomCol,
  CustomContent,
  CustomForm,
  CustomFormItem,
  CustomModal,
  CustomRow,
  CustomSelect,
  CustomTable,
  CustomText,
  CustomTooltip,
} from "../../common/components";
import { CustomModalConfirmation } from "../../common/components/ConfirmModalMethod";
import CustomPopConfirm from "../../common/components/CustomPopConfirm";
import { PropsType } from "../../common/types/modal.type";
import { addPropertyKey } from "../../common/utils";
import { state } from "../../common/utils/table/transform.utils";
import { RootState } from "../../reducers/root_reducers";
import { format } from "path";

const AddEmployee = ({
  payrollSelected,
  visible,
  hideModal,
}: PropsType & { payrollSelected: PayrollType | undefined }): ReactElement => {
  const columns = [
    {
      key: 4,
      title: "id",
      dataIndex: "id",
      width: "25%",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "25%",
    },
    {
      title: "Estado",
      dataIndex: "status",
      width: "25%",

      render: (value: string) => state[value],
    },
    {
      title: <CustomText>Operaciones</CustomText>,
      ellipsis: true,
      width: "25%",
      render: (record: DepartmentType) => {
        return (
          <CustomRow justify={"center"}>
            <CustomCol xs={4}>
              {" "}
              <CustomPopConfirm
                title={"Quitar de la Nomina?"}
                onConfirm={() => {
                  dispatch(
                    deleteDeparmentPayroll({
                      payrollId: payrollSelected?.id as number,
                      departmentId: record.id as unknown as number,
                    })
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
  const {
    departmentsNotInPayroll,
    departmentsInPayroll,
    getDepartmentNotInPayrollIsLoading,
    isDeparmentPayrollDeleted,
    deleteDeparmentPayrollIsLoading,
  } = useSelector((state: RootState) => state.departments);
  const dispatch = useDispatch();

  const { isPayrollCreated, createPayrollIsLoading } = useSelector(
    (state: RootState) => state.payroll
  );
  const [form] = Form.useForm();

  const [deparmentsSelected, setDeparmentSelected] = useState<DepartmentType>(
    {} as DepartmentType
  );

  const { Option } = Select;
  const cancelPayment = () => {
    CustomModalConfirmation({
      content: "¿Seguro que desea cancelar la operación?",
      onOk: () => {
        hideModal();
        setDeparmentSelected({} as DepartmentType);
      },
    });
  };
  // const handleSubmit = async () => {
  //   if (employeesSelected.length && typeof payrollSelected?.id === "number") {
  //     dispatch(
  //       updatePayrollEmployees(
  //         payrollSelected.id,
  //         employeesSelected.map((item) => ({
  //           id: item.id,
  //           company_id: getSessionInfo().businessId,
  //           user_insert: getSessionInfo().username,
  //         }))
  //       )
  //     );
  //   }
  // };

  useEffect(() => {
    visible &&
      dispatch(
        getDeparmentInPayroll({
          searchConditions: [
            {
              field: "payrollId",
              condition: payrollSelected?.id as number,
              operator: "=",
            },
          ],
        })
      );
    visible && dispatch(getDeparmentNotInPayroll({}));
  }, [visible]);
  useEffect(() => {
    if (visible && isPayrollCreated) {
      dispatch(
        getDeparmentInPayroll({
          searchConditions: [
            {
              field: "payrollId",
              condition: payrollSelected?.id as number,
              operator: "=",
            },
          ],
        })
      );
      dispatch(getDeparmentNotInPayroll({}));
      dispatch(payrollManagerReduxState({ isPayrollCreated: false }));
    }
  }, [isPayrollCreated]);
  useEffect(() => {
    if (visible && isDeparmentPayrollDeleted) {
      dispatch(
        getDeparmentInPayroll({
          searchConditions: [
            {
              field: "payrollId",
              condition: payrollSelected?.id as number,
              operator: "=",
            },
          ],
        })
      );
      dispatch(getDeparmentNotInPayroll({}));
      dispatch(
        departmentManagerReduxState({ isDeparmentPayrollDeleted: false })
      );
    }
  }, [isDeparmentPayrollDeleted]);
  return (
    <CustomModal
      title={"Agregar Departamentos a Nomina"}
      onCancel={cancelPayment}
      visible={visible}
      width={"60%"}
      confirmLoading={createPayrollIsLoading || deleteDeparmentPayrollIsLoading}
      closable={!createPayrollIsLoading || !deleteDeparmentPayrollIsLoading}
      maskClosable={!createPayrollIsLoading || !deleteDeparmentPayrollIsLoading}
      // cancelButtonProps={{ disabled: createPayrollIsLoading }}
      okButtonProps={{
        disabled: createPayrollIsLoading || deleteDeparmentPayrollIsLoading,
      }}
      // onOk={handleSubmit}
    >
      <CustomContent>
        <CustomForm form={form}>
          <CustomRow>
            <CustomCol xs={20}>
              <CustomFormItem
                required
                rules={[{ required: true }]}
                label={"Departamento"}
                name={"Departamento"}
              >
                <CustomSelect
                  style={{ width: "100%" }}
                  loading={getDepartmentNotInPayrollIsLoading}
                  placeholder={"Seleccione el departamento"}
                  onSelect={(_: any, e: Record<string, DepartmentType>) => {
                    setDeparmentSelected(e?.data);
                  }}
                >
                  {departmentsNotInPayroll.map((dep: DepartmentType, ind) => (
                    <Option key={`${ind}`} value={dep.id} data={dep}>
                      {dep.name}
                    </Option>
                  ))}
                </CustomSelect>
              </CustomFormItem>
            </CustomCol>
            <CustomCol xs={4}>
              <CustomTooltip title={"Agregar departamento a nomina"}>
                <CustomButton
                  disabled={deparmentsSelected?.id == undefined}
                  icon={<CheckSquareOutlined />}
                  onClick={() =>
                  {  dispatch(
                      createPayroll({
                        id: payrollSelected?.id as number,
                        deparments: [deparmentsSelected],
                      } as PayrollType)
                    )
                  form.resetFields()
                  }
                  }
                ></CustomButton>
              </CustomTooltip>
            </CustomCol>
            <CustomCol xs={24}>
              <CustomTable
                dataSource={addPropertyKey(departmentsInPayroll)}
                columns={columns}
                pagination={false}
                scroll={{ y: 350 }}
              ></CustomTable>
            </CustomCol>
          </CustomRow>
        </CustomForm>{" "}
      </CustomContent>
    </CustomModal>
  );
};

export default AddEmployee;
