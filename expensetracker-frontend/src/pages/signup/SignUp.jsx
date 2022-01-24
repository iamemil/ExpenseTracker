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

export default function SignUp() {
    return (
        <Box textAlign="center" fontSize="xl">

            <Grid px={10}>
                <Box>
                    <Text fontSize='5xl'> Sign Up</Text>
                </Box>
                <Box>
                    <HStack>
                    <FormControl isRequired w='50%'>
                        <FormLabel htmlFor='firstname'>Firstname</FormLabel>
                        <Input id='firstname' type='text' placeholder='Firstname' />
                    </FormControl>
                    <FormControl isRequired w='50%'>
                        <FormLabel htmlFor='firstname'>Lastname</FormLabel>
                        <Input id='lastname' type='text' placeholder='Lastname' />
                    </FormControl>
                    </HStack>
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
                        Register
                    </Button>
                </Box>
            </Grid>
        </Box>
    );
}