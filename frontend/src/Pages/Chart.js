import React, { useEffect, useState } from 'react';
import BarGraph from './BarGraph';
import LineGraph from './LineGraph';
import './Chart.css';
import { ToastContainer, toast } from "react-toastify";
import { host } from "../URL/Url";
// ChartJs.register(
//     BarElement,
//     CategoryScale,
//     LinearScale,

// )
const Chart = () => {
    const toastOptions = {
        position: "bottom-right",
        autoClose: "8000",
        pauseOnHover: true,
        theme: "dark",
        draggable: true
    }
    const userEmail = window.localStorage.getItem("resemail");
    const userName = window.localStorage.getItem("resname");
    if (!window.localStorage.getItem("pic-token"))
        window.location.href = "./";
    const [comments, setComments] = useState([]);
    const [cmtArray, setCmtArray] = useState([]);
    const [frequencyMap, setFrequencyMap] = useState(null);
    function countRepeatedValues(arr) {
        const frequencyMap = {};
        let count = 0;
        for (const element of arr) {
            const name = element.name;
            frequencyMap[name] = (frequencyMap[name] || 0) + 1;
        }
        setFrequencyMap(frequencyMap);
    }
    const getComments = async () => {
        const res = await fetch(`${host}/getcomments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                to: userEmail
            })
        })
        const data = await res.json(res);
        countRepeatedValues(data);
        const uniqueArray = data.reduce((accumulator, currentValue) => {
            const existingItem = accumulator.find(item => item.name === currentValue.name);
            if (!existingItem) {
                accumulator.push(currentValue);
            }
            return accumulator;
        }, []);
        setCmtArray(uniqueArray);
        console.log("cmrArray", cmtArray);
    }
    const pdata = [];
    cmtArray.map((elem) => {
        pdata.push({
            name: elem.name,
            count: frequencyMap[elem.name]
        })
    })
    useEffect(() => {
        getComments();
    }, []);
    return (
        <>
            <div className='graph'>
                <span>Data Using Line Graph</span>
                <div className="linegraph">
                    <LineGraph pdata={pdata} />
                </div>
                <span>Data Using Bar Graph</span>
                <div className="bargraph">
                    <BarGraph pdata={pdata} />
                </div>
            </div>
        </>
    )
}

export default Chart
