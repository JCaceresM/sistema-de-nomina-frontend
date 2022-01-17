import Cookies from "js-cookie"
import { COOKIE_KEY_SESSION_TOKEN, COOKIE_KEY_USER_DATA } from "./session.constants"

const isLoggedIn = (): boolean => {
  const requiredCookiesKeys = [COOKIE_KEY_SESSION_TOKEN, COOKIE_KEY_USER_DATA]

  return !requiredCookiesKeys.some(
    (cookieKey) => Cookies.get(cookieKey) === undefined
  )
}

type UserData = {
  businessId: string
  username: string
  userId: string
  sessionCookie: {
    token: string
    expiration: string
  }
}

const createSession = (user: UserData): void => {
  
  const { businessId, username, sessionCookie, userId, } = user
  const { token: sessionToken, expiration: sessionExpiration } = sessionCookie
  const cookiesExpiration = new Date(sessionExpiration)
  const sessionInfo = JSON.stringify({
    businessId,
    username,
    userId,
  })

  Cookies.set(COOKIE_KEY_USER_DATA, sessionInfo, { expires: cookiesExpiration })

  Cookies.set(COOKIE_KEY_SESSION_TOKEN, sessionToken, {
    expires: cookiesExpiration,
  })
}

const removeSession = (): void => {
  const requiredCookiesKeys = [COOKIE_KEY_SESSION_TOKEN, COOKIE_KEY_USER_DATA]

  requiredCookiesKeys.forEach((cookieKey) => Cookies.remove(cookieKey))
}

const getSessionInfo = (): UserData => {
  return isLoggedIn()
    ? JSON.parse(Cookies.get(COOKIE_KEY_USER_DATA) || `{}`)
    : {}
}

const getSessionToken = (): string => {
  return Cookies.get(COOKIE_KEY_SESSION_TOKEN) || ""
}
export {
  getSessionToken,
  getSessionInfo,
  removeSession,
  createSession,
  isLoggedIn,
}
