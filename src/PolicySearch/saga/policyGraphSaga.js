/**
 * Used to handle all the side-effects amd make API calls
 */
import { takeLatest, put} from 'redux-saga/effects';
import { 
    GET_ALL_REGIONS_IN_DATA,
    GET_ALL_REGIONS_IN_DATA_SUCCESS,
    GET_ALL_REGIONS_IN_DATA_ERROR,
    GET_POLICY_DATA_OF_REGION,
    GET_POLICY_DATA_OF_REGION_ERROR,
    GET_POLICY_DATA_OF_REGION_SUCCESS
 } from "../actions/constants";
 import axios from "../../API/api";

/**
 * 1.)
 * Used to get all Unique regions from the server and
 * set the success/error message according to the response
 */
function* getAllRegions(){
    try{
        /**
         * 1.)
         * When screen mounts first time, it fetches all unique places
         * from the REST API
         */
        const regions = yield axios.get('getAllRegions')
        .then(data=>data.data)
        .catch(err=>{
            let e = new Error();
            if(err.response&&err.response.data.message) e.message = err.response.data.message;
            else e.message = err.message;
            throw(e)
        })

        if(regions&&regions.data){
            const regionsArr = []
            for( const r in regions.data) regionsArr.push(`${r[0].toUpperCase()}${r.substr(1)}`);

            yield put({ type: GET_ALL_REGIONS_IN_DATA_SUCCESS, payload : regionsArr });
            /**
             * 2.)
             * Once you get all the unique regions and it's pushed to dropdown, we make
             * a call to sever to fetch number of policies/month of the first region that
             * will be displayed in the dropdown when screen mounts
             */
            yield* getPolicyDataOfARegion({payload : regionsArr[0]});
        }

    }catch(err){
        yield put({ type : GET_ALL_REGIONS_IN_DATA_ERROR, payload : err.message})
    }
}

/**
 * 2.)
 * Used to get the number of policies per month
 * in that region and used to set the success/error message
 * accordingly
 */
function* getPolicyDataOfARegion(action){
    try{
        const region = action.payload;
        const policyDataOfRegion = yield axios.get(`getPoliciesOfRegion/${region}`)
        .then(data=>data.data)
        .catch(err=>{
            let e = new Error();
            if(err.response&&err.response.data.message) e.message = err.response.data.message;
            else e.message = err.message;
            throw(e)
        })

        yield put({ type : GET_POLICY_DATA_OF_REGION_SUCCESS, payload : policyDataOfRegion.data});
    }catch(err){
        yield put({ type : GET_POLICY_DATA_OF_REGION_ERROR, payload : err.message})
    }
}

/**
 * Main Saga driver function where a dispatched action lands to.
 */
export default function* policyGraphSaga() {
    yield takeLatest( GET_ALL_REGIONS_IN_DATA, getAllRegions );
    yield takeLatest( GET_POLICY_DATA_OF_REGION, getPolicyDataOfARegion );
}