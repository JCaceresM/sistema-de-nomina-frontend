import React from 'react'
import { CustomCol, CustomRow } from '.'
import LogoComponent from './LogoComponent'

const CompanyLogo = (): React.ReactElement => {
  return (
    <CustomRow justify={'center'}>
      <CustomCol xs={24} sm={24} md={20} lg={18} xl={12}>
        {<LogoComponent />}
      </CustomCol>
    </CustomRow>
  )
}

export default CompanyLogo
