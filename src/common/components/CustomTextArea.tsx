import React from 'react'
import { Input } from 'antd'
import { TextAreaProps } from 'antd/lib/input'

const { TextArea } = Input

const CustomTextArea: React.FunctionComponent<TextAreaProps> = ({
  autoSize = { minRows: 3, maxRows: 3 },
  showCount = true,
  maxLength = 200,
  ...props
}): React.ReactElement => (
  <TextArea
    autoSize={autoSize}
    showCount={showCount}
    maxLength={maxLength}
    {...props}
  ></TextArea>
)

export default CustomTextArea
