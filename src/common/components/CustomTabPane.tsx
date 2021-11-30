import React from 'react'
import { Tabs } from 'antd'
import { TabPaneProps } from 'antd/lib/tabs'

const { TabPane } = Tabs

const CustomTabPane: React.FunctionComponent<TabPaneProps> = ({
  forceRender = false,
  ...props
}): React.ReactElement => (
  <TabPane forceRender={forceRender} {...props}>
    {props.children}
  </TabPane>
)

export default CustomTabPane
