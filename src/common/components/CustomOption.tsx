import React from 'react'
import { Select } from 'antd'
import { OptionProps } from 'antd/lib/mentions'
import { OptionType } from 'antd/lib/select'

const CustomOption: React.FunctionComponent<OptionProps> = ({
  ...props
}): React.ReactElement<OptionType> => (
  <Select.Option {...props}>{props.children}</Select.Option>
)

export default CustomOption
