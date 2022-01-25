import React from "react";
import {
    Box,
    Text,
    Link,
    VStack,
    Grid,
  } from '@chakra-ui/react';
export default function ReceiptHistory(){
    return (
        <Box textAlign="center" fontSize="xl" border='1px' borderColor='gray.500' borderRadius='10px'>
        
        <Grid p={3}>
          <VStack spacing={8}>
            <Text>
              Dashboard
            </Text>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link>
          </VStack>
        </Grid>
      </Box>
    );
}