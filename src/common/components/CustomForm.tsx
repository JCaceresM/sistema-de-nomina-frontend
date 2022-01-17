import React from 'react'
import { Form } from 'antd'
import { FormProps } from 'antd/lib/form'

const CustomForm: React.FunctionComponent<FormProps> = (
  {      autoComplete="off"
,  ...props}
): React.ReactElement => <Form autoComplete={autoComplete} {...props}>{props.children}</Form>

export default CustomForm
