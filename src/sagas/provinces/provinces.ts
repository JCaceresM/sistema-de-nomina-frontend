import { call, ForkEffect, put, takeLatest } from "redux-saga/effects";
import { getAllProvincesFailure, getAllProvincesSuccess } from "../../actions/provinces/provinces.actions";
import { ResponseGenerator } from "../../common/types/response.type";
import { PROVINCES_GET_ALL_PROVINCES } from "../../constants/provinces/provinces.constants";
import { GeneralRequest } from "../../services/general.api";

const { getProvinces } = GeneralRequest
function* getAllProvincesSaga() {
  try {

    const response: ResponseGenerator = yield call(() =>
      getProvinces()
    )
    const { data, } = response

    yield put(getAllProvincesSuccess(data,))
  } catch (error) {
    yield put(getAllProvincesFailure())
  }
}
function* watchGetAllProvinces(): Generator<ForkEffect<never>, void, unknown> {
  
  yield takeLatest(PROVINCES_GET_ALL_PROVINCES, getAllProvincesSaga)
}

export { watchGetAllProvinces, }
