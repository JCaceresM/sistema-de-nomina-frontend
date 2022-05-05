
import {
  DEPARTMENT_CREATE_DEPARTMENT,
  DEPARTMENT_CREATE_DEPARTMENT_FAILURE,
  DEPARTMENT_CREATE_DEPARTMENT_SUCCESS,
   DEPARTMENT_DELETE_PAYROLL,
   DEPARTMENT_DELETE_PAYROLL_FAILURE,
   DEPARTMENT_DELETE_PAYROLL_SUCCESS,
   DEPARTMENT_GET_ALL_DEPARTMENT,
   DEPARTMENT_GET_ALL_DEPARTMENT_FAILURE,
  DEPARTMENT_GET_ALL_DEPARTMENT_SUCCESS,
  DEPARTMENT_GET_EMPLOYEES_DEPARTMENT,
  DEPARTMENT_GET_EMPLOYEES_DEPARTMENT_FAILURE,
  DEPARTMENT_GET_EMPLOYEES_DEPARTMENT_SUCCESS,
  DEPARTMENT_GET_IN_PAYROLL,
  DEPARTMENT_GET_IN_PAYROLL_FAILURE,
  DEPARTMENT_GET_IN_PAYROLL_SUCCESS,
  DEPARTMENT_GET_NOT_IN_PAYROLL,
  DEPARTMENT_GET_NOT_IN_PAYROLL_FAILURE,
  DEPARTMENT_GET_NOT_IN_PAYROLL_SUCCESS,
  DEPARTMENT_MANAGER_REDUX_STATE_DEPARTMENT,
} from "../../constants/department/department.constants"
import { DepartmentActions,DepartmentType } from "../../actions/department/department.actions"
import { ResponseMetadata } from "../../common/types/response.type"
import { EmployeeType } from "../../actions/employee/employee.actions"

export type DepartmentState = {
  getDepartmentsIsLoading: boolean
  getDepartmentEmployeesIsLoading: boolean
  getDepartmentInPayrollIsLoading: boolean
  getDepartmentNotInPayrollIsLoading: boolean
  deparmentEmployees:  Array<DepartmentType & { employees: EmployeeType[] }>
  createDepartmentsIsLoading: boolean,
  isCreated:boolean
  departments: DepartmentType[],
  departmentsNotInPayroll: DepartmentType[],
  departmentsInPayroll: DepartmentType[],
  departmentMetadata:ResponseMetadata,isDeparmentPayrollDeleted: boolean ,       deleteDeparmentPayrollIsLoading: boolean,


}

const initialState = {
  getDepartmentsIsLoading: false,
  isCreated: false,
  createDepartmentsIsLoading: false,
  isDeparmentPayrollDeleted: false ,       deleteDeparmentPayrollIsLoading: false,  getDepartmentInPayrollIsLoading: false,
  getDepartmentNotInPayrollIsLoading: false,
  departments: new Array<DepartmentType>(),
  departmentsNotInPayroll: new Array<DepartmentType>(),
  departmentsInPayroll: new Array<DepartmentType>(),
  departmentMetadata:{} as ResponseMetadata,
  getDepartmentEmployeesIsLoading: false,
  deparmentEmployees: new Array<DepartmentType & { employees: EmployeeType[] }>()
}

const departments = (
  state: DepartmentState = initialState,
  action: DepartmentActions
): DepartmentState => {
  switch (action.type) {
    case DEPARTMENT_GET_ALL_DEPARTMENT:
      return {
        ...state,
        getDepartmentsIsLoading: true,
      }
    case DEPARTMENT_GET_ALL_DEPARTMENT_FAILURE:
      return {
        ...state,
        departments: [],
        departmentMetadata: {} as ResponseMetadata,
        getDepartmentsIsLoading: false,
      }
    case DEPARTMENT_GET_ALL_DEPARTMENT_SUCCESS:
        
      return {
        ...state,
        departments: action.AllDepartment,
        departmentMetadata: action.metadata,
        getDepartmentsIsLoading: false,
      }
    case DEPARTMENT_CREATE_DEPARTMENT:
      return {
        ...state,
        createDepartmentsIsLoading: true,
      }
    case DEPARTMENT_CREATE_DEPARTMENT_FAILURE:
      return {
        ...state,
        createDepartmentsIsLoading: false,
      }
    case DEPARTMENT_CREATE_DEPARTMENT_SUCCESS:  
      return {
        ...state,
        departments: [...state.departments,action.createDepartment],
        createDepartmentsIsLoading: false,
        isCreated: true,
      }
    case DEPARTMENT_DELETE_PAYROLL:
      return {
        ...state,
        deleteDeparmentPayrollIsLoading: true,
      }
    case DEPARTMENT_DELETE_PAYROLL_FAILURE:
      return {
        ...state,
        deleteDeparmentPayrollIsLoading: false,
      }
    case DEPARTMENT_DELETE_PAYROLL_SUCCESS:  
      return {
        ...state,
        deleteDeparmentPayrollIsLoading: false,
        isDeparmentPayrollDeleted: true,

      }
    case DEPARTMENT_GET_EMPLOYEES_DEPARTMENT:
      return {
        ...state,
        getDepartmentEmployeesIsLoading: true,
      }
    case DEPARTMENT_GET_EMPLOYEES_DEPARTMENT_SUCCESS:      
      return {
        ...state,
        getDepartmentEmployeesIsLoading: false,
        deparmentEmployees: action.data
      }
    case DEPARTMENT_GET_EMPLOYEES_DEPARTMENT_FAILURE:  
      return {
        ...state,
        getDepartmentEmployeesIsLoading: false,
      }
    case DEPARTMENT_GET_NOT_IN_PAYROLL:  
      return {
        ...state,
        getDepartmentNotInPayrollIsLoading: true,
      }
    case DEPARTMENT_GET_NOT_IN_PAYROLL_SUCCESS:  
    
      return {
        ...state,
        departmentsNotInPayroll:action.data,
        getDepartmentNotInPayrollIsLoading: false,
      }
    case DEPARTMENT_GET_NOT_IN_PAYROLL_FAILURE:  
      return {
        ...state,
        getDepartmentNotInPayrollIsLoading: false,
      }
    case DEPARTMENT_GET_IN_PAYROLL:  
      return {
        ...state,
        getDepartmentInPayrollIsLoading: true,
      }
    case DEPARTMENT_GET_IN_PAYROLL_SUCCESS:  
    
      return {
        ...state,
        departmentsInPayroll:action.data,
        getDepartmentInPayrollIsLoading: false,
      }
    case DEPARTMENT_GET_IN_PAYROLL_FAILURE:  
      return {
        ...state,
        getDepartmentInPayrollIsLoading: false,
      }
    case DEPARTMENT_MANAGER_REDUX_STATE_DEPARTMENT:  
      return {
        ...state,
        ...action.state
      }
    default:
      return state
  }
}

export default departments
