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
export default function Receipts() {
    return (
        <Box mx='6'>
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
        </Box>
    );
}