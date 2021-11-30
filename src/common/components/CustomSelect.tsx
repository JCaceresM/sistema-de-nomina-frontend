import React from 'react'
import Select, { SelectProps } from 'antd/lib/select'

const CustomSelect: React.FunctionComponent<SelectProps<string | number>> = ({
  dropdownMatchSelectWidth = false,
  ...props
}): React.ReactElement => {
  return (
    <Select dropdownMatchSelectWidth={dropdownMatchSelectWidth} {...props}>
      {props.children}
    </Select>
  )
}

export default CustomSelect
