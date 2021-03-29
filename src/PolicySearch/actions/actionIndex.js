import { 
    GET_ALL_REGIONS_IN_DATA, 
    GET_POLICY_DATA_OF_REGION, 
    RESET_POLICY_DATA_OF_REGION,
    GET_POLICY_ID_DETAILS,
    RESET_POLICY_DETAILS,
    SAVE_NEW_POLICY_DETAILS,
    RESET_SAVE_POLICY_DETAILS_SUCCESS_ERROR_MESSAGE
 } from './constants'

/**
 * 1.)
 * Used to make call to server to fetch all the Unique Regions
 */
export const getAllRegions = () =>{
    return {
        type : GET_ALL_REGIONS_IN_DATA
    }
}

/**
 * 2.)
 * Used to make call to server to fetch policies/month per region
 */
export const getPoliciesPerRegion = (region) =>{
    return {
        type : GET_POLICY_DATA_OF_REGION,
        payload : region
    }
}

/**
 * 3.)
 * Used to reset all the current values holding the policies/region/month in redux store
 */
export const resetPoliciesPerRegion = () =>{
    return {
        type : RESET_POLICY_DATA_OF_REGION,
    }
}

/**
 * 4.)
 * Used to make a call to server and fetch the policy details related to the
 * policy-id passed in params
 */
export const getPolicyDetails = (id) =>{
    return {
        type : GET_POLICY_ID_DETAILS,
        payload : id
    }
}

/**
 * 5.)
 * Used to reset values holding policy details in the redux store
 */
export const resetPolicyDetails = () =>{
    return {
        type : RESET_POLICY_DETAILS,
    }
}

/**
 * 6.)
 * Used to make a call to the server to update the new details of given policy-id
 */
export const saveNewPolicyDetails = ( newDetails ) =>{
    return {
        type : SAVE_NEW_POLICY_DETAILS,
        payload : newDetails
    }
}

/**
 * 7.)
 * Used to reset the error/success message in the redux store
 */
export const resetSavePolicyDetailsSuccessErrorMessage = (  ) =>{
    return {
        type : RESET_SAVE_POLICY_DETAILS_SUCCESS_ERROR_MESSAGE,
    }
}