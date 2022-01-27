import React from "react";
import {
    Center,
    VStack,
} from '@chakra-ui/react';
import ReceiptHistory from "./ReceiptHistory";
export default function Dashboard() {
    return (
        <VStack px='4'>
            <Center width={'full'} h='400px'>
                <ReceiptHistory/>
            </Center>
        </VStack>
    );
}