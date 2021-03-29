import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../rootReducer/reducerIndex';
import rootSaga from '../rootSaga/sagaIndex';

const sagaMiddleware = createSagaMiddleware();
let store;

/**
 * Creates the Redux store and initializes the Saga middleware
 */
if( process.env.NODE_ENV === 'production' ) {
    // We don't wish to see saga-logs in the productions hence these if-else blocks
    store = createStore( rootReducer, applyMiddleware(sagaMiddleware) );
}
// To remove the saga-logs in the production
else {
    store = createStore( rootReducer, applyMiddleware(sagaMiddleware, createLogger()) );
}
sagaMiddleware.run(rootSaga);

export default store;