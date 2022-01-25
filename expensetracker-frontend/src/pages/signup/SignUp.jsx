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
    Center,
} from '@chakra-ui/react';

export default function SignUp() {
    return (
        <Center textAlign="center" fontSize="xl" >
            <Grid mx={5} px={5} boxShadow='lg' width={{ sm: '100%', md: '75%', lg: '65%', xl: '50%' }} border='1px' borderColor='gray.100' borderRadius='25px'>
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
                    <Button my={4} colorScheme='teal' type='submit'>
                        Register
                    </Button>
                </Box>
            </Grid>
        </Center>
    );
}