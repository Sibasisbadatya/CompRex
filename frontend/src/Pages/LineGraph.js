import React from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Label, Tooltip } from 'recharts';
const LineGraph = ({ pdata }) => {
    return (
        <>
            <ResponsiveContainer width="90%" height="90%" >
                <LineChart data={pdata} width={500} height={300} margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" interval={'preserveStartEnd'} tickFormatter={(value) => `"${value}"` + ' post'}>
                        <Label value="Name of Posts" position="bottom" offset={0} fontWeight={500} color='black' />
                    </XAxis>
                    <YAxis>
                        <Label value="No of Comments" position="insideLeft" angle={-90} offset={10} fontSize={10} />
                    </YAxis>
                    <Tooltip contentStyle={{ backgroundColor: "yellow" }} />
                    <Line dataKey="count" stroke='red' activeDot={{ r: 10 }} />
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}

export default LineGraph
