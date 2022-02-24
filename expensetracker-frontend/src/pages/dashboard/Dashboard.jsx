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
import ReceiptChart from "../../components/ReceiptChart";
export default function Dashboard() {
    return (
        <Box px='8'>
            <StatGroup border='1px' borderColor='gray.100' borderRadius='15px' boxShadow={'xl'} p={6} my={6}>
                <Stat>
                    <StatLabel>Total Spent</StatLabel>
                    <StatNumber>89.52 ₼</StatNumber>
                    <StatHelpText>All time</StatHelpText>
                </Stat>
                <Stat>
                    <StatLabel mb={2}>Top Category</StatLabel>
                    <Tag colorScheme='teal'>Shopping</Tag>
                    <StatHelpText mt={2}>Total Spent: 40.48 ₼</StatHelpText>
                </Stat>
                <Stat>
                    <StatLabel>Top Merchant</StatLabel>
                    <StatNumber>Starbucks</StatNumber>
                    <StatHelpText>Total: 39.9 ₼</StatHelpText>
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