import React from 'react'
import InputNumber, { InputNumberProps } from 'antd/lib/input-number'

const CustomInputNumber: React.FunctionComponent<InputNumberProps> = ({
  min = 0,
  width = `100%`,
  ...props
}): React.ReactElement => (
  <InputNumber style={{...props.style,width}} min={min} {...props}>
    {props.children}
  </InputNumber>
)

export default CustomInputNumber
