import React from 'react'
import { Progress } from 'antd'
import { ProgressProps } from 'antd/lib/progress'

const CustomProgress: React.FunctionComponent<ProgressProps> = ({
  percent = 0,
  showInfo = true,
  strokeLinecap = 'round',
  strokeWidth = 10,
  successPercent = 0,
  type = 'line',
  ...props
}): React.ReactElement => (
  <Progress
    percent={percent}
    showInfo={showInfo}
    strokeLinecap={strokeLinecap}
    strokeWidth={strokeWidth}
    successPercent={successPercent}
    type={type}
    {...props}
  >
    {props.children}
  </Progress>
)

export default CustomProgress
