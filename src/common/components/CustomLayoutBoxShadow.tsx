import React from 'react'
import { Layout } from 'antd'
import { LayoutProps } from 'antd/lib/layout'

export type CustomLayoutProps = LayoutProps & {
  className?: string
  style?: React.CSSProperties
}

const CustomLayoutBoxShadow: React.FunctionComponent<CustomLayoutProps> = ({
  style = {
    background: 'white',
    padding: '35px 20px',
    boxShadow:
      '0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  ...props
}): React.ReactElement => (
  <Layout style={Object.assign(style, style)} {...props}>
    {props.children}
  </Layout>
)

export default CustomLayoutBoxShadow
