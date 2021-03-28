import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../rootReducer/reducerIndex';
import rootSaga from '../rootSaga/sagaIndex';

const sagaMiddleware = createSagaMiddleware();
let store;

if( process.env.NODE_ENV === 'production' ) {
    store = createStore( rootReducer, applyMiddleware(sagaMiddleware) );
}
else {
    store = createStore( rootReducer, applyMiddleware(sagaMiddleware, createLogger()) );
}
sagaMiddleware.run(rootSaga);

export default store;