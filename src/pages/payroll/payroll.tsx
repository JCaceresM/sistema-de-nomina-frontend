/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DeleteTwoTone,
  EditTwoTone,
  PlusCircleTwoTone,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDepartment } from "../../actions/department/department.actions";
import { getEmployee } from "../../actions/employee/employee.actions";
import { getAllPayroll } from "../../actions/payroll/payroll.actions";
import {
  CustomButton,
  CustomCol,
  CustomContent,
  CustomRow,
  CustomTable,
  CustomText,
  CustomTitle,
  CustomTooltip,
} from "../../common/components";
import CustomLayoutBoxShadow from "../../common/components/CustomLayoutBoxShadow";
import CustomPopConfirm from "../../common/components/CustomPopConfirm";
import { getDateAsSpanishShortDate } from "../../common/utils/date/date.helpers";
import { addPropertyKey } from "../../common/utils/json/mutate-json";
import { currencyLocale } from "../../common/utils/locale/locale.format.utils";
import { getTablePagination } from "../../common/utils/table/paginate";
import { state } from "../../common/utils/table/transform.utils";
import { RootState } from "../../reducers/root_reducers";
import CreatEditPayroll from "./create-edit-payroll";

const Payroll = (): ReactElement => {
  const dispatch = useDispatch();
  const [createEditIsVisible, setCreateEditIsVisible] = useState(false);
  const { payroll, getPayrollIsLoading: isLoading } = useSelector(
    (state: RootState) => state.payroll
  );
  const columns = [
    {
      key: 4,
      title: "id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Presupuesto",
      dataIndex: "budget",
      render: (value: number) => currencyLocale(value),
    },
    {
      title: "Estado",
      dataIndex: "status",
      render: (value: string) => state[value],
    },
    {
      title: "Fecha Creación",
      dataIndex: "created_at",
      render: (value: Date) => getDateAsSpanishShortDate(value).date,
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
                // onClick={() => dispatch(getAllDepartment())}
              />
            </CustomTooltip>
          </CustomCol>
        </CustomRow>
      ),
      width: "15%",
      render: () => {
        return (
          <CustomRow justify={"center"}>
            <CustomCol xs={4}>
              <CustomTooltip
                placement={"bottom"}
                title={"Agregar empleados a la nomina"}
              >
                <CustomButton type={"link"} icon={<PlusCircleTwoTone />} />
              </CustomTooltip>
            </CustomCol>
            <CustomCol xs={4}>
              {" "}
              <CustomPopConfirm
                title={"Editar"}
                onConfirm={() => {
                  // dispatch(disableShift(record.IDAPERTURATURNO))
                }}
              >
                <CustomTooltip placement={"bottom"} title={"Editar"}>
                  <CustomButton type={"link"} icon={<EditTwoTone />} />
                </CustomTooltip>
              </CustomPopConfirm>
            </CustomCol>
            <CustomCol xs={4}>
              {" "}
              <CustomPopConfirm
                title={"¿Eliminar turno?"}
                onConfirm={() => {
                  // dispatch(disableShift(record.IDAPERTURATURNO))
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
  useEffect(() => {
    dispatch(getAllPayroll());
  }, []);
  const hideCreateEditModal = () => {
    setCreateEditIsVisible(false);
  };
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
                icon={<PlusOutlined />}
                onClick={() => setCreateEditIsVisible(true)}
              ></CustomButton>
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
            dataSource={addPropertyKey(payroll)}
            columns={columns}
            loading={isLoading}
            // pagination={{
            //   ...getTablePagination(employeesMetadata),
            //   defaultPageSize: 10,
            //   showSizeChanger: true,
            //   showQuickJumper: true,
            // }}
          ></CustomTable>
        </CustomCol>
        <CustomCol xs={24}>
          <CreatEditPayroll
            hideModal={hideCreateEditModal}
            visible={createEditIsVisible}
            width={"50%"}
          />
        </CustomCol>
      </CustomRow>
    </CustomLayoutBoxShadow>
  );
};
export default Payroll;
