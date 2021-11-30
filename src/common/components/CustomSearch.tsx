import React from 'react';
import Search, { SearchProps } from 'antd/lib/input/Search';

const CustomSearch: React.FunctionComponent<SearchProps> = ({ ...props }) => (
  <Search {...props}>{props.children}</Search>
);

export default CustomSearch;
