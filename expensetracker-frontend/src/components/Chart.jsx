import {
    Box,
    Text,
    HStack,
    Center
} from '@chakra-ui/react';
import { React, useState, useEffect } from 'react';
import StatisticsService from '../api/StatisticsService';
import randomColor from "randomcolor";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";
import { receiptDataNotModified } from '../redux/actions/authAction';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
function ReceiptChart(props) {
    const datepickerEnabled = props.datepickerEnabled;
    const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [loading, setLoading] = useState(false);
    const data = props.data ==null ? [] : props.data;
    const [year, setYear] = useState(new Date());

    if(data.length===0 && !loading){
    return(
        <Box border='1px' borderColor='gray.100' borderRadius='15px' width={'full'} boxShadow={'xl'} height={'400px'} py={6} mb={4}>
        <HStack>
            <Text fontSize={'2xl'} color={'gray.800'} mb={2} pl={6}>Expenses Chart</Text>
            {datepickerEnabled ? (<>
                <Box>
                    <DatePicker selected={year} onChange={(year) => setYear(year)}
                        showYearPicker
                        dateFormat="yyyy" />
                </Box>
            </>) : null}
        </HStack>
        <Center>
        <Text>Not enough data to show</Text>
        </Center>
    </Box>
    );
    }
    return (
        <Box border='1px' borderColor='gray.100' borderRadius='15px' width={'full'} boxShadow={'xl'} height={'400px'} py={6} mb={4}>
            <HStack>
                <Text fontSize={'2xl'} color={'gray.800'} mb={2} pl={6}>Expenses Chart</Text>
                {datepickerEnabled ? (<>
                    <Box>
                        <DatePicker selected={year} onChange={(year) => setYear(year)}
                            showYearPicker
                            dateFormat="yyyy" />
                    </Box>
                </>) : null}
            </HStack>
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
                    {data.map((item) => (
                        <Line type="monotone" connectNulls={true} key={item.id} dataKey="price" data={item.data} name={item.itemName} stroke={randomColor({ luminosity: 'dark' })} />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
}
function mapStateToProps(store) {
    return {
        store
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onReceiptDataNotModified: () => dispatch(receiptDataNotModified())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReceiptChart);