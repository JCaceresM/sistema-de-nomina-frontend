import React from 'react';
import { Radio } from 'antd';
import { RadioProps } from 'antd/lib/radio';

const CustomRadio: React.FunctionComponent<RadioProps> = ({
  ...props
}): React.ReactElement => <Radio {...props}>{props.children}</Radio>;

export default CustomRadio;
