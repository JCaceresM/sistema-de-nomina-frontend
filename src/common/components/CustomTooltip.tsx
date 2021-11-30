import React from 'react'
import { Tooltip } from 'antd'
import { TooltipProps } from 'antd/lib/tooltip'

const CustomTooltip: React.FunctionComponent<TooltipProps> = ({
  title = '',
  ...props
}): React.ReactElement => (
  <Tooltip title={title} {...props}>
    {props.children}
  </Tooltip>
)

export default CustomTooltip
