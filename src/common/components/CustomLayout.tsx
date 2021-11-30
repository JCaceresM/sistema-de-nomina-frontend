import React from 'react'
import { Layout } from 'antd'
import { LayoutProps } from 'antd/lib/layout'

export type CustomLayoutProps = LayoutProps & {
  className?: string
  style?: React.CSSProperties
}

const CustomLayout: React.FunctionComponent<CustomLayoutProps> = ({
  ...props
}): React.ReactElement => (
  <Layout {...props}>
    {props.children}
  </Layout>
)

export default CustomLayout
