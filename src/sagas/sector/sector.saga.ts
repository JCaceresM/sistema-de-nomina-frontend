import { call, ForkEffect, put, takeLatest } from "redux-saga/effects";
import { GetSectorAction, getSectorFailure, getSectorSuccess } from "../../actions/sector/sector.actions";
import { ResponseGenerator } from "../../common/types/response.type";
import { SECTOR_GET_SECTOR } from "../../constants/sector/sector.constants";
import { GeneralRequest } from "../../services/general.api";

const { getSector } = GeneralRequest
function* getSectorsSaga ({MunicipalityId}:GetSectorAction) {
  try {

    const response: ResponseGenerator = yield call(() =>
    getSector({MunicipalityId})
    )
    const { data, } = response

    yield put(getSectorSuccess(data,))
  } catch (error) {
    yield put(getSectorFailure())
  }
}

function* watchGetSectors (): Generator<ForkEffect<never>, void, unknown> {
  
  yield takeLatest(SECTOR_GET_SECTOR, getSectorsSaga)
}

export { watchGetSectors  }
