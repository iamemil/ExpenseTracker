import React from "react";
import {
    Center,
    Tag,
    Stat,
    StatGroup,
    StatLabel,
    StatNumber,
    StatHelpText,
    Box
} from '@chakra-ui/react';
import ReceiptHistory from "./ReceiptHistory";
import { useState, useEffect } from "react";
import StatisticsService from '../../api/StatisticsService';
import ReceiptChart from "../../components/ReceiptChart";
export default function Dashboard() {
    const [totalStats, setTotalStats] = useState([]);
    const [loading, setLoading] = useState(false);
    function updateDashboard(){
        setLoading(true);
        let statisticsService = new StatisticsService();
        statisticsService.getTotalStatistics()
            .then((response) => {
                setTotalStats(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setLoading(false));
    }
    useEffect(() => {
        updateDashboard();
    }, []);


    if (totalStats.length === 0) {
        return (
            <Box mx='6'>
                <StatGroup border='1px' borderColor='gray.100' borderRadius='15px' boxShadow={'xl'} p={6} my={6}>
                    <Stat>
                        <StatLabel>Total Spent</StatLabel>
                        <StatNumber>Loading...</StatNumber>
                        <StatHelpText>All time</StatHelpText>
                    </Stat>
                    <Stat>
                        <StatLabel mb={2}>Top Category</StatLabel>
                        <Tag colorScheme='teal'>Loading...</Tag>
                        <StatHelpText mt={2}>Total Spent: Loading... </StatHelpText>
                    </Stat>
                    <Stat>
                        <StatLabel>Top Merchant</StatLabel>
                        <StatNumber>Loading...</StatNumber>
                        <StatHelpText>Total: Loading...</StatHelpText>
                    </Stat>
                </StatGroup>
                <Center width={'full'} my={6}>
                    <ReceiptHistory />
                </Center>
                <Center width={'full'} my={6}>
                    <ReceiptChart />
                </Center>
            </Box>
        );
    }

    return (
        <Box mx='6'>
            <StatGroup border='1px' borderColor='gray.100' borderRadius='15px' boxShadow={'xl'} p={6} my={6}>
                <Stat>
                    <StatLabel>Total Spent</StatLabel>
                    <StatNumber>{totalStats.totalSpent} ₼</StatNumber>
                    <StatHelpText>All time</StatHelpText>
                </Stat>
                <Stat>
                    <StatLabel mb={2}>Top Category</StatLabel>
                    <Tag colorScheme='teal'>{totalStats.topCategories[0].Name}</Tag>
                    <StatHelpText mt={2}>Total Spent: {totalStats.topCategories[0].Amount} ₼</StatHelpText>
                </Stat>
                <Stat>
                    <StatLabel>Top Merchant</StatLabel>
                    <StatNumber>{totalStats.topStores[0].Name}</StatNumber>
                    <StatHelpText>Total: {totalStats.topStores[0].Amount} ₼</StatHelpText>
                </Stat>
            </StatGroup>
            <Center width={'full'} my={6}>
                <ReceiptHistory />
            </Center>
            <Center width={'full'} my={6}>
                <ReceiptChart />
            </Center>
        </Box>
    )
}
