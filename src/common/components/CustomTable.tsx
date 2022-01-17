import React, { FunctionComponent, ReactElement } from 'react'
import { Table } from 'antd'
import { TableProps } from 'antd/lib/table'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTable: FunctionComponent<TableProps<any>> = ({
  size = 'small',
  bordered=true,
  ...props
}): ReactElement => (
  <Table bordered={bordered} size={size} {...props}>
    {props.children}
  </Table>
)

export default CustomTable
