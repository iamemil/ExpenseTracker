import {
    Box,
    Text
} from '@chakra-ui/react';
import { React } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export default function ReceiptChart() {
    const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const data = [
        {
            id: 1,
            name: "Food&Drink",
            color: "#82ca9d",
            data: [
                {
                    year: 2022,
                    month: 1,
                    amount: 100
                },
                {
                    year: 2022,
                    month: 2,
                    amount: 20
                },
                {
                    year: 2022,
                    month: 3,
                    amount: 100
                },
                {
                    year: 2022,
                    month: 4,
                    amount: 100
                },
                {
                    year: 2022,
                    month: 5,
                    amount: 100
                },
                {
                    year: 2022,
                    month: 6,
                    amount: 100
                },
                {
                    year: 2022,
                    month: 7,
                    amount: 100
                },
                {
                    year: 2022,
                    month: 8,
                    amount: 100
                },
                {
                    year: 2022,
                    month: 9,
                    amount: 100
                },
                {
                    year: 2022,
                    month: 10,
                    amount: 300
                },
                {
                    year: 2022,
                    month: 11,
                    amount: 30
                },
                {
                    year: 2022,
                    month: 12,
                    amount: 100
                }
            ]
        },
        {
            id: 2,
            name: "Shopping",
            color: "#8884d8",
            data: [
                {
                    year: 2022,
                    month: 1,
                    amount: 20
                },
                {
                    year: 2022,
                    month: 2,
                    amount: 60
                },
                {
                    year: 2022,
                    month: 3,
                    amount: 200
                },
                {
                    year: 2022,
                    month: 4,
                    amount: 150
                },
                {
                    year: 2022,
                    month: 5,
                    amount: 100
                },
                {
                    year: 2022,
                    month: 6,
                    amount: 100
                },
                {
                    year: 2022,
                    month: 7,
                    amount: 100
                },
                {
                    year: 2022,
                    month: 8,
                    amount: 100
                },
                {
                    year: 2022,
                    month: 9,
                    amount: 100
                },
                {
                    year: 2022,
                    month: 10,
                    amount: 100
                },
                {
                    year: 2022,
                    month: 11,
                    amount: 100
                },
                {
                    year: 2022,
                    month: 12,
                    amount: 100
                }
            ]
        }
    ];
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
                        <Line type="monotone" key={category.id} dataKey="amount" data={category.data} name={category.name} stroke={category.color} />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
}