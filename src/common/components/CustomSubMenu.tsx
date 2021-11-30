import React, { ReactNode } from "react"
import { Menu } from "antd"

const { SubMenu } = Menu

type TitleEventEntity = {
  key: string
  domEvent:
    | React.MouseEvent<HTMLElement, MouseEvent>
    | React.KeyboardEvent<HTMLElement>
}

type CustomSubMenuProps = {
  popupClassName?: string
  disabled?: boolean
  key?: string
  title?: string | ReactNode
  icon?: ReactNode
  onTitleClick?: (e: TitleEventEntity) => void
}

const CustomSubMenu: React.FunctionComponent<CustomSubMenuProps> = ({
  disabled = false,
  ...props
}): React.ReactElement => (
  <SubMenu disabled={disabled} {...props}>
    {props.children}
  </SubMenu>
)

export default CustomSubMenu
