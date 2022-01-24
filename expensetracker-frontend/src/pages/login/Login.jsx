import React from "react";
import {
    Box,
    Text,
    Button,
    Grid,
    FormControl,
    FormLabel,
    Input,
    Center
} from '@chakra-ui/react';

export default function Login() {
    return (
        <Center textAlign="center" fontSize="xl">

            <Grid  mx={5} px={5} width={{ sm: '100%', md:'75%', lg:'65%', xl: '50%' }} border='1px' borderColor='gray.100' borderRadius='25px'>
                <Box>
                    <Text fontSize='5xl'>Login</Text>
                </Box>
                <Box>
                    <FormControl isRequired>
                        <FormLabel htmlFor='email'>Email address</FormLabel>
                        <Input id='email' type='email' placeholder='Email address' />
                    </FormControl>
                </Box>
                <Box>
                    <FormControl isRequired>
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <Input id='password' type='password' placeholder='Password' />
                    </FormControl>
                </Box>
                <Box>
                    <Button mt={4} colorScheme='teal' type='submit'>
                        Login
                    </Button>
                </Box>
            </Grid>
        </Center>
    );
}