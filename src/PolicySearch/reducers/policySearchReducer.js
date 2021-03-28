import { 
    GET_POLICY_ID_DETAILS_ERROR, 
    GET_POLICY_ID_DETAILS_SUCCESS,
    RESET_POLICY_DETAILS,
    SAVE_NEW_POLICY_DETAILS_ERROR,
    SAVE_NEW_POLICY_DETAILS_SUCCESS } from "../actions/constants";

const initialState = () =>{
    return {
        receivedPolicyDetails : null,
        receivedPolicyError : '',
        savePolicyDetailsError : '',
        savePolicyDetailsSuccess : ''
    }
}

const policySearchReducer = ( state = initialState(), action ) =>{
    switch(action.type){
        case GET_POLICY_ID_DETAILS_SUCCESS:
            return {
                ...state,
                receivedPolicyDetails : action.payload,
                receivedPolicyError : ''
            }
        case GET_POLICY_ID_DETAILS_ERROR:
            return {
                ...state,
                receivedPolicyError : action.payload,
                receivedPolicyDetails : null,
            }
        case RESET_POLICY_DETAILS:
            return {
                receivedPolicyError : '',
                receivedPolicyDetails : null,
                savePolicyDetailsError : '',
                savePolicyDetailsSuccess : ''
            }
        case SAVE_NEW_POLICY_DETAILS_SUCCESS:
            return {
                ...state,
                savePolicyDetailsSuccess : action.payload,
                savePolicyDetailsError : ''
            }
        case SAVE_NEW_POLICY_DETAILS_ERROR:
            return {
                ...state,
                savePolicyDetailsSuccess : '',
                savePolicyDetailsError : action.payload
            }
        default:
            return {...state}
    }
}

export default policySearchReducer;