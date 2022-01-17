import React, { ReactElement, useEffect } from "react"
import { Link, Navigate,  } from "react-router-dom"
import styled from "styled-components"
import {
  HomeOutlined,
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons"
import {
  Copyright,
  CustomCol,
  CustomContent,
  CustomDivider,
  CustomFooter,
  CustomHeader,
  CustomLayout,
  CustomMenu,
  CustomRow,
  CustomSider,
  CustomText,
  CustomTooltip,
  DrawerOptions,
} from "."
import {
  getSessionInfo,
  isLoggedIn,
  removeSession,
} from "../utils/session/session"
import { PATH_LOGIN, PATH_MAIN } from "../constants/web-site-route.constants"
import CustomButton from "./CustomButton"
import CustomMenuItem from "./CustomMenuItem"
import CustomDropdown from "./CustomDropdown"
import LogoComponent from "./LogoComponent"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../reducers/root_reducers"
import { getMenuOptions } from "../../actions/user/user.actions"

const SiderHeaderContainer = styled.div`
  text-align: center;

  .logo {
    width: 100px;
  }

  .username {
    display: block;
    font-weight: bold;
  }
`

const HeaderTextContainer = styled(CustomText)`
  color: #fff;
  font-size: 20px;
  
`

type Props = {
  children?: ReactElement[] | ReactElement
}

const ProtectedRoutesWrapper = (props: Props): ReactElement => {
 
  const dispatch = useDispatch()
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const { menuOptions } = useSelector((state: RootState) => state.user)

 
  const { userId = "",username = "",} = getSessionInfo()
  const handleDrawerToggle = () => {
    setIsCollapsed(!isCollapsed)
  }
  useEffect(() => {
    dispatch(getMenuOptions(userId))
  }, [ userId])

  if (!isLoggedIn()) {
    removeSession()
    return <Navigate to={PATH_LOGIN} />
  }
  const PerfilMenu = (
    <CustomMenu>
      <CustomMenuItem key="1" icon={<UserOutlined />}>
        Perfil
      </CustomMenuItem>
      <CustomMenuItem key="2" icon={<LoginOutlined />}>
        <span
          onClick={() => {
            removeSession()
            window.location.reload()
          }}
        >
          Cerrar sesión
        </span>
      </CustomMenuItem>
    </CustomMenu>
  )

  return (
    <CustomLayout>
      <CustomSider
        collapsed={isCollapsed}
        collapsedWidth={0}
        width={240}
        theme="light"
        className={"fixedContainer"}
        style={{
          overflow: "auto",
          height: "100vh",
        }}
      >
        <SiderHeaderContainer>
          <LogoComponent height={"120px"} width={"120px"} />
          <p className="username">{username}</p>
          <CustomDivider />
        </SiderHeaderContainer>
        <DrawerOptions userMenuOptions={menuOptions} />
      </CustomSider>
      <CustomLayout>
        <CustomHeader
          style={{
            // TODO: These colors are not final. We should put app colors in a separate place.
            backgroundColor: "#3f51b5",
            width: "100%",
            color: "#fff",
            fontSize: "25px",
            padding: "0 15px",
            alignItems: "center",
            position: "relative",
            top: 0,
            zIndex: 1,
          }}
        >
          <CustomRow
            justify={"start"}
            style={{
              width: "100%",
              position: "relative",
              // padding: "0 0 3px 0"
            }}
          >
            <CustomCol xs={1}>
              {React.createElement(
                isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  onClick: handleDrawerToggle,
                  style: {
                    cursor: "pointer",
                    textAlign: "center",
                  },
                }
              )}
            </CustomCol>
            <CustomCol xs={20}>
              <HeaderTextContainer ellipsis={true}>
                {"Sistema de nomina"}
                {/* {"d"} */}
              </HeaderTextContainer>
            </CustomCol>

            <CustomCol xs={1}>
              <CustomTooltip title="Inicio">
                <Link to={PATH_MAIN}>
                  <CustomButton
                    type={"text"}
                    style={{
                      backgroundColor: "#3f51b5",
                      color: "#fff",
                      fontSize: "18px",
                      padding: "0 15px",
                      cursor: "pointer",
                    }}
                  >
                    <HomeOutlined />
                  </CustomButton>
                </Link>
              </CustomTooltip>
            </CustomCol>
            <CustomCol xs={1}>
              <CustomDropdown overlay={PerfilMenu}>
                <CustomButton
                  type={"text"}
                  style={{
                    backgroundColor: "#3f51b5",
                    color: "#fff",
                    fontSize: "18px",
                    padding: "0 15px",
                    cursor: "pointer",
                    margin: "5px",
                  }}
                >
                  <UserOutlined />
                </CustomButton>
              </CustomDropdown>
            </CustomCol>
          </CustomRow>
        </CustomHeader>
        <CustomContent
          style={{
            padding: "15px",
            paddingTop: "10px",
            overflow: "auto",
            height: "90vh",
          }}
        >
          {props.children}
          <CustomFooter style={{ textAlign: "center" }}>
            <Copyright />
          </CustomFooter>
        </CustomContent>
      </CustomLayout>
    </CustomLayout>
  )
}

export default ProtectedRoutesWrapper
