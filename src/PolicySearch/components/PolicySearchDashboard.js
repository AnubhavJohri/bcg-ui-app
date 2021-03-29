/**
 * Screen that displays the Policy Search option and 
 * lets the user update the premium value in the database
 */
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { InputText} from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { getPolicyDetails, resetPolicyDetails, resetSavePolicyDetailsSuccessErrorMessage, saveNewPolicyDetails } from '../actions/actionIndex';
import DocumentTitle from "react-document-title";
import { getRightDateFormat } from "../utils/utils";
import { ProgressSpinner } from 'primereact/progressspinner';


const PolicySearchDashboard = () =>{
    const [ searchText, setSearchText ] = useState('');
    const [ premiumValue, setPremiumValue ] = useState(0);
    const [ premiumValueError, setPremiumValueError ] = useState('');
    const [ isSearchBtnClicked, setIsSearchBtnClicked ] = useState(false);
    const dispatch = useDispatch();

    //Used to get the currently selected policy details
    const receivedPolicyDetails = useSelector(state=> state && state.policySearchReducer && state.policySearchReducer.receivedPolicyDetails);
    //Used to get the currently selected policy details error message
    const receivedPolicyDetailsErrorMessage = useSelector(state=> state && state.policySearchReducer && state.policySearchReducer.receivedPolicyError);
    //Used to get the success message once we have tried to update the policy details
    const savePolicyDetailsSuccessMessage = useSelector(state=> state && state.policySearchReducer && state.policySearchReducer.savePolicyDetailsSuccess);
    //Used to get the error message once we have tried to update the policy details
    const savePolicyDetailsErrorMessage = useSelector(state=> state && state.policySearchReducer && state.policySearchReducer.savePolicyDetailsError);
    
    useEffect(()=>receivedPolicyDetails&&setPremiumValue(receivedPolicyDetails.premiumAmount), [receivedPolicyDetails])

    useEffect(()=>{
        if(receivedPolicyDetailsErrorMessage||receivedPolicyDetails) setIsSearchBtnClicked(false)
    },[ receivedPolicyDetails, receivedPolicyDetailsErrorMessage ])
    
    /**
     * Triggered when we click on the search button after typing 
     * the policy-id
     * 
     * Used to reset all the values related to the previous search
     * and initiate call for the next search to get new details
     */
    function handleSearchClick(){
        setPremiumValueError('');
        setIsSearchBtnClicked(true);
        dispatch(resetPolicyDetails());
        dispatch(getPolicyDetails(searchText));
    }

    /**
     * Triggered when we click on Save button of the policy details
     * form
     * 
     * Used to reset some success/error messages and 
     * initiate a call to the server to save the new pokicy details
     */
    function handleSubmit(e){
        e.preventDefault();
        const postOb = {
            ...receivedPolicyDetails,
            "premiumAmount" : premiumValue
        };
        dispatch(resetSavePolicyDetailsSuccessErrorMessage());
        dispatch(saveNewPolicyDetails(postOb));
    }

    /**
     * Triggered when we change the value in input-text of
     * Premium Amount. 
     * 
     * Used to set the errors used for validations and unset them
     */
    function handlePremiumAmountChange(e){
        const value = e.target.value;
        if(Number(value) > 1000000) setPremiumValueError(`Premium amount can't exceed 1 million`);
        else if(!value) setPremiumValueError(`Premium can't be empty`);
        else setPremiumValueError('');
        setPremiumValue(Number(value));
    }

    return(<div>
        {/* Used to change the tab title according to convenience */}
        <DocumentTitle title='PolicyReco | Find Policy'/>
        <h3 className='text-center display-4'>Policy Search Dashboard</h3>
        <div className='container'>
            {/* Contains the input field and search button */}
            <div className='row align-items-center' style={{padding: '20px 0'}}>
                <div className='col-lg-8 offset-lg-2 col-10 col-sm-6'>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText 
                    value={searchText} 
                    onChange={(e) => setSearchText(e.target.value)} 
                    placeholder='Type in Customer Id/ Policy Id .e.g 13112/402'
                    type="text" 
                    className="p-inputtext-md p-d-block"
                    style={{width:'600px', marginRight:'10px'}}
                    keyfilter="int" />
                </span>
                    <Button  
                    label="Search" 
                    className="p-button-raised p-button-success"
                    disabled={searchText.length===0}
                    onClick={handleSearchClick}
                    />
                    <p id="errorMessage" disabled className="text-danger"><small>{receivedPolicyDetailsErrorMessage}</small></p>
                </div>
            </div>
            {/* Policy Details Form displayed when we have searched
            for a particular policy-id */}
            {receivedPolicyDetails?<div className='row align-items-center'>
                <div className='col-lg-8 offset-lg-2 col-10 col-sm-6'>
                    <form className="card-body" onSubmit={handleSubmit} style={{marginTop: '15px',border: '0.5px solid lightgray', borderRadius: '6px'}}>
                    <h1 className='h6' style={{marginBottom:'20px'}}><mark><u><em>{`Policy details of policy-Id : ${receivedPolicyDetails.policyId}`}</em></u></mark></h1>
                        <div className="form-row ">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="CustomerId" className="labelstyles">Customer Id</label>
                                <input value={receivedPolicyDetails.customerId} id="customerId" name="customerId" disabled className="form-control"/>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="customerIncomeGroup" className="labelstyles">Customer Income Group</label>
                                <input value={receivedPolicyDetails.customerIncomeGroup} id="customerIncomeGroup" name="customerIncomeGroup" className="form-control" disabled/>
                            </div>
                        </div>
                        <div className="form-row ">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="fuelType" className="labelstyles">Fuel Type</label>
                                <input value={receivedPolicyDetails.fuelType} id="fuelType" name="fuelType" disabled className="form-control"/>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="policyId" className="labelstyles">Policy Id</label>
                                <input value={receivedPolicyDetails.policyId} id="policyId" name="policyId" disabled className="form-control"/>
                            </div>
                        </div>

                        <div className="form-row ">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="premiumAmount" className="labelstyles">Premium Amount</label>
                                <input value={premiumValue} id="premiumAmount" name="premiumAmount" type="number"  className="form-control" placeholder="Mobile Number" onChange={handlePremiumAmountChange}/>
                                <small id="premiumAmount" name="premiumAmount" className="text-danger">{premiumValueError}</small>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="dop" className="labelstyles">Date Of Purchase</label>
                                <input disabled value={getRightDateFormat(receivedPolicyDetails.dateOfPurchase)} id="dop" name="dop" type="date" className="form-control"/>
                        </div>
                        </div>
                        {/* new Date(receivedPolicyDetails.dateOfPurchase) */}
                        <div className="form-row ">
                            <div className="col-md-4 mb-3">
                                <div className="form-check">
                                    <input disabled className="form-check-input" type="checkbox" checked={receivedPolicyDetails.bodilyInjuryLiability} id="BIL"/>
                                    <label className="labelstyles" htmlFor="BIL">Bodily Injury Liability</label>
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className="form-check">
                                    <input disabled className="form-check-input" type="checkbox" checked={receivedPolicyDetails.personalInjuryProtection} id="PIP"/>
                                    <label className="labelstyles" htmlFor="PIP">Personal Injury Protection</label>
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className="form-check">
                                    <input disabled className="form-check-input" type="checkbox" checked={receivedPolicyDetails.propertyDamageLiability} id="PDL"/>
                                    <label className="labelstyles" htmlFor='PDL'>Property Damage Liability</label>
                                </div>
                            </div>
                        </div>
                        <div className = "text-center"> 
                            <button type="submit" className="btn btn-primary btn-block" disabled={(receivedPolicyDetails.premiumAmount===premiumValue)||premiumValueError||(!premiumValue)}>Save</button> 
                        </div>
                        <span id="errorMessage" disabled className="text-danger display-6">{savePolicyDetailsErrorMessage}</span>
                        <span id="successMessage" disabled className="text-success display-6">{savePolicyDetailsSuccessMessage}</span>
                    </form>
                </div>
            </div>:isSearchBtnClicked?<ProgressSpinner 
                style={{width: '150px', height: '150px', marginTop:'100px', marginLeft:'450px'}} 
                strokeWidth="2" 
                animationDuration=".5s"/>:null}
        </div>
    </div>)
}

export default PolicySearchDashboard;