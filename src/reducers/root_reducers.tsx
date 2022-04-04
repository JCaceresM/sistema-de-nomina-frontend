import { combineReducers } from "redux"
import accounts from "./accounts/accounts.reducer"
import departments from "./department/department.reducer"
import Employee from "./employee/employee.reducer"
import dynamicLocalState from "./local/localState.reducers"
import municipality from "./municipality/municipality.reducers"
import payrollNews from "./payroll-news/payroll-news.reducer"
import payrollRecord from "./payroll-record/payroll-record.reducer"
import payroll from "./payroll/payroll.reducer"
import positions from "./positions/positions.reducers"
import provinces from "./provinces/provinces.reducers"
import sector from "./sector/sector.reducers"
import InitialState from "./state/index.state"
import user from "./user/user.reducer"

const state = {
  user: user,
  employee: Employee,
  positions,
  dynamicLocalState,
  departments,
  provinces,
  municipality,
  sector,
  payroll,
  payrollRecord,
  InitialState,
  payrollNews,
  accounts
}
const appReducer = combineReducers(state)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const rootReducer = (state: any, action: any) => {

  if (action.type === "STATE_SET_STATE_STATE") {
    state = {user:state.user}
  }

  return appReducer(state, action)
}

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
