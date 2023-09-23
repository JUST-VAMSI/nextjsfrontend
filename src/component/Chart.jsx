import React, { useEffect, useState } from 'react'
import {Bar} from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    Legend,
    BarElement,
    Title,
    Tooltip
} from 'chart.js';

ChartJs.register(
    CategoryScale,
    LinearScale,
    Legend,
    BarElement,
    Title,
    Tooltip
)

const Chart = () => {
    const [chart,setChart] = useState([]);

    useEffect(()=>{
         axios.get("http://localhost:2002/getallcharts").then((res)=>{
            const newData = res.data;
            if(JSON.stringify(newData)!==JSON.stringify(chart))
            {
                setChart(res.data);
            }
            
         })
        
    },[])
    const filterData = chart.filter(item=>item.year===2023);

    const chartData={
        labels: filterData.map(y=>y.month),
        datasets: [{
            label: "data available",
            data: filterData.map(c=>c.coinPrice),
            borderColor: 'yellow',
            backgroundColor: 'pink',
        }],
    }

    const chartOptions={
        plugins:{
            legend:{
                position:'top',
            },
            title:{
                display: true,
                text: "jan-sep 2023",
            },
            maintainAspectRatio: false,
            responsive:true,
        }
    }

  return (
    <>
    <div>
        <Bar data={chartData} options={chartOptions}/>
    </div>
    </>
  )
}

export default Chart