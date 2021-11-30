import React from 'react'
import { Form } from 'antd'
import { FormItemProps } from 'antd/lib/form'

const { Item } = Form

type CustomFormItemProps = FormItemProps & {
  onlyLetters?: boolean
  onlyNumbers?: boolean
}

const CustomFormItem: React.FunctionComponent<CustomFormItemProps> = ({
  colon = true,
  hasFeedback = false,
  labelAlign = 'right' as FormItemProps['labelAlign'],
  noStyle = false,
  onlyLetters = false,
  onlyNumbers = false,
  required = false,
  trigger = 'onChange',
  validateFirst = false,
  validateTrigger = 'onChange',
  valuePropName = 'value',
  ...props
}): React.ReactElement => {
  if (onlyLetters) {
    props.normalize = (value: string) =>
      value.match(new RegExp('^[a-z A-Z]+$'))
        ? value
        : value.substring(0, value.length - 1)
  }

  if (onlyNumbers) {
    props.normalize = (value: string) =>
      value.match(new RegExp('^[0-9 ]+$'))
        ? value
        : value.substring(0, value.length - 1)
  }

  return (
    <Item
      colon={colon}
      hasFeedback={hasFeedback}
      labelAlign={labelAlign}
      noStyle={noStyle}
      style={{ margin: 0, padding: 2 }}
      required={required}
      trigger={trigger}
      validateFirst={validateFirst}
      validateTrigger={validateTrigger}
      valuePropName={valuePropName}
      {...props}
    >
      {props.children}
    </Item>
  )
}

export default CustomFormItem
