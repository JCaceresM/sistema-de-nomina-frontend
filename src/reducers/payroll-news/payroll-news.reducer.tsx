import {
  PAYROLL_NEWS_CREATE_PAYROLL_NEWS,
  PAYROLL_NEWS_CREATE_PAYROLL_NEWS_FAILURE,
  PAYROLL_NEWS_CREATE_PAYROLL_NEWS_SUCCESS,
  PAYROLL_NEWS_GET_COLLECTION,
  PAYROLL_NEWS_GET_COLLECTION_FAILURE,
  PAYROLL_NEWS_GET_COLLECTION_SUCCESS,
  PAYROLL_NEWS_MANAGER_REDUX_STATE_PAYROLL_NEWS,
} from "../../constants/payroll-news/payroll-news.constants";
import { ResponseMetadata } from "../../common/types/response.type";
import {
  PayrollNews,
  PayrollNewsType,
} from "../../actions/payroll-news/payroll-news.actions";

export type PayrollNewsState = {
  getPayrollNewsIsLoading: boolean;
  createPayrollNewsIsLoading: boolean;
  isPayrollNewsCreated: boolean;
  PayrollNews: PayrollNewsType[];
  PayrollNewsMetadata: ResponseMetadata;
};

const initialState = {
  getPayrollNewsIsLoading: false,
  createPayrollNewsIsLoading: false,
  isPayrollNewsCreated: false,
  PayrollNews: new Array<PayrollNewsType>(),
  PayrollNewsMetadata: {} as ResponseMetadata,
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
        getPayrollNewsIsLoading: false,
      };
    case PAYROLL_NEWS_GET_COLLECTION_SUCCESS:
      return {
        ...state,
        PayrollNews: action.payrollNewsCollection,
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
        PayrollNews: [...state.PayrollNews, action.createPayrollNews],
        createPayrollNewsIsLoading: false,
        isPayrollNewsCreated: true,
      };
    case PAYROLL_NEWS_MANAGER_REDUX_STATE_PAYROLL_NEWS:
      return {
        ...state,
        ...action.state,
      };
    default:
      return state;
  }
};

export default payrollNews;
