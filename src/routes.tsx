import React, { ReactElement } from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import ProtectedRoutesWrapper from "./common/components/ProtectedRoutesWrapper"
import {
  PATH_CONFIG_DEPARTMENT_CONSULTING,
  PATH_CONFIG_EMPLOYEE_CONSULTING,
  PATH_CONFIG_POSITIONS_CONSULTING,
  PATH_FIXED_CONSULTING,
  PATH_FIXED_DISCOUNT,
  PATH_FIXED_EMPLOYEES,
  PATH_FIXED_PAYROLL,
  PATH_FIXED_PAYROLL_APPROVE,
  PATH_FIXED_PAYROLL_AUTHORIZATION,
  PATH_FIXED_PAYROLL_CHECK_REGISTER,
  PATH_FIXED_PAYROLL_CREATE,
  PATH_FIXED_PAYROLL_NEWS,
  PATH_FIXED_REVERT,
  PATH_LOGIN,
  PATH_MAIN,
} from "./common/constants/web-site-route.constants"
import CompanyLogo from "./common/components/CompanyLogo"
import Login from "./pages/login/Login"
import { RemoveSessionRedirect } from "./common/components/RemoveSessionRedirect"
import Consulting from "./pages/fix-payroll/consulting"
import EmployeeConsulting from "./pages/employee/employee"
import Department from "./pages/department/department"
import Position from "./pages/position/position"
import VerifyRegisterFixedPayroll from "./pages/fix-payroll/verify-register"
import Payroll from "./pages/payroll/payroll"
import ApproveFixedPayroll from "./pages/fix-payroll/fixed-payroll-approve"
import FixedPayrollAuthorization from "./pages/fix-payroll/fixed-payroll-authorization"
import FixPayrollNews from "./pages/fix-payroll/fixed-payroll-news"
import FixPayrollDiscount from "./pages/fix-payroll/fix-payroll-discount"
import FixedPayrollRevert from "./pages/fix-payroll/fixed-payroll-revert"
import FixPayrollEmployeeConsulting from "./pages/fix-payroll/employee-consult"
const WebSiteRoutes = (): ReactElement => {
  return (
    <Router>
      {/* <React.Fragment> */}
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
            path={PATH_FIXED_CONSULTING}
            element={
              <ProtectedRoutesWrapper>
                <Consulting />
              </ProtectedRoutesWrapper>
            }
          />
          <Route
            path={PATH_FIXED_DISCOUNT}
            element={
              <ProtectedRoutesWrapper>
                <FixPayrollDiscount />
              </ProtectedRoutesWrapper>
            }
          />
          <Route
            path={PATH_FIXED_REVERT}
            element={
              <ProtectedRoutesWrapper>
                <FixedPayrollRevert />
              </ProtectedRoutesWrapper>
            }
          />
          <Route
            path={PATH_FIXED_EMPLOYEES}
            element={
              <ProtectedRoutesWrapper>
                <FixPayrollEmployeeConsulting />
              </ProtectedRoutesWrapper>
            }
          />
          <Route
            path={PATH_CONFIG_DEPARTMENT_CONSULTING}
            element={
              <ProtectedRoutesWrapper>
                <Department />
              </ProtectedRoutesWrapper>
            }
          />
          <Route
            path={PATH_CONFIG_EMPLOYEE_CONSULTING}
            element={
              <ProtectedRoutesWrapper>
                <EmployeeConsulting />
              </ProtectedRoutesWrapper>
            }
          />
          <Route
            path={PATH_CONFIG_POSITIONS_CONSULTING}
            element={
              <ProtectedRoutesWrapper>
                <Position />
              </ProtectedRoutesWrapper>
            }
          />
          <Route
            path={PATH_FIXED_PAYROLL_CHECK_REGISTER}
            element={
              <ProtectedRoutesWrapper>
                <VerifyRegisterFixedPayroll />
              </ProtectedRoutesWrapper>
            }
          />
          <Route
            path={PATH_FIXED_PAYROLL_NEWS}
            element={
              <ProtectedRoutesWrapper>
                <FixPayrollNews />
              </ProtectedRoutesWrapper>
            }
          />
          <Route
            path={PATH_FIXED_PAYROLL}
            element={
              <ProtectedRoutesWrapper>
                <Payroll />
              </ProtectedRoutesWrapper>
            }
          />
          <Route
            path={PATH_FIXED_PAYROLL_APPROVE}
            element={
              <ProtectedRoutesWrapper>
                <ApproveFixedPayroll />
              </ProtectedRoutesWrapper>
            }
          />
          <Route
            path={PATH_FIXED_PAYROLL_AUTHORIZATION}
            element={
              <ProtectedRoutesWrapper>
                <FixedPayrollAuthorization />
              </ProtectedRoutesWrapper>
            }
          />
          <Route
            path={PATH_FIXED_PAYROLL_CREATE}
            element={
              <ProtectedRoutesWrapper>
                <Payroll />
              </ProtectedRoutesWrapper>
            }
          />

          <Route
            element={
              <ProtectedRoutesWrapper>
                <RemoveSessionRedirect />
              </ProtectedRoutesWrapper>
            }
            path="*"
          />
        </Routes>
      {/* </React.Fragment> */}
    </Router>
  )
}

export default WebSiteRoutes
