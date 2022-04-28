import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons"
import React, { ReactElement, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { EmployeeType, getEmployee } from "../../actions/employee/employee.actions"
import {
  CustomButton,
  CustomCol,
  CustomRow,
  CustomTable,
  CustomTitle,
  CustomTooltip,
} from "../../common/components"
import CustomLayoutBoxShadow from "../../common/components/CustomLayoutBoxShadow"
import CustomPopConfirm from "../../common/components/CustomPopConfirm"
import { addPropertyKey } from "../../common/utils/json/mutate-json"
import { getTablePagination } from "../../common/utils/table/paginate"
import { state } from "../../common/utils/table/transform.utils"
import { RootState } from "../../reducers/root_reducers"
import CreatEditEmployee from "./create-edit-employee"

const EmployeeConsulting = (): ReactElement => {
  const dispatch = useDispatch()
  const [createEditIsVisible, setCreateEditIsVisible] = useState(false)
  const { employees, employeesMetadata, getEmployeesIsLoading: isLoading } = useSelector(
    (state: RootState) => state.employee
  )
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
    {
      title: "Operaciones",
      width: "15%",
      render: () => {
        return (
          <CustomRow justify={"center"}>
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
        )
      },
    },
  ]
  useEffect(() => {
 
    dispatch(getEmployee({pagination:{ skip: 0, take: 15 }}))
  }, [])
  const hideCreateEditModal = () => {
    setCreateEditIsVisible(false)
  }
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
    )
  }
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
        <CustomCol xs ={24}>
        <CreatEditEmployee
        hideModal={hideCreateEditModal}
        visible={createEditIsVisible}
        width={'50%'}
      />
        </CustomCol>
      </CustomRow>
      
    </CustomLayoutBoxShadow>
  )
}
export default EmployeeConsulting
