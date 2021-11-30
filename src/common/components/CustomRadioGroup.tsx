import React from 'react'
import { Radio } from 'antd'
import { RadioGroupProps } from 'antd/lib/radio'

const CustomRadioGroup: React.FunctionComponent<RadioGroupProps> = ({
  ...props
}): React.ReactElement => <Radio.Group {...props}>{props.children}</Radio.Group>

export default CustomRadioGroup
