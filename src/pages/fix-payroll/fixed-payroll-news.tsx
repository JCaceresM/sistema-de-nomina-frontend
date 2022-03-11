import React, { ReactElement, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

import {
  CustomButton,
  CustomCol,
  CustomRow,
  CustomTable,
  CustomTitle,
  CustomTooltip,
} from "../../common/components";
import CustomLayoutBoxShadow from "../../common/components/CustomLayoutBoxShadow";
import FixPayrollCreatEditNews from "./fix-payroll-create-edit-news";
import { getPayrollnewsCollection } from "../../actions/payroll-news/payroll-news.actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers/root_reducers";
import { addPropertyKey } from "../../common/utils";
import { currencyLocale } from "../../common/utils/locale/locale.format.utils";
import { getAllPayroll } from "../../actions/payroll/payroll.actions";

const FixPayrollNews = (): ReactElement => {
  const dispatch = useDispatch();
  const [createEditIsVisible, setCreateEditIsVisible] = useState(false);
  const hideModal = () => setCreateEditIsVisible(false);
  const { PayrollNews } = useSelector((state: RootState) => state.payrollNews);
  const { payroll } = useSelector((state: RootState) => state.payroll);
  const columns = [
    {
      title: "código",
      dataIndex: "id",
    },
    {
      title: "Descripcion",
      dataIndex: "description",
    },
    {
      title: "Accion",
      dataIndex: "operation",
    },
    {
      title: "Tipo",
      dataIndex: "description",
    },
    {
      title: "Monto",
      dataIndex: "amount",
      render: (value: number) => currencyLocale(value),
    },
    {
      title: "Activo",
      dataIndex: "status",
    },
    {
      title: "Nomina",
      dataIndex: "payroll_id",
      render: (value: number) => {
        return payroll.find((item) => item.id == value)?.name || '--';
      },
    },
  ];
  useEffect(() => {
    dispatch(getPayrollnewsCollection());
  }, []);
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
        <CustomCol xs={24}>
          <FixPayrollCreatEditNews
            width={"50%"}
            hideModal={hideModal}
            visible={createEditIsVisible}
          />
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
            dataSource={addPropertyKey(PayrollNews)}
            columns={columns}
          ></CustomTable>
        </CustomCol>
      </CustomRow>
    </CustomLayoutBoxShadow>
  );
};
export default FixPayrollNews;
