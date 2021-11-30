import React from 'react'
import { Layout } from 'antd'
import { CustomLayoutProps } from './CustomLayout'

const { Footer } = Layout

const CustomFooter: React.FunctionComponent<CustomLayoutProps> = (
  props
): React.ReactElement => <Footer {...props}>{props.children}</Footer>

export default CustomFooter
