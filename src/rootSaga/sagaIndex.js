import { all, fork } from 'redux-saga/effects';
import policyGraphSaga from '../PolicySearch/saga/policyGraphSaga';
import policySearchSaga from '../PolicySearch/saga/policySearchSaga';

export default function* rootSaga(){
    yield all([
        fork(policyGraphSaga),
        fork(policySearchSaga)
    ])
}