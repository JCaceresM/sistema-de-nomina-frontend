import React from 'react'
import DatePicker, { RangePickerProps } from 'antd/lib/date-picker'
import localeProp from 'antd/es/date-picker/locale/es_ES'
import 'moment/locale/es'

type CuatomRangePickerProps = RangePickerProps & {
  locale?: Record<string, unknown>
}

const { RangePicker } = DatePicker

const CustomRangePicker: React.FunctionComponent<CuatomRangePickerProps> = ({
  locale = localeProp,
  ...props
}): React.ReactElement => (
  <RangePicker locale={locale} {...props}>
    {props.children}
  </RangePicker>
)

export default CustomRangePicker
