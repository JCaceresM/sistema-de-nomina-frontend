import React from 'react'
import Input, { GroupProps } from 'antd/lib/input'

const CustomInputGroup: React.FunctionComponent<GroupProps> = ({
  ...props
}): React.ReactElement => <Input.Group {...props}>{props.children}</Input.Group>

export default CustomInputGroup
