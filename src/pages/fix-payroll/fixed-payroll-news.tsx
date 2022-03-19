import React, { ReactElement, useEffect, useState } from "react";
import { EyeTwoTone, PlusCircleOutlined } from "@ant-design/icons";

import {
  CustomButton,
  CustomCol,
  CustomContent,
  CustomModal,
  CustomRow,
  CustomTable,
  CustomTitle,
  CustomTooltip,
} from "../../common/components";
import CustomLayoutBoxShadow from "../../common/components/CustomLayoutBoxShadow";
import FixPayrollCreatEditNews from "./fix-payroll-create-edit-news";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers/root_reducers";
import { addPropertyKey } from "../../common/utils";
import { currencyLocale } from "../../common/utils/locale/locale.format.utils";
import {
  EmployeeType,
  getEmployee,
} from "../../actions/employee/employee.actions";
import { getPayrollNewsEmployee } from "../../actions/payroll-news/payroll-news.actions";
import { PropsType } from "../../common/types/modal.type";
import { state } from "../../common/utils/table/transform.utils";

const FixPayrollNews = (): ReactElement => {
  const dispatch = useDispatch();
  const [createEditIsVisible, setCreateEditIsVisible] = useState(false);
  const [viewIsVisible, setViewIsVisible] = useState(false);
  const [employeeSelected, setEmployeeSelected] = useState<EmployeeType>();
  const hideModal = () => setCreateEditIsVisible(false);
  const hideViewModal = () => setViewIsVisible(false);
  const { employees } = useSelector((state: RootState) => state.employee);
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
      dataIndex: "status",      render: (value: string) => state[value],

    },
    {
      title: "Estado",
      dataIndex: "salary",
      render: (value: number) => currencyLocale(value),
    },
    {
      title: "Operaciones",
      width: "15%",
      render: (record: EmployeeType) => {
        return (
          <CustomRow justify={"center"}>
            <CustomCol xs={8}>
              {" "}
              <CustomTooltip placement={"bottom"} title={"agregar novedad"}>
                <CustomButton
                  onClick={() => {
                    setCreateEditIsVisible(true);
                    setEmployeeSelected(record);
                    getPayrollNewsEmployee;
                  }}
                  type={"link"}
                  icon={<PlusCircleOutlined />}
                />
              </CustomTooltip>
            </CustomCol>
            <CustomCol xs={8}>
              {" "}
              <CustomTooltip placement={"bottom"} title={"Gestionar Novedad"}>
                <CustomButton
                  onClick={() => {
                    setViewIsVisible(true);
                    // setEmployeeSelected(record);
                    dispatch(getPayrollNewsEmployee(record.id));
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
  useEffect(() => {
    const searchConditions = [
      {
        field: "type",
        operator: "=",
        condition: "F",
      },
    ];
    dispatch(
      getEmployee({ searchConditions, pagination: { skip: 0, take: 150 } })
    );
  }, []);

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
          ></CustomTable>
        </CustomCol>
        <CustomCol xs={24}>
          <FixPayrollCreatEditNews
            width={"50%"}
            hideModal={hideModal}
            visible={createEditIsVisible}
            employeeSelected={employeeSelected}
          />
        </CustomCol>
        <CustomCol xs={24}>
          <ViewEmployeePayrollNews
            width={"50%"}
            hideModal={hideViewModal}
            visible={viewIsVisible}
          />
        </CustomCol>
      </CustomRow>
    </CustomLayoutBoxShadow>
  );
};

const ViewEmployeePayrollNews = ({
  visible,
  hideModal,
}: PropsType ): ReactElement => {
  const { payrollNewsEmployee } = useSelector((state: RootState) => state.payrollNews);
  const columns = [
    {
      title: "código",
      dataIndex: "id",
    },
    {
      title: "Nombre",
      dataIndex: "Name",
    },
    {
      title: "Accion",
      dataIndex: "operation",
    },
    {
      title: "Descripcion",
      dataIndex: "description",
    },
    {
      title: "Monto",
      dataIndex: "amount",
      render: (value: number) => currencyLocale(value),
    },
    {
      title: "Activo",
      dataIndex: "status",      render: (value: string) => state[value],

    },
   
  ];
  const onCancel = () => {
   
        hideModal();
   
  };
  return (
    <CustomModal
      title={"Modal"}
      visible={visible}
      width={"60%"}
      cancelText
      maskClosable
      onCancel={onCancel}
      onOk={onCancel}
    >
      <CustomContent>
        <CustomRow>
          <CustomCol xs={24}>
            <CustomTable columns={columns} dataSource={addPropertyKey(payrollNewsEmployee)}/>
          </CustomCol>
        </CustomRow>
      </CustomContent>
    </CustomModal>
  );
};
export default FixPayrollNews;
