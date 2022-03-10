import { call, ForkEffect, put, takeLatest } from "redux-saga/effects";
import {
  CreatePayrollNews,
  createPayrollNewsFailure,
  createPayrollNewsSuccess,
  GetPayrollNewsCollectionAction,
  getPayrollNewsCollectionFailure,
  getPayrollNewsCollectionSuccess,
} from "../../actions/payroll-news/payroll-news.actions";

import { SelectConditionType } from "../../common/types/general.type";
import { ResponseGenerator } from "../../common/types/response.type";
import {
  PAYROLL_NEWS_CREATE_PAYROLL_NEWS,
  PAYROLL_NEWS_GET_COLLECTION,
} from "../../constants/payroll-news/payroll-news.constants";
import { PayrollNewsApiRequest } from "../../services/payroll-news.api";

const { getPayrollNews, createPayrollNews } = PayrollNewsApiRequest;
function* getPayrollNewsSaga ({
  searchConditions,
}: GetPayrollNewsCollectionAction) {
  try {
    const response: ResponseGenerator = yield call(() =>
      getPayrollNews(searchConditions as unknown as SelectConditionType[])
    );

    const { data } = response.data;
    yield put(getPayrollNewsCollectionSuccess(data));
  } catch (error) {
    yield put(getPayrollNewsCollectionFailure());
  }
}

function* watchGetPayrollNews (): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(PAYROLL_NEWS_GET_COLLECTION, getPayrollNewsSaga);
}
function* createPayrollNewsSaga (body: CreatePayrollNews) {
  try {
    const response: ResponseGenerator = yield call(() =>
      createPayrollNews(body.createPayrollNews)
    );

    const { data } = response;

    yield put(createPayrollNewsSuccess(data));
  } catch (error) {
    yield put(createPayrollNewsFailure());
  }
}

function* watchCreatePayrollNews (): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(PAYROLL_NEWS_CREATE_PAYROLL_NEWS, createPayrollNewsSaga);
}

export { watchGetPayrollNews, watchCreatePayrollNews };
