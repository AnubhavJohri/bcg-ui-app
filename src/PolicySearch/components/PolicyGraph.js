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


const PolicyGraph = () =>{
    const dispatch = useDispatch();
    const [ selectedRegion, setSelectedRegion ] = useState('');

    const allRegions = useSelector(state=>state && state.policyGraphReducer && state.policyGraphReducer.allRegions);
    const policiesPerRegion = useSelector(state=>state && state.policyGraphReducer && state.policyGraphReducer.policiesPerRegion);

    useEffect(()=>{
        if(!selectedRegion&&allRegions&&allRegions.length>0) setSelectedRegion(allRegions[0]);
    } ,[allRegions]);

    useEffect( ()=>{
        //Gets All Regions Present in data to show in the dropdown
        dispatch(getAllRegions());
    } , [])

    function getPoliciesPerRegionDataset(data){
        const arr = [];
        for( const i in data) arr.push(data[i])
        return arr;
    }

    function handleDropDownChange(e){
        const newSelectedRegion = e.target.value;
        setSelectedRegion(newSelectedRegion);
        dispatch(resetPoliciesPerRegion());
        dispatch(getPoliciesPerRegion(newSelectedRegion));
    }

    return(<div >
        <h1 className='display-4'>Policy Graphical Visualization</h1>
        <DocumentTitle title='PolicyReco | Policy Graph Visualizer'/>
        <div style={{padding:'40px 260px'}}>
            {(allRegions&&allRegions.length>0)?<Dropdown 
            value={selectedRegion} 
            options={allRegions} 
            onChange={handleDropDownChange}
            placeholder="Select a City"
            style={{width:'200px'}} />:null}
            <PrimeBarChart dataset={getPoliciesPerRegionDataset(policiesPerRegion)} region={selectedRegion} />
        </div>
    </div>)
}

export default PolicyGraph;