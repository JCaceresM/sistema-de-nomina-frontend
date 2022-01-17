
import {
  EMPLOYEE_GET_ALL_EMPLOYEE,
  EMPLOYEE_GET_ALL_EMPLOYEE_FAILURE,
  EMPLOYEE_GET_ALL_EMPLOYEE_SUCCESS,
} from "../../constants/employee/employee.constants"
import { EmployeeAction,EmployeeType } from "../../actions/employee/employee.actions"
import { ResponseMetadata } from "../../common/types/response.type"

type EmployeeState = {
  isLoading: boolean
  employees: EmployeeType[],
  employeesMetadata:ResponseMetadata

}

const initialState = {
  isLoading: false,
  employees: new Array<EmployeeType>(),
  employeesMetadata:{} as ResponseMetadata,
}

const Employee = (
  state: EmployeeState = initialState,
  action: EmployeeAction
): EmployeeState => {
  switch (action.type) {
    case EMPLOYEE_GET_ALL_EMPLOYEE:
      return {
        ...state,

        isLoading: true,
      }
    case EMPLOYEE_GET_ALL_EMPLOYEE_FAILURE:
      return {
        ...state,
        isLoading: false,
      }
    case EMPLOYEE_GET_ALL_EMPLOYEE_SUCCESS:
        
      return {
        ...state,
        employees: action.AllEmployee,
        employeesMetadata: action.metadata,
        isLoading: false,
      }
    default:
      return state
  }
}

export default Employee
