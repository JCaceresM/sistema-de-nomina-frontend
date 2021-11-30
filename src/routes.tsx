import React, { ReactElement } from "react"
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom"
import ProtectedRoutesWrapper from "./common/components/ProtectedRoutesWrapper"
import {
  PATH_LOGIN,
  PATH_MAIN,
} from "./common/constants/web-site-route.constants"
import CompanyLogo from "./common/components/CompanyLogo"
import Login from "./pages/login/Login"
import {  Result } from "antd"
import { isLoggedIn } from "./common/utils/session/session"
import { HomeRedirect } from "./common/components/HomeRedirect"
import { RemoveSessionRedirect } from "./common/components/RemoveSessionRedirect"
const WebSiteRoutes = (): ReactElement => {
  return (
    <Router>
      <React.Fragment>
        <Routes>
          <Route path={PATH_LOGIN} element={<Login />} />
          <Route
            path={PATH_MAIN}
            element={
              <ProtectedRoutesWrapper>
                <CompanyLogo />
              </ProtectedRoutesWrapper>
            }
          />

          <Route
            element={
              isLoggedIn() ? (
                <RemoveSessionRedirect></RemoveSessionRedirect>
              ) : (
                <Result
                  status="404"
                  title="404"
                  subTitle="Sorry, the page you visited does not exist."
                  extra={<HomeRedirect/>}
                />
              )
            }
            path="*"
          />
        </Routes>
      </React.Fragment>
    </Router>
  )
}


export default WebSiteRoutes
