import React from 'react'
import { FormProviderProps } from 'antd/lib/form/context'
import { Form } from 'antd'

const CustomFormProvider: React.FunctionComponent<FormProviderProps> = ({
  ...props
}): React.ReactElement => (
  <Form.Provider {...props}>{props.children}</Form.Provider>
)

export default CustomFormProvider
