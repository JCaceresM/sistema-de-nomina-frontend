import { call, ForkEffect, put, takeLatest } from "redux-saga/effects";
import { ResponseGenerator } from "../../common/types/response.type";
import { SelectConditionType } from "../../common/types/general.type";
import {
  CreateAccountAction,
  createAccountFailure,
  createAccountSuccess,
  GetAccountsAction,
  getAccountsFailure,
  getAccountsSuccess,
  UpdateAccountAction,
  updateAccountFailure,
  updateAccountSuccess,
} from "../../actions/accounts/accounts.actions";
import {
  ACCOUNT_CREATE_ACCOUNT,
  ACCOUNT_GET_ACCOUNT,
  ACCOUNT_UPDATE_ACCOUNT,
} from "../../constants/accounts/accounts.constants";
import { AccountsApiRequest } from "../../services/accounts.api";

const { getAccounts, createAccount, updateAccount } = AccountsApiRequest;
function* getAccountsSaga ({ pagination, searchConditions }: GetAccountsAction) {
  try {
    const response: ResponseGenerator = yield call(() =>
      getAccounts({
        pagination,
        searchConditions: searchConditions as unknown as SelectConditionType,
      })
    );

    const { data, meta = {} } = response.data;

    yield put(getAccountsSuccess(data, meta.pagination || {}));
  } catch (error) {
    yield put(getAccountsFailure());
  }
}

function* watchGetAccounts (): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(ACCOUNT_GET_ACCOUNT, getAccountsSaga);
}
function* createAccountsSaga ({ create }: CreateAccountAction) {
  try {
    const response: ResponseGenerator = yield call(() => createAccount(create));

    const { data } = response;
    yield put(createAccountSuccess(data));
  } catch (error) {
    yield put(createAccountFailure());
  }
}

function* watchCreateAccount (): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(ACCOUNT_CREATE_ACCOUNT, createAccountsSaga);
}
function* updateAccountSaga ({ patchAccount, id }: UpdateAccountAction) {
  try {
    const response: ResponseGenerator = yield call(() =>
      updateAccount(id, patchAccount)
    );

    const { data } = response;
    yield put(updateAccountSuccess(data));
  } catch (error) {
    yield put(updateAccountFailure());
  }
}

function* watchUpdateAccount (): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(ACCOUNT_UPDATE_ACCOUNT, updateAccountSaga);
}

export { watchGetAccounts, watchCreateAccount, watchUpdateAccount };
