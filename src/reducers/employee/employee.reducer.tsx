import {
  EMPLOYEE_CREATE_EMPLOYEE,
  EMPLOYEE_CREATE_EMPLOYEE_FAILURE,
  EMPLOYEE_CREATE_EMPLOYEE_SUCCESS,
  EMPLOYEE_GET_EMPLOYEE,
  EMPLOYEE_GET_EMPLOYEE_FAILURE,
  EMPLOYEE_GET_EMPLOYEE_SUCCESS,
  EMPLOYEE_MANAGER_REDUX_STATE_EMPLOYEE,
} from "../../constants/employee/employee.constants"
import {
  EmployeeAction,
  EmployeeType,
} from "../../actions/employee/employee.actions"
import { ResponseMetadata } from "../../common/types/response.type"

export type EmployeeState = {
  getEmployeesIsLoading: boolean
  createEmployeesIsLoading: boolean
  isEmployeeCreated: boolean
  employees: EmployeeType[]
  employeesMetadata: ResponseMetadata
}

const initialState = {
  getEmployeesIsLoading: false,
  createEmployeesIsLoading: false,
  isEmployeeCreated: false,
  employees: new Array<EmployeeType>(),
  employeesMetadata: {} as ResponseMetadata,
}

const Employee = (
  state: EmployeeState = initialState,
  action: EmployeeAction
): EmployeeState => {
  switch (action.type) {
    case EMPLOYEE_GET_EMPLOYEE:
      return {
        ...state,

        getEmployeesIsLoading: true,
      }
    case EMPLOYEE_GET_EMPLOYEE_FAILURE:
      return {
        ...state,
        getEmployeesIsLoading: false,
      }
    case EMPLOYEE_GET_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: action.Employees,
        employeesMetadata: action.metadata,
        getEmployeesIsLoading: false,
      }
    case EMPLOYEE_CREATE_EMPLOYEE:
      return {
        ...state,

        createEmployeesIsLoading: true,
      }
    case EMPLOYEE_CREATE_EMPLOYEE_FAILURE:
      return {
        ...state,
        createEmployeesIsLoading: false,
      }
    case EMPLOYEE_CREATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: [...state.employees, action.created],
        createEmployeesIsLoading: false,
        isEmployeeCreated: true,
      }
      case EMPLOYEE_MANAGER_REDUX_STATE_EMPLOYEE:  
      return {
        ...state,
        ...action.state
      }
    default:
      return state
  }
}

export default Employee