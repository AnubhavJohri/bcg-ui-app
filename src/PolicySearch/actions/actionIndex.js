import { 
    GET_ALL_REGIONS_IN_DATA, 
    GET_POLICY_DATA_OF_REGION, 
    RESET_POLICY_DATA_OF_REGION,
    GET_POLICY_ID_DETAILS,
    RESET_POLICY_DETAILS,
    SAVE_NEW_POLICY_DETAILS,
    RESET_SAVE_POLICY_DETAILS_SUCCESS_ERROR_MESSAGE
 } from './constants'

export const getAllRegions = () =>{
    return {
        type : GET_ALL_REGIONS_IN_DATA
    }
}

export const getPoliciesPerRegion = (region) =>{
    return {
        type : GET_POLICY_DATA_OF_REGION,
        payload : region
    }
}

export const resetPoliciesPerRegion = () =>{
    return {
        type : RESET_POLICY_DATA_OF_REGION,
    }
}

export const getPolicyDetails = (id) =>{
    return {
        type : GET_POLICY_ID_DETAILS,
        payload : id
    }
}

export const resetPolicyDetails = () =>{
    return {
        type : RESET_POLICY_DETAILS,
    }
}

export const saveNewPolicyDetails = ( newDetails ) =>{
    return {
        type : SAVE_NEW_POLICY_DETAILS,
        payload : newDetails
    }
}

export const resetSavePolicyDetailsSuccessErrorMessage = (  ) =>{
    return {
        type : RESET_SAVE_POLICY_DETAILS_SUCCESS_ERROR_MESSAGE,
    }
}