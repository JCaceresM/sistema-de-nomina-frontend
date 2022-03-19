import {
  EMPLOYEE_CREATE_EMPLOYEE,
  EMPLOYEE_CREATE_EMPLOYEE_FAILURE,
  EMPLOYEE_CREATE_EMPLOYEE_SUCCESS,
  EMPLOYEE_GET_EMPLOYEE,
  EMPLOYEE_GET_EMPLOYEE_FAILURE,
  EMPLOYEE_GET_EMPLOYEE_SUCCESS,
  EMPLOYEE_MANAGER_REDUX_STATE_EMPLOYEE,
  EMPLOYEE_UPDATE_EMPLOYEE,
  EMPLOYEE_UPDATE_EMPLOYEE_FAILURE,
  EMPLOYEE_UPDATE_EMPLOYEE_SUCCESS,
} from "../../constants/employee/employee.constants"
import {
  EmployeeAction,
  EmployeeType,
} from "../../actions/employee/employee.actions"
import { ResponseMetadata } from "../../common/types/response.type"

export type EmployeeState = {
  getEmployeesIsLoading: boolean
  createEmployeesIsLoading: boolean
  isEmployeeUpdated: boolean
  isEmployeeCreated: boolean
  employees: EmployeeType[]
  employeesMetadata: ResponseMetadata
}

const initialState = {
  getEmployeesIsLoading: false,
  createEmployeesIsLoading: false,
  isEmployeeUpdated: false,
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
        employees: [],
        employeesMetadata: {} as ResponseMetadata,
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
    case EMPLOYEE_UPDATE_EMPLOYEE:
      return {
        ...state,
        isEmployeeUpdated: true,
      }
    case EMPLOYEE_UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isEmployeeUpdated: false,
      }
    case EMPLOYEE_UPDATE_EMPLOYEE_FAILURE:
      return {
        ...state,
        isEmployeeUpdated: false,
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
