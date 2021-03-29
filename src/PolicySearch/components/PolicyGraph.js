/**
 * Screen that displays the Bar chart
 * 
 * Uses Reusable components like PrimeBarChart
 */
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import PrimeBarChart from '../../common/PrimeBarChart';
import { 
    getAllRegions, 
    getPoliciesPerRegion, 
    resetPoliciesPerRegion } from "../actions/actionIndex";
import { Dropdown } from 'primereact/dropdown';
import './DropDown.css';
import 'react-dropdown/style.css';
import DocumentTitle from "react-document-title";
import { ProgressSpinner } from 'primereact/progressspinner';


const PolicyGraph = () =>{
    const dispatch = useDispatch();
    const [ selectedRegion, setSelectedRegion ] = useState('');

    //Has all the Unique regions in the record
    const allRegions = useSelector(state=>state && state.policyGraphReducer && state.policyGraphReducer.allRegions);
    //Has object containing number of policies/ month in that region for all 12 months
    const policiesPerRegion = useSelector(state=>state && state.policyGraphReducer && state.policyGraphReducer.policiesPerRegion);

    /**
     * Used to initialize the premiumValue
     * when it receives any value for the first time
     */
    useEffect(()=>{
        if(!selectedRegion&&allRegions&&allRegions.length>0) setSelectedRegion(allRegions[0]);
    } ,[allRegions, selectedRegion]);

    /**
     * Runs when the component mounts for the first time
     */
    useEffect( ()=>{
        //Resets any previously stored value regarding policies/region
        dispatch(resetPoliciesPerRegion());
        //Gets All Regions Present in data to show in the dropdown
        dispatch(getAllRegions());
    } , [])

    /**
     * Gets the data object and converts it into
     * an array so that data can be passed to the dropdown and
     * displayed 
     */
    function getPoliciesPerRegionDataset(data){
        const arr = [];
        for( const i in data) arr.push(data[i])
        return arr;
    }

    /**
     * Deals with the changes that have to be made
     * when we choose different value in a dropdown
     */
    function handleDropDownChange(e){
        const newSelectedRegion = e.target.value;
        setSelectedRegion(newSelectedRegion);
        dispatch(resetPoliciesPerRegion());
        dispatch(getPoliciesPerRegion(newSelectedRegion));
    }

    return(<div >
        <h1 className='text-center display-4'>Policy Graphical Visualization</h1>
        {/* Used to change the tab title according to convenience */}
        <DocumentTitle title='PolicyReco | Policy Graph Visualizer'/>
        <div style={{padding:'40px 260px'}}>
            {(allRegions&&allRegions.length>0)?<Dropdown 
            value={selectedRegion} 
            options={allRegions} 
            onChange={handleDropDownChange}
            style={{width:'200px'}} /> : null }
            {(policiesPerRegion&&selectedRegion)?<PrimeBarChart dataset={getPoliciesPerRegionDataset(policiesPerRegion)} region={selectedRegion} />:
            <div style={{height:'500px', width:'800px'}}>
                <ProgressSpinner 
                style={{width: '150px', height: '150px', marginTop:'100px', marginLeft:'300px'}} 
                strokeWidth="2" 
                animationDuration=".5s"/>
            </div>}
        </div>
    </div>)
}

export default PolicyGraph;