/* eslint-disable no-console */
import React from 'react'
import { Input } from 'antd'
import { InputProps } from 'antd/lib/input'

export type CustomInputProps = InputProps & {
  autoComplete?: string
}

const CustomInput: React.FunctionComponent<CustomInputProps> = ({
  autoComplete = 'off',
  disabled = false,
  type = 'text',
  ...props
}): React.ReactElement => (
  <Input autoComplete={autoComplete} disabled={disabled} type={type} {...props}>
   
    
    {props.children}
  </Input>
)

export default CustomInput
