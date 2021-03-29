/**
 * Used to handle all the side-effects amd make API calls
 */
import axios from '../../API/api';
import { takeLatest, put} from 'redux-saga/effects';
import { 
    GET_POLICY_ID_DETAILS, 
    GET_POLICY_ID_DETAILS_ERROR, 
    GET_POLICY_ID_DETAILS_SUCCESS, 
    SAVE_NEW_POLICY_DETAILS, 
    SAVE_NEW_POLICY_DETAILS_SUCCESS,
    SAVE_NEW_POLICY_DETAILS_ERROR } from '../actions/constants';

/**
 * Used to fetch the policy details of a particular
 * policy-id based on the input policy-id 
 */
function* getPolicyIdDetails(action){
    try{
        const id = action.payload;
        const response = yield axios.get(`getPolicy/${id}`)
        .then(data=>data.data)
        .catch(err=>{
            let e = new Error();
            if(err.response&&err.response.data.message) e.message = err.response.data.message;
            else e.message = err.message;
            throw(e)
        })

        if(response&&response.data){
            yield put( { type : GET_POLICY_ID_DETAILS_SUCCESS, payload : response.data} );
        }
    }catch(err){
        yield put( { type: GET_POLICY_ID_DETAILS_ERROR, payload: err.message } );
    }
}

/**
 * Used to save the new policy details. Sends the
 * updated details to the server for storing 
 */
function* saveNewPolicyDetails(action){
    const id = action.payload.policyId;
    try{
        const res = yield axios.put(`updatePolicyDetails/${id}`, {data:action.payload})
        .then(data=>data.data)
        .catch(err=>{
            let e = new Error();
            if(err.response&&err.response.data.message) e.message = err.response.data.message;
            else e.message = err.message;
            throw(e)
        })

        if(res&&res.message){
            yield put({type: SAVE_NEW_POLICY_DETAILS_SUCCESS, payload: res.message});
        }
    }catch(err){
        yield put({type: SAVE_NEW_POLICY_DETAILS_ERROR, payload: err.message});
    }
}

/**
 * Main Saga driver function where a dispatched action lands to.
 */
export default function* policySearchSaga() {
    yield takeLatest( GET_POLICY_ID_DETAILS, getPolicyIdDetails );
    yield takeLatest( SAVE_NEW_POLICY_DETAILS, saveNewPolicyDetails );
}