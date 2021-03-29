/**
 * policyGraphReducer keeps all the data related to the screen displaying
 * the policis/region per month as bar chart
 */
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
        /**
         * Stores all unique region values fetched from
         * the server in redux store
         */
        case GET_ALL_REGIONS_IN_DATA_SUCCESS:
            return {
                ...state,
                allRegions : action.payload,
                allRegionsError : '' 
            }
        /**
         * Stores number of policies/month fetched from
         * the server in redux store
         */
        case GET_POLICY_DATA_OF_REGION_SUCCESS:
            return {
                ...state,
                policiesPerRegion : action.payload,   
                policiesPerRegionError : ''     
            }
        /**
         * Stores the error message fetched from
         * the server in redux store
         */
        case GET_POLICY_DATA_OF_REGION_ERROR:
            return {
                ...state,
                policiesPerRegion : null,
                policiesPerRegionError : action.payload        
            }
        /**
         * Stores the error message fetched from
         * the server in redux store
         */
        case GET_ALL_REGIONS_IN_DATA_ERROR:
            return {
                ...state,
                allRegionsError : action.payload,
                allRegions : null,     
            }
        /**
         * Used to reset the success/error message
         */
        case RESET_POLICY_DATA_OF_REGION:
            return{
                ...state,
                policiesPerRegion : null,
                allRegionsError : '',
            }
        /**
         * Used to handle case where none of the above case
         * matches
         */
        default:
            return {...state}
    }
}

export default policyGraphReducer;