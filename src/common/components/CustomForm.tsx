import React from 'react'
import { Form } from 'antd'
import { FormProps } from 'antd/lib/form'

const CustomForm: React.FunctionComponent<FormProps> = (
  props
): React.ReactElement => <Form {...props}>{props.children}</Form>

export default CustomForm
