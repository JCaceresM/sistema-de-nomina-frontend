import React from 'react'
import MaskedInput, { MaskedInputProps } from 'react-text-mask'

const CustomMaskedInput: React.FunctionComponent<MaskedInputProps> = ({
  mask = [],
  guide = false,
  className = 'ant-input',
  ...props
}): React.ReactElement => (
  <MaskedInput className={className} mask={mask} guide={guide} {...props}>
    {props.children}
  </MaskedInput>
)

export default CustomMaskedInput
