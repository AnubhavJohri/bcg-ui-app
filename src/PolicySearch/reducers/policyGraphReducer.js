import { 
    GET_ALL_REGIONS_IN_DATA_SUCCESS,
    GET_ALL_REGIONS_IN_DATA_ERROR, 
    GET_POLICY_DATA_OF_REGION_SUCCESS,
    GET_POLICY_DATA_OF_REGION_ERROR,
    RESET_POLICY_DATA_OF_REGION} from "../actions/constants";

const initialState = () =>{
    return {
        policiesPerRegion : null,
        policiesPerRegionError : '',
        allRegionsError : '',
        allRegions : null,
        
    }
}

const policyGraphReducer = ( state = initialState(), action ) =>{
    switch(action.type){
        case GET_ALL_REGIONS_IN_DATA_SUCCESS:
            return {
                ...state,
                allRegions : action.payload,
                allRegionsError : '' 
            }
        case GET_POLICY_DATA_OF_REGION_SUCCESS:
            return {
                ...state,
                policiesPerRegion : action.payload,   
                policiesPerRegionError : ''     
            }
        case GET_POLICY_DATA_OF_REGION_ERROR:
            return {
                ...state,
                policiesPerRegion : null,
                policiesPerRegionError : action.payload        
            }
        case GET_ALL_REGIONS_IN_DATA_ERROR:
            return {
                ...state,
                allRegionsError : action.payload,
                allRegions : null,     
            }
        case RESET_POLICY_DATA_OF_REGION:
            return{
                ...state,
                policiesPerRegion : null,
                allRegionsError : '',
            }
        default:
            return {...state}
    }
}

export default policyGraphReducer;