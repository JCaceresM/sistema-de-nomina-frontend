import { Result } from "antd"
import React from "react"

import { Navigate } from "react-router-dom"
import { PATH_LOGIN } from "../constants/web-site-route.constants"
import { isLoggedIn, removeSession } from "../utils/session/session"
import { HomeRedirect } from "./HomeRedirect"

export const RemoveSessionRedirect = (): JSX.Element => {
  if (isLoggedIn()) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<HomeRedirect />}
      />
    )
  } else {
    removeSession()
    return <Navigate to={PATH_LOGIN}></Navigate>
  }
}
