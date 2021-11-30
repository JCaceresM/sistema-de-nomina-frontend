import React from 'react'
import { Menu } from 'antd'
import { MenuItemProps } from 'antd/lib/menu/MenuItem'

const { Item } = Menu

const CustomMenuItem: React.FunctionComponent<MenuItemProps> = ({
  disabled = false,
  ...props
}): React.ReactElement => (
  <Item disabled={disabled} {...props}>
    {props.children}
  </Item>
)

export default CustomMenuItem
