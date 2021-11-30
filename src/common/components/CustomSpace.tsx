import React from 'react'
import Space, { SpaceProps } from 'antd/lib/space'

const CustomSpace: React.FunctionComponent<SpaceProps> = ({
  ...props
}): React.ReactElement => <Space {...props}>{props.children}</Space>

export default CustomSpace
