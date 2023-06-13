import React from 'react'
import { Chart as ChartJs, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJs.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
)
var options = {
    responsive: true,
    maintainAspectRatio: false,
    // aspectRatio: 2, // Adjust the aspectRatio value as needed
    type: 'bar',
    indexAxis: 'x',
    elements: {
        bar: {
            borderWidth: 2,
        }
    },
    scales: {
        y: {
            title: {
                display: true,
                text: 'No of comments',
                fontWeight:500,
                color:'black'
            },
            gridLines: {
                color: 'green'
            }
        },
        x: {
            title: {
                display: true,
                text: 'Name of posts'
            }
        },
    }
}

const BarGraph = ({ pdata }) => {
    return (
        <>
            <Bar
                data={{
                    labels: pdata.map(user => user.name),
                    datasets: [
                        {
                            label: "Posts",
                            data: pdata.map(user => user.count),
                            backgroundColor: "#00cec9"
                        }
                    ],
                }}
                options={options}
                height="100%"
                width="100%"
            >

            </Bar>
        </>
    )
}

export default BarGraph
