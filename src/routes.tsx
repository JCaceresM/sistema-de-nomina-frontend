import React, { ReactElement } from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import ProtectedRoutesWrapper from "./common/components/ProtectedRoutesWrapper"
import {
  PATH_CONFIG_DEPARTMENT_CONSULTING,
  PATH_CONFIG_EMPLOYEE_CONSULTING,
  PATH_CONFIG_POSITIONS_CONSULTING,
  PATH_CONSULTING,
  PATH_DISCOUNT,
  PATH_EMPLOYEES,
  PATH_ESTER_BONUS_EMPLOYEES,
  PATH_ESTER_BONUS_PAYMENT,
  PATH_LOGIN,
  PATH_MAIN,
  PATH_PAYROLL,
  PATH_PAYROLL_APPROVE,
  PATH_PAYROLL_AUTHORIZATION,
  PATH_PAYROLL_CHECK_REGISTER,
  PATH_PAYROLL_CREATE,
  PATH_PAYROLL_NEWS,
  PATH_REPORTS_EMPLOYEES,
  PATH_REPORTS_PAYROLL,
  PATH_REVERT,
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
import ReportsPayroll from "./pages/reports/reports-payroll"
import ReportsEmployees from "./pages/reports/reports-employee"
import EasterBonusPayment from "./pages/regalia/payment"
import ConsultingEasterBonus from "./pages/regalia/consulting"
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
            path={PATH_CONSULTING}
            element={
              <ProtectedRoutesWrapper>
                <Consulting />
              </ProtectedRoutesWrapper>
            }
          />
          <Route
            path={PATH_DISCOUNT}
            element={
              <ProtectedRoutesWrapper>
                <FixPayrollDiscount />
              </ProtectedRoutesWrapper>
            }
          />
          <Route
            path={PATH_REVERT}
            element={
              <ProtectedRoutesWrapper>
                <FixedPayrollRevert />
              </ProtectedRoutesWrapper>
            }
          />
          <Route
            path={PATH_EMPLOYEES}
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
            path={PATH_PAYROLL_CHECK_REGISTER}
            element={
              <ProtectedRoutesWrapper>
                <VerifyRegisterFixedPayroll />
              </ProtectedRoutesWrapper>
            }
          />
          <Route
            path={PATH_PAYROLL_NEWS}
            element={
              <ProtectedRoutesWrapper>
                <FixPayrollNews />
              </ProtectedRoutesWrapper>
            }
          />
          <Route
            path={PATH_PAYROLL}
            element={
              <ProtectedRoutesWrapper>
                <Payroll />
              </ProtectedRoutesWrapper>
            }
          />
          <Route
            path={PATH_PAYROLL_APPROVE}
            element={
              <ProtectedRoutesWrapper>
                <ApproveFixedPayroll />
              </ProtectedRoutesWrapper>
            }
          />
          <Route
            path={PATH_PAYROLL_AUTHORIZATION}
            element={
              <ProtectedRoutesWrapper>
                <FixedPayrollAuthorization />
              </ProtectedRoutesWrapper>
            }
          />
          <Route
            path={PATH_PAYROLL_CREATE}
            element={
              <ProtectedRoutesWrapper>
                <Payroll />
              </ProtectedRoutesWrapper>
            }
          />
          <Route
            path={PATH_REPORTS_PAYROLL}
            element={
              <ProtectedRoutesWrapper>
                <ReportsPayroll />
              </ProtectedRoutesWrapper>
            }
          />
          <Route
            path={PATH_REPORTS_EMPLOYEES}
            element={
              <ProtectedRoutesWrapper>
                <ReportsEmployees />
              </ProtectedRoutesWrapper>
            }
          />
          <Route
            path={PATH_ESTER_BONUS_PAYMENT}
            element={
              <ProtectedRoutesWrapper>
                <EasterBonusPayment />
              </ProtectedRoutesWrapper>
            }
          />
          <Route
            path={PATH_ESTER_BONUS_EMPLOYEES}
            element={
              <ProtectedRoutesWrapper>
                <ConsultingEasterBonus />
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
