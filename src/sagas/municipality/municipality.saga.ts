import { call, ForkEffect, put, takeLatest } from "redux-saga/effects";
import { GetMunicipalityAction, getMunicipalityFailure, getMunicipalitySuccess } from "../../actions/municipality/municipality.actions";
import { ResponseGenerator } from "../../common/types/response.type";
import { MUNICIPALITY_GET_MUNICIPALITY } from "../../constants/municipality/municipality.constants";
import { GeneralRequest } from "../../services/general.api";

const { getMunicipalities } = GeneralRequest
function* getMunicipalitiesSaga ({ProvinceId}:GetMunicipalityAction) {
  try {

    const response: ResponseGenerator = yield call(() =>
    getMunicipalities({ProvinceId})
    )
    const { data, } = response

    yield put(getMunicipalitySuccess(data,))
  } catch (error) {
    yield put(getMunicipalityFailure())
  }
}
function* watchGetMunicipalities (): Generator<ForkEffect<never>, void, unknown> {
  
  yield takeLatest(MUNICIPALITY_GET_MUNICIPALITY, getMunicipalitiesSaga)
}

export { watchGetMunicipalities, }
