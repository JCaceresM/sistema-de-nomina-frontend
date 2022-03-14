import {
  PAYROLL_CREATE_PAYROLL,
  PAYROLL_CREATE_PAYROLL_FAILURE,
  PAYROLL_CREATE_PAYROLL_SUCCESS,
  PAYROLL_GET_ALL_PAYROLL,
  PAYROLL_GET_ALL_PAYROLL_FAILURE,
  PAYROLL_GET_ALL_PAYROLL_SUCCESS,
  PAYROLL_MANAGER_REDUX_STATE_PAYROLL,
  PAYROLL_UPDATE_PAYROLL_EMPLOYEE,
  PAYROLL_UPDATE_PAYROLL_EMPLOYEE_FAILURE,
  PAYROLL_UPDATE_PAYROLL_EMPLOYEE_SUCCESS,
} from "../../constants/payroll/payroll.constants";
import { ResponseMetadata } from "../../common/types/response.type";
import {
  PayrollActions,
  PayrollType,
} from "../../actions/payroll/payroll.actions";

export type PayrollState = {
  getPayrollIsLoading: boolean;
  createPayrollIsLoading: boolean;
  isPatched: boolean;
  updatePayrollIsloading: boolean;
  isPayrollCreated: boolean;
  payroll: PayrollType[];
  payrollMetadata: ResponseMetadata;
};

const initialState = {
  getPayrollIsLoading: false,
  isPayrollCreated: false,
  isPatched: false,
  updatePayrollIsloading: false,
  createPayrollIsLoading: false,
  payroll: new Array<PayrollType>(),
  payrollMetadata: {} as ResponseMetadata,
};

const payroll = (
  state: PayrollState = initialState,
  action: PayrollActions
): PayrollState => {
  switch (action.type) {
    case PAYROLL_GET_ALL_PAYROLL:
      return {
        ...state,
        getPayrollIsLoading: true,
      };
    case PAYROLL_GET_ALL_PAYROLL_FAILURE:
      return {
        ...state,
        getPayrollIsLoading: false,
      };
    case PAYROLL_GET_ALL_PAYROLL_SUCCESS:
      return {
        ...state,
        payroll: action.AllPayroll,
        getPayrollIsLoading: false,
      };
    case PAYROLL_CREATE_PAYROLL:
      return {
        ...state,
        createPayrollIsLoading: true,
      };
    case PAYROLL_CREATE_PAYROLL_FAILURE:
      return {
        ...state,
        createPayrollIsLoading: false,
      };
    case PAYROLL_CREATE_PAYROLL_SUCCESS:
      return {
        ...state,
        payroll: [...state.payroll, action.createPayroll],
        createPayrollIsLoading: false,
        isPayrollCreated: true,
      };
    case PAYROLL_UPDATE_PAYROLL_EMPLOYEE:
      return {
        ...state,
        isPatched: false,
        updatePayrollIsloading: true,
      };
    case PAYROLL_UPDATE_PAYROLL_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isPatched: true,
        updatePayrollIsloading: false,
      };
    case PAYROLL_UPDATE_PAYROLL_EMPLOYEE_FAILURE:
      return {
        ...state,
        isPatched: false,
        updatePayrollIsloading: false,
      };
    case PAYROLL_MANAGER_REDUX_STATE_PAYROLL:
      return {
        ...state,
        ...action.state,
      };
    default:
      return state;
  }
};

export default payroll;
