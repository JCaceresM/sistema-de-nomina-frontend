
import {
  DEPARTMENT_CREATE_DEPARTMENT,
  DEPARTMENT_CREATE_DEPARTMENT_FAILURE,
  DEPARTMENT_CREATE_DEPARTMENT_SUCCESS,
   DEPARTMENT_GET_ALL_DEPARTMENT,
   DEPARTMENT_GET_ALL_DEPARTMENT_FAILURE,
  DEPARTMENT_GET_ALL_DEPARTMENT_SUCCESS,
  DEPARTMENT_MANAGER_REDUX_STATE_DEPARTMENT,
} from "../../constants/department/department.constants"
import { DepartmentActions,DepartmentType } from "../../actions/department/department.actions"
import { ResponseMetadata } from "../../common/types/response.type"

type DepartmentState = {
  getDepartmentsIsLoading: boolean
  createDepartmentsIsLoading: boolean,
  isCreated:boolean
  departments: DepartmentType[],
  departmentMetadata:ResponseMetadata

}

const initialState = {
  getDepartmentsIsLoading: false,
  isCreated: false,
  createDepartmentsIsLoading: false,
  departments: new Array<DepartmentType>(),
  departmentMetadata:{} as ResponseMetadata,
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
