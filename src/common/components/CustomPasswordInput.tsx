import React from 'react'
import { Input } from 'antd'
import { CustomInputProps } from './CustomInput'

const { Password } = Input

type CustomPasswordInputProps = CustomInputProps & {
  visibilityToggle?: boolean
}

const CustomPasswordInput: React.FunctionComponent<CustomPasswordInputProps> = ({
  disabled = false,
  type = 'text',
  visibilityToggle = true,
  ...props
}): React.ReactElement => (
  <Password
    disabled={disabled}
    type={type}
    visibilityToggle={visibilityToggle}
    {...props}
  >
    {props.children}
  </Password>
)

export default CustomPasswordInput
