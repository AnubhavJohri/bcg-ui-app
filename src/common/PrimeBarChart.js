/**
 * Bar Chart Common Component
 * Takes in dataset to be displayed as input and region selected
 * Displays the Bar Chart. Uses PrimeReact chart library to show
 * the bar chart
 * 
 * X-Axis :- All 12 months
 * Y-Axis :- Number of policies sold/month
 * 
 * REUSABLE COMPONENT
 */
import React from 'react';
import { Chart } from 'primereact/chart';

export default function PrimeBarChart(props){
    const { dataset, region } = props;
 
    const data = {
        labels: [ 'JAN', 'FEB', 'MAR', 'APRIL', 'MAY', 'JUN', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV','DEC'],
        datasets: [
        {
            type: 'bar',
            label : 'Number of policies/month',
            borderColor : 'white',
            backgroundColor: '#00beac',
            borderWidth : 2,
            data: dataset
        },{
            type: 'line',
            borderColor : '#ffc107',
            label:'Number',
            data: dataset,
            borderWidth: 1.5,
            fill : false,
            legend : false
        }]
    }

    const options = {
        responsive: true,
        title:{
            display : true,
            text : `Number of Policies in ${region}`
        },
        labels:{
            fontColor: 'violet',
            fontSize: '50px'
        },
        tooltips: {
            mode: 'index',
            intersect: true
        }
    };

    return(
        <div style={{height:'500px', width:'800px'}}>
            {(dataset&&dataset.length>0)?<Chart type='bar' data={data} options={options}/>:<span>No Data To Display!</span>}
        </div>
    )
}