import React from "react";
import {
    Center,
    Tag,
    Stat,
    StatGroup,
    StatLabel,
    StatNumber,
    StatHelpText,
    Box,
    Skeleton,
    Text
} from '@chakra-ui/react';
import { useState, useEffect } from "react";
import ReceiptChart from "../../components/ReceiptChart";
import StatisticsService from '../../api/StatisticsService';
import { connect  } from "react-redux";
import { receiptDataNotModified } from '../../redux/actions/authAction';
function Statistics(props) {
    const [totalStats, setTotalStats] = useState([]);
    function updateDashboard(){
        let statisticsService = new StatisticsService();
        statisticsService.getTotalStatistics()
            .then((response) => {
                setTotalStats(response.data.data);
                if(props.store.receiptDataModified){
                    props.onReceiptDataNotModified();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        updateDashboard();
    }, [props.store.receiptDataModified]);

    
    if (totalStats.length === 0) {
        return (
            <Box mx='6'>
                <StatGroup border='1px' borderColor='gray.100' borderRadius='15px' boxShadow={'xl'} p={6} my={6}>
                    <Stat>
                        <StatLabel>Total Spent</StatLabel>
                        <Skeleton width={'120px'} height={'36px'}>
                        <StatNumber>Loading...</StatNumber>
                        </Skeleton>
                        <StatHelpText>All time</StatHelpText>
                    </Stat>
                    <Stat>
                        <StatLabel mb={2}>Top Category</StatLabel>
                        <Skeleton width={'80px'} height={'30px'}>
                        <Tag colorScheme='teal'>Loading...</Tag>
                        </Skeleton>
                        <Skeleton width={'120px'} height={'24px'}>
                        <StatHelpText mt={2}>Total Spent: Loading... </StatHelpText>
                        </Skeleton>
                    </Stat>
                    <Stat>
                        <StatLabel>Top Merchant</StatLabel>
                        <Skeleton width={'120px'} height={'36px'}>
                        <StatNumber>Loading...</StatNumber>
                        </Skeleton>
                        <Skeleton mt={2} width={'120px'} height={'24px'}>
                        <StatHelpText>Total: Loading...</StatHelpText>
                        </Skeleton>
                    </Stat>
                </StatGroup>
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
            <Center>
                <ReceiptChart />
            </Center>
        </Box>
    )
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
export default connect(mapStateToProps, mapDispatchToProps)(Statistics);