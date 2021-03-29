import { all, fork } from 'redux-saga/effects';
import policyGraphSaga from '../PolicySearch/saga/policyGraphSaga';
import policySearchSaga from '../PolicySearch/saga/policySearchSaga';

/**
 * rootSaga() accumulates all the sagas in this and retuns
 * a single object to store
 * 
 * forking each saga here makes sure that all sagas are running parallel to
 * each other and none is blocking the other process
 */
export default function* rootSaga(){
    yield all([
        fork(policyGraphSaga),
        fork(policySearchSaga)
    ])
}