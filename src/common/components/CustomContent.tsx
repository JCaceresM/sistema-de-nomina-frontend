import React from 'react'
import { Layout } from 'antd'
import { CustomLayoutProps } from './CustomLayout'

const { Content } = Layout

const CustomContent: React.FunctionComponent<CustomLayoutProps> = (
  props
): React.ReactElement => <Content {...props}>{props.children}</Content>

export default CustomContent
