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
//  import axios from 'axios';

function* getAllRegions(){
    try{
        const regions = yield axios.get('getAllRegions')
        .then(data=>data.data)

        if(regions&&regions.data){
            // console.log('got the data of all regions', regions);
            const regionsArr = []
            for( const r in regions.data) regionsArr.push(`${r[0].toUpperCase()}${r.substr(1)}`);
            console.log('got the data of all regions', regionsArr, regions.data);
            yield put({ type: GET_ALL_REGIONS_IN_DATA_SUCCESS, payload : regionsArr });

            yield* getPolicyDataOfARegion({payload : regionsArr[0]});
        }

    }catch(err){
        yield put({ type : GET_ALL_REGIONS_IN_DATA_ERROR, payload : err.message})
    }
}

function* getPolicyDataOfARegion(action){
    try{
        const region = action.payload;
        const policyDataOfRegion = yield axios.get(`getPoliciesOfRegion/${region}`)
        .then(data=>data.data)
        yield put({ type : GET_POLICY_DATA_OF_REGION_SUCCESS, payload : policyDataOfRegion.data});
    }catch(err){
        yield put({ type : GET_POLICY_DATA_OF_REGION_ERROR, payload : err.message})
    }
}


export default function* policyGraphSaga() {
    yield takeLatest( GET_ALL_REGIONS_IN_DATA, getAllRegions );
    yield takeLatest( GET_POLICY_DATA_OF_REGION, getPolicyDataOfARegion );
}