import Descriptions, { DescriptionsProps } from 'antd/lib/descriptions'
import React from 'react'

const CustomDescriptions: React.FunctionComponent<DescriptionsProps> = ({
  ...props
}): React.ReactElement => (
  <Descriptions {...props}>{props.children}</Descriptions>
)

export default CustomDescriptions
