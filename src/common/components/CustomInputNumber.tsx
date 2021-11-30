import React from 'react'
import InputNumber, { InputNumberProps } from 'antd/lib/input-number'

const CustomInputNumber: React.FunctionComponent<InputNumberProps> = ({
  min = 0,
  ...props
}): React.ReactElement => (
  <InputNumber min={min} {...props}>
    {props.children}
  </InputNumber>
)

export default CustomInputNumber
