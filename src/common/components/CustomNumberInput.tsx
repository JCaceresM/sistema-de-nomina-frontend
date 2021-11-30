import React from 'react'
import { InputNumber } from 'antd'
import { InputNumberProps } from 'antd/lib/input-number'

export type CustomNumberInputProps = InputNumberProps

const CustomNumberInput: React.FunctionComponent<CustomNumberInputProps> = ({
  disabled = false,
  type = 'text',
  ...props
}): React.ReactElement => (
  <InputNumber disabled={disabled} type={type} {...props}>
    {props.children}
  </InputNumber>
)

export default CustomNumberInput
