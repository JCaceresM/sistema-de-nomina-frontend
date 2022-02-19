import React, { ReactElement } from "react"
import { CustomCol, CustomRow, CustomTable, CustomTitle } from "../../common/components"
import CustomLayoutBoxShadow from "../../common/components/CustomLayoutBoxShadow"

const FixedPayrollAuthorization = (): ReactElement => {
  const columns = [
    {
      title: "ID",
    },
    {
      title: "Nómina",
    },
    {
      title: "No. Comp.",
    },
    {
      title: "Estado",
    },
    {
      title: "Fecha",
    },
    {
      title: "# Emp",
    },
    {
      title: "Cuenta",
    },
  ]
  return (
    <CustomLayoutBoxShadow>
        <CustomRow>
            <CustomCol xs={24}><CustomTitle level={3}>Consulta</CustomTitle></CustomCol>
            <CustomCol xs={24}><CustomTable columns={columns}></CustomTable></CustomCol>
        </CustomRow>
      
    </CustomLayoutBoxShadow>
  )
}
export default FixedPayrollAuthorization
