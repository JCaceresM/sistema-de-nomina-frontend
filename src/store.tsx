import { applyMiddleware, createStore } from "redux"
import createSagaMiddleware from "redux-saga"
// import logger from 'redux-logger';
import { composeWithDevTools } from "redux-devtools-extension"

import rootReducer from "./reducers/root_reducers"
import rootSaga from "./sagas/root_saga"

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)
sagaMiddleware.run(rootSaga)
export default store
