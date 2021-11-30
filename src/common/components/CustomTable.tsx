import React, { FunctionComponent, ReactElement } from 'react'
import { Table } from 'antd'
import { TableProps } from 'antd/lib/table'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTable: FunctionComponent<TableProps<any>> = ({
  size = 'small',
  ...props
}): ReactElement => (
  <Table size={size} {...props}>
    {props.children}
  </Table>
)

export default CustomTable
