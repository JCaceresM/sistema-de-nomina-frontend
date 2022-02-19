/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, useEffect, useState } from "react"
import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from "react-router-dom"
import {
  CustomButton,
  CustomMenu,
  CustomMenuItem,
  CustomSubMenu,
  CustomTooltip,
} from "."
// import { useLocation } from 'react-router-dom'
import CustomRow from "./CustomRow"
import { MenuOption } from "../types/general.type"
import { useDispatch } from "react-redux"
import { Dispatch } from "redux"
import { setInitialState } from "../../actions/state/index.state"

// let history: NavigateFunction
let location: Location
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let dispatch: Dispatch<any>
const getMenuItems = (userOptions: MenuOption[],history: NavigateFunction) => {
  return userOptions.map((route: MenuOption) => {
    return route.CHILDREN && route.CHILDREN.length ? (
      <CustomSubMenu key={route.id_actividad} title={route.description}>
        {getMenuItems(route.CHILDREN,history)}
      </CustomSubMenu>
    ) : (
      <CustomMenuItem
        key={route.id_actividad}
        onClick={() => {
          if (route.route) {
            dispatch(setInitialState())
            if (location.pathname !== `/${route.route}`) {
              history('/'+route.route, {
                replace: true,
                state: { activityId: route.id_actividad },
              })
            }
          }
        }}
      >
        <CustomTooltip title={route.description}>
          {route.description}
        </CustomTooltip>
      </CustomMenuItem>
    )
  })
}

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userMenuOptions: any[]
}

const DrawerOptions = (props: Props): ReactElement => {
  location = useLocation()
   dispatch = useDispatch()

  const history = useNavigate()
  const [openKeys, setOpenKeys] = useState(
    JSON.parse(window.localStorage.getItem("optionMenuKey") || "{}")
  )
  const [selectedKeys, setSelectedKeys] = useState([
    window.localStorage.getItem("subMenuKey") || "",
  ])
  const routeIdList: string[] = []

  props.userMenuOptions.forEach((route) => {
    if (route.CHILDREN && route.CHILDREN.length) {
      routeIdList.push(route.ID)
    }
  })

  const _onOpenChange = (_openKeys: string[]) => {
    const latestOpenKey = _openKeys.find((key) => openKeys.indexOf(key) === -1)

    if (routeIdList.indexOf(latestOpenKey || "") === -1) {
      setOpenKeys(_openKeys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
      window.localStorage.setItem(
        "optionMenuKey",
        JSON.stringify(latestOpenKey ? [latestOpenKey] : [])
      )
    }
  }
  useEffect(() => {
    if (location.pathname === "/") {
      window.localStorage.removeItem("optionMenuKey")
      window.localStorage.setItem("optionMenuKey", JSON.stringify([""]))
      setOpenKeys([""])

      window.localStorage.removeItem("subMenuKey")
      window.localStorage.setItem("subMenuKey", JSON.stringify([""]))
      setSelectedKeys([""])
    } else {
      window.localStorage.setItem("optionMenuKey", JSON.stringify(openKeys))
    }
  }, [location.pathname])

  return (
    <>
      <CustomRow justify={"end"}>
        <CustomButton type={"link"}>Contraer todo</CustomButton>
      </CustomRow>
      <CustomMenu
        mode={"inline"}
        inlineIndent={10}
        // openKeys={openKeys}
        // defaultOpenKeys={openKeys}
        // selectedKeys={selectedKeys}
        // onOpenChange={(keys) =>
        // _onOpenChange(
        //   keys.length
        //     ? (keys as string[])
        //     : JSON.parse(window.localStorage.getItem('optionMenuKey')||'{}')
        // )
        // }
        onClick={(keys) => {
          const { key } = keys
          window.localStorage.setItem("subMenuKey", key.toString())
          // setSelectedKeys([window.localStorage.getItem('subMenuKey')||''])
        }}
      >
        {getMenuItems(props.userMenuOptions, history)}
      </CustomMenu>
    </>
  )
}

export default DrawerOptions
