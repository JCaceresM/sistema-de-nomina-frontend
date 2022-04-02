import {
  PAYROLL_NEWS_CREATE_PAYROLL_NEWS,
  PAYROLL_NEWS_CREATE_PAYROLL_NEWS_EMPLOYEE,
  PAYROLL_NEWS_CREATE_PAYROLL_NEWS_EMPLOYEE_FAILURE,
  PAYROLL_NEWS_CREATE_PAYROLL_NEWS_EMPLOYEE_SUCCESS,
  PAYROLL_NEWS_CREATE_PAYROLL_NEWS_FAILURE,
  PAYROLL_NEWS_CREATE_PAYROLL_NEWS_SUCCESS,
  PAYROLL_NEWS_GET_COLLECTION,
  PAYROLL_NEWS_GET_COLLECTION_FAILURE,
  PAYROLL_NEWS_GET_COLLECTION_SUCCESS,
  PAYROLL_NEWS_GET_PAYROLL_NEWS_EMPLOYEE,
  PAYROLL_NEWS_GET_PAYROLL_NEWS_EMPLOYEE_FAILURE,
  PAYROLL_NEWS_GET_PAYROLL_NEWS_EMPLOYEE_SUCCESS,
  PAYROLL_NEWS_MANAGER_REDUX_STATE_PAYROLL_NEWS,
  PAYROLL_NEWS_UPDATE_PAYROLL_NEWS,
  PAYROLL_NEWS_UPDATE_PAYROLL_NEWS_FAILURE,
  PAYROLL_NEWS_UPDATE_PAYROLL_NEWS_SUCCESS,
} from "../../constants/payroll-news/payroll-news.constants";
import { ResponseMetadata } from "../../common/types/response.type";
import {
  PayrollNews,
  PayrollNewsType,
} from "../../actions/payroll-news/payroll-news.actions";

export type PayrollNewsState = {
  getPayrollNewsEmployeeIsLoading: boolean;
  getPayrollNewsIsLoading: boolean;
  createPayrollNewsIsLoading: boolean;
  updatePayrollNewsIsLoading: boolean;
  createPayrollNewsEmployeeIsLoading: boolean;
  isPayrollNewsEmployeeCreated: boolean;
  isPayrollNewsEmployeeUpdated: boolean;
  isPayrollNewsCreated: boolean;
  payrollNews: PayrollNewsType[];
  payrollNewsEmployee: PayrollNewsType[];
  payrollNewsMetadata: ResponseMetadata;
};

const initialState = {
  getPayrollNewsIsLoading: false,
  createPayrollNewsIsLoading: false,
  isPayrollNewsEmployeeUpdated: false,
  getPayrollNewsEmployeeIsLoading: false,
  createPayrollNewsEmployeeIsLoading: false,
  isPayrollNewsEmployeeCreated: false,
  updatePayrollNewsIsLoading: false,
  isPayrollNewsCreated: false,
  payrollNews: new Array<PayrollNewsType>(),
  payrollNewsEmployee: new Array<PayrollNewsType>(),
  payrollNewsMetadata: {} as ResponseMetadata,
};

const payrollNews = (
  state: PayrollNewsState = initialState,
  action: PayrollNews
): PayrollNewsState => {
  switch (action.type) {
    case PAYROLL_NEWS_GET_COLLECTION:
      return {
        ...state,
        getPayrollNewsIsLoading: true,
      };
    case PAYROLL_NEWS_GET_COLLECTION_FAILURE:
      return {
        ...state,
        payrollNews: [],

        getPayrollNewsIsLoading: false,
      };
    case PAYROLL_NEWS_GET_COLLECTION_SUCCESS:
      return {
        ...state,
        payrollNews: action.payrollNewsCollection,
        getPayrollNewsIsLoading: false,
      };
    case PAYROLL_NEWS_CREATE_PAYROLL_NEWS:
      return {
        ...state,
        createPayrollNewsIsLoading: true,
      };
    case PAYROLL_NEWS_CREATE_PAYROLL_NEWS_FAILURE:
      return {
        ...state,
        createPayrollNewsIsLoading: false,
      };
    case PAYROLL_NEWS_CREATE_PAYROLL_NEWS_SUCCESS:
      return {
        ...state,
        payrollNews: [...state.payrollNews, action?.createPayrollNews],
        createPayrollNewsIsLoading: false,
        isPayrollNewsCreated: true,
      };
    case PAYROLL_NEWS_CREATE_PAYROLL_NEWS_EMPLOYEE:
      return {
        ...state,
        createPayrollNewsEmployeeIsLoading: true,
        isPayrollNewsEmployeeCreated: true,
      };
    case PAYROLL_NEWS_CREATE_PAYROLL_NEWS_EMPLOYEE_SUCCESS:
      return {
        ...state,
        createPayrollNewsEmployeeIsLoading: false,
        isPayrollNewsEmployeeCreated: true,
      };
    case PAYROLL_NEWS_CREATE_PAYROLL_NEWS_EMPLOYEE_FAILURE:
      return {
        ...state,
        createPayrollNewsEmployeeIsLoading: false,
        isPayrollNewsEmployeeCreated: true,
      };
    case PAYROLL_NEWS_GET_PAYROLL_NEWS_EMPLOYEE:
      return {
        ...state,
        getPayrollNewsEmployeeIsLoading: true,
      };
    case PAYROLL_NEWS_GET_PAYROLL_NEWS_EMPLOYEE_SUCCESS:
      return {
        ...state,
        getPayrollNewsEmployeeIsLoading: false,
        payrollNewsEmployee: action.payrollNewsEmployee || [],
      };
    case PAYROLL_NEWS_GET_PAYROLL_NEWS_EMPLOYEE_FAILURE:
      return {
        ...state,
        getPayrollNewsEmployeeIsLoading: false,
      };
    case PAYROLL_NEWS_MANAGER_REDUX_STATE_PAYROLL_NEWS:
      return {
        ...state,
        isPayrollNewsEmployeeUpdated: true,
      };
    case PAYROLL_NEWS_UPDATE_PAYROLL_NEWS:
      return {
        ...state,
        isPayrollNewsEmployeeUpdated: false,
        updatePayrollNewsIsLoading: true,
      };
    case PAYROLL_NEWS_UPDATE_PAYROLL_NEWS_SUCCESS:
      return {
        ...state,

        isPayrollNewsEmployeeUpdated: true,
        updatePayrollNewsIsLoading: false,
      };
    case PAYROLL_NEWS_UPDATE_PAYROLL_NEWS_FAILURE:
      return {
        ...state,
        isPayrollNewsEmployeeUpdated: false,
        updatePayrollNewsIsLoading: false,
      };
    default:
      return state;
  }
};

export default payrollNews;
