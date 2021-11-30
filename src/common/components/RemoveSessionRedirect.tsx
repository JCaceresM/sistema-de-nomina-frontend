import React from "react"

import { Navigate } from "react-router-dom"
import { PATH_LOGIN } from "../constants/web-site-route.constants"
import { removeSession } from "../utils/session/session"

export const RemoveSessionRedirect = ():JSX.Element => {
    removeSession()
    return <Navigate to={PATH_LOGIN}></Navigate>
  }