import { combineReducers } from "redux"
import departments from "./department/department.reducer"
import Employee from "./employee/employee.reducer"
import dynamicLocalState from "./local/localState.reducers"
import positions from "./positions/positions.reducers"
import provinces from "./provinces/provinces.reducers"
import user from "./user/user.reducer"

const rootReducer = combineReducers({
  user: user,
  employee: Employee,
  positions,
  dynamicLocalState,
  departments,
  provinces,
})
export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
