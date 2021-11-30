import React from 'react'
import { Row } from 'antd'
import { RowProps } from 'antd/lib/row'

const CustomRow: React.FunctionComponent<RowProps> = ({
  align = 'middle',
  gutter = 0,
  justify = 'end',
  ...props
}): React.ReactElement => (
  <Row align={align} gutter={gutter} justify={justify} {...props}>
    {props.children}
  </Row>
)

export default CustomRow
