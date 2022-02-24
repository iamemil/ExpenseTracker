import {
    Box,
    Text
} from '@chakra-ui/react';
import { React } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export default function ReceiptChart() {
    const data = [
        {
            name: 'Jan',
            category1: 4000,
            category2: 2400,
        },
        {
            name: 'Feb',
            category1: 3000,
            category2: 1398,
        },
        {
            name: 'Mar',
            category1: 2000,
            category2: 9800,
        },
        {
            name: 'Apr',
            category1: 2780,
            category2: 3908,
        },
        {
            name: 'May',
            category1: 1890,
            category2: 4800,
        },
        {
            name: 'Jun',
            category1: 2390,
            category2: 3800,
        },
        {
            name: 'Jul',
            category1: 3490,
            category2: 4300,
        },
        {
            name: 'Aug',
            category1: 1890,
            category2: 4800,
        },
        {
            name: 'Sep',
            category1: 2000,
            category2: 9800,
        },
        {
            name: 'Oct',
            category1: 4000,
            category2: 2400,
        },
        {
            name: 'Nov',
            category1: 3000,
            category2: 1398,
        },

        {
            name: 'Dec',
            category1: 1890,
            category2: 4800,
        },
    ];
    return (
        <Box border='1px' borderColor='gray.100' borderRadius='15px' width={'full'} boxShadow={'xl'} height={'400px'} py={6} mb={4}>
            <Text fontSize={'2xl'} color={'gray.800'} mb={2} pl={6}>Expenses Chart</Text>
            <ResponsiveContainer width="100%" height="90%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend/>
                    <Line type="monotone" name="Shopping" dataKey="category1" stroke="#8884d8" />
                    <Line type="monotone" name="Food&Drink" dataKey="category2" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
}