import {
    Box,
    Text
} from '@chakra-ui/react';
import { React, useState, useEffect } from 'react';
import StatisticsService from '../api/StatisticsService';
import randomColor from "randomcolor";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export default function ReceiptChart() {
    const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    let statisticsService = new StatisticsService();
    
    useEffect(() => {
        setLoading(true);
        statisticsService.getChartStatistics()
        .then((response) => {
            var data = response.data.data.map(item =>
            ({
                id: item.tagId,
                name: item.tagName,
                data: item.data
            })
            )
            setData(data)
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => setLoading(false));
    }, []);

    return (
        <Box border='1px' borderColor='gray.100' borderRadius='15px' width={'full'} boxShadow={'xl'} height={'400px'} py={6} mb={4}>
            <Text fontSize={'2xl'} color={'gray.800'} mb={2} pl={6}>Expenses Chart</Text>
            <ResponsiveContainer width="100%" height="90%">

                <LineChart width={500}
                    height={300}
                    data={data} margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month"
                        allowDuplicatedCategory={false}
                        type="number"
                        domain={[1, 12]}
                        tickCount={12}
                        tickFormatter={(value) => {
                            return shortMonths[value - 1];

                        }} />
                    <YAxis dataKey="amount" tickFormatter={(value) => {
                        return `${value} ₼`;

                    }} />
                    <Tooltip
                        formatter={function (value, name) {
                            return `${value} ₼`;
                        }}
                        labelFormatter={function (value) {
                            return months[value - 1];
                        }} />
                    <Legend />
                    {data.map((category) => (
                        <Line type="monotone" connectNulls={true} key={category.id} dataKey="amount" data={category.data} name={category.name} stroke={randomColor({luminosity: 'dark'})} />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
}