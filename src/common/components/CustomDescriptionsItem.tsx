import { Descriptions } from 'antd'
import { DescriptionsItemProps } from 'antd/lib/descriptions/Item'
import React from 'react'

const { Item } = Descriptions

const CustomDescriptionsItem: React.FunctionComponent<DescriptionsItemProps> = ({
  ...props
}): React.ReactElement => <Item {...props}>{props.children}</Item>

export default CustomDescriptionsItem
