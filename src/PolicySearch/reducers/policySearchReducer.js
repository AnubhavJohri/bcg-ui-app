/**
 * policySearchReducer keeps all the data related to the screen used
 * to find the policy details and updating it
 */
import { 
    GET_POLICY_ID_DETAILS_ERROR, 
    GET_POLICY_ID_DETAILS_SUCCESS,
    RESET_POLICY_DETAILS,
    SAVE_NEW_POLICY_DETAILS_ERROR,
    SAVE_NEW_POLICY_DETAILS_SUCCESS,
    RESET_SAVE_POLICY_DETAILS_SUCCESS_ERROR_MESSAGE } from "../actions/constants";

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
        /**
         * Stores all polcy detail values fetched from
         * the server in redux store
         */
        case GET_POLICY_ID_DETAILS_SUCCESS:
            return {
                ...state,
                receivedPolicyDetails : action.payload,
                receivedPolicyError : ''
            }
        /**
         * Stores the error message fetched from
         * the server in redux store
         */
        case GET_POLICY_ID_DETAILS_ERROR:
            return {
                ...state,
                receivedPolicyError : action.payload,
                receivedPolicyDetails : null,
            }
        /**
         * Used to reset the success/error message
         * and other values
         */
        case RESET_POLICY_DETAILS:
            return {
                receivedPolicyError : '',
                receivedPolicyDetails : null,
                savePolicyDetailsError : '',
                savePolicyDetailsSuccess : ''
            }
        /**
         * Used to store the success message from the server
         * when updated policy details successfully
         */
        case SAVE_NEW_POLICY_DETAILS_SUCCESS:
            return {
                ...state,
                savePolicyDetailsSuccess : action.payload,
                savePolicyDetailsError : ''
            }
        /**
         * Used to store the error message from the server
         * when policy details not updated
         */
        case SAVE_NEW_POLICY_DETAILS_ERROR:
            return {
                ...state,
                savePolicyDetailsSuccess : '',
                savePolicyDetailsError : action.payload
            }
        /**
         * Reset the success/error messaged
         */
        case RESET_SAVE_POLICY_DETAILS_SUCCESS_ERROR_MESSAGE:
            return {
                ...state,
                savePolicyDetailsSuccess : '',
                savePolicyDetailsError : ''
            }
        /**
         * Used to handle case where none of the above case
         * matches
         */
        default:
            return {...state}
    }
}

export default policySearchReducer;