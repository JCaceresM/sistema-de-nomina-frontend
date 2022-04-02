import { call, ForkEffect, put, takeLatest } from "redux-saga/effects";
import {
  CreatePayrollNews,
  CreatePayrollNewsEmployee,
  createPayrollNewsEmployeeFailure,
  createPayrollNewsEmployeeSuccess,
  createPayrollNewsFailure,
  createPayrollNewsSuccess,
  GetPayrollNewsCollectionAction,
  getPayrollNewsCollectionFailure,
  getPayrollNewsCollectionSuccess,
  GetPayrollNewsEmployee,
  getPayrollNewsEmployeeSuccess,
  UpdatePayrollNews,
  updatePayrollNewsFailure,
  updatePayrollNewsSuccess,
} from "../../actions/payroll-news/payroll-news.actions";

import { SelectConditionType } from "../../common/types/general.type";
import { ResponseGenerator } from "../../common/types/response.type";
import {
  PAYROLL_NEWS_CREATE_PAYROLL_NEWS,
  PAYROLL_NEWS_CREATE_PAYROLL_NEWS_EMPLOYEE,
  PAYROLL_NEWS_GET_COLLECTION,
  PAYROLL_NEWS_GET_PAYROLL_NEWS_EMPLOYEE,
  PAYROLL_NEWS_UPDATE_PAYROLL_NEWS,
} from "../../constants/payroll-news/payroll-news.constants";
import { PayrollNewsApiRequest } from "../../services/payroll-news.api";

const {
  getPayrollNews,
  createPayrollNews,
  createPayrollNewsEmployee,
  getPayrollNewsEmployee,updatePayrollNews
} = PayrollNewsApiRequest;
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

function* createPayrollNewsEmployeeSaga (body: CreatePayrollNewsEmployee) {
  try {
    yield call(() =>
      createPayrollNewsEmployee(body.employee_id, body.payrollNews)
    );

    yield put(createPayrollNewsEmployeeSuccess());
  } catch (error) {
    yield put(createPayrollNewsEmployeeFailure());
  }
}

function* watchCreatePayrollEmployeeNews (): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(
    PAYROLL_NEWS_CREATE_PAYROLL_NEWS_EMPLOYEE,
    createPayrollNewsEmployeeSaga
  );
}
function* getPayrollNewsEmployeeSaga (body: GetPayrollNewsEmployee) {
  try {
    const response: ResponseGenerator = yield call(() =>
      getPayrollNewsEmployee(body.employee_id, body.searchConditions)
    );
    const { data } = response;

    yield put(getPayrollNewsEmployeeSuccess(data));
  } catch (error) {
    yield put(createPayrollNewsEmployeeFailure());
  }
}

function* watchGetPayrollEmployeeNews (): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(
    PAYROLL_NEWS_GET_PAYROLL_NEWS_EMPLOYEE,
    getPayrollNewsEmployeeSaga
  );
}
function* updatePayrollNewsEmployeeSaga (body: UpdatePayrollNews) {
  try {
    const response: ResponseGenerator = yield call(() =>
    updatePayrollNews(body.id, body.patchRecord)
    );
    const { data } = response;

    yield put(updatePayrollNewsSuccess(data));
  } catch (error) {
    yield put(updatePayrollNewsFailure());
  }
}

function* watchUpdatePayrollEmployeeNews (): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(
    PAYROLL_NEWS_UPDATE_PAYROLL_NEWS,
    updatePayrollNewsEmployeeSaga
  );
}
export {
  watchGetPayrollNews,
  watchCreatePayrollNews,
  watchUpdatePayrollEmployeeNews,
  watchCreatePayrollEmployeeNews,
  watchGetPayrollEmployeeNews,
};
