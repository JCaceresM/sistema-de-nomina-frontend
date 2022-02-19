import { call, ForkEffect, put, takeLatest } from "redux-saga/effects"
import { ResponseGenerator } from "../../common/types/response.type"
import { PositionsApiRequest } from "../../services/positions.api"
import {
  CreatePositionAction,
  createPositionFailure,
  createPositionSuccess,
  getAllPositionFailure,
  getAllPositionSuccess,
  GetPositionDepartmentAction,
  getPositionDepartmentFailure,
  getPositionDepartmentSuccess,
} from "../../actions/positions/positions.actions"
import {
  POSITIONS_CREATE_POSITIONS,
  POSITIONS_GET_ALL_POSITIONS,
  POSITIONS_GET_POSITIONS_DEPARTMENT,
} from "../../constants/positions/positions.constants"

const { getPosition, createPosition,getPositionsDepartment } = PositionsApiRequest
function* getAllPositionSaga () {
  try {
    // eslint-disable-next-line no-console
    console.log("tfjghj")

    const response: ResponseGenerator = yield call(() => getPosition())

    const { data } = response
    // eslint-disable-next-line no-console
    console.log(data)

    yield put(
      getAllPositionSuccess(data, {
        currentPage: 0,
        totalPages: 0,
        count: 0,
        totalRows: 0,
        pageSize: 0,
      })
    )
  } catch (error) {
    yield put(getAllPositionFailure())
  }
}
function* watchGetAllPositions (): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(POSITIONS_GET_ALL_POSITIONS, getAllPositionSaga)
}

function* createPositionSaga ({ createData }: CreatePositionAction) {
  try {
    const response: ResponseGenerator = yield call(() =>
      createPosition(createData)
    )

    const { data } = response

    yield put(createPositionSuccess(data))
  } catch (error) {
    yield put(createPositionFailure())
  }
}

function* watchCreatePosition (): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(POSITIONS_CREATE_POSITIONS, createPositionSaga)
}
function* getPositionsDepartmentSaga ({departmentId}:GetPositionDepartmentAction) {
  try {
    

    const response: ResponseGenerator = yield call(() => getPositionsDepartment(departmentId))

    const { data } = response
    yield put(
      getPositionDepartmentSuccess(data,)
    )
  } catch (error) {
    yield put(getPositionDepartmentFailure())
  }
}
function* watchGetAllPositionsDepartment (): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(
    POSITIONS_GET_POSITIONS_DEPARTMENT,
    getPositionsDepartmentSaga
  )
}
export {
  watchGetAllPositions,
  watchCreatePosition,
  watchGetAllPositionsDepartment,
}
