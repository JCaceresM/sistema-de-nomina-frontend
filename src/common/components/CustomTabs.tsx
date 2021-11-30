import React from 'react'
import { Tabs } from 'antd'
import { TabsProps } from 'antd/lib/tabs'

const CustomTabs: React.FunctionComponent<TabsProps> = ({
  hideAdd = false,
  tabPosition = 'top',
  type = 'line',
  ...props
}): React.ReactElement => (
  <Tabs hideAdd={hideAdd} tabPosition={tabPosition} type={type} {...props}>
    {props.children}
  </Tabs>
)

export default CustomTabs
