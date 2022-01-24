import React from "react";
import {
    Box,
    Text,
    Button,
    Grid,
    FormControl,
    FormLabel,
    Input,
    HStack,
} from '@chakra-ui/react';

export default function Login() {
    return (
        <Box textAlign="center" fontSize="xl">

            <Grid px={10}>
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
        </Box>
    );
}