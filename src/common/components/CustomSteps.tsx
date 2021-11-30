import React from 'react'
import { Steps } from 'antd'
import { StepsProps } from 'antd/lib/steps'

const CustomSteps: React.FunctionComponent<StepsProps> = ({
  ...props
}): React.ReactElement => <Steps {...props}>{props.children}</Steps>

export default CustomSteps
