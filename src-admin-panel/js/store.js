import 'babel-polyfill';
import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/index';
import reducers from './reducers';

const sagaMiddleware = createSagaMiddleware();
let devtools = window['devToolsExtension']
  ? window['devToolsExtension']()
  : f => f;

export default createStore(
  reducers,
  compose(
    applyMiddleware(sagaMiddleware),
    devtools
  )
);

sagaMiddleware.run(rootSaga);
