import React, { useRef } from "react";
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
import AuthService from "../../api/AuthService";
import secureLs from "../../common/helper";
export default function Register() {

    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const emailAddressRef = useRef();
    const mobileNumberRef = useRef();
    const passwordRef = useRef();
    const passwordRepeatRef = useRef();

    const handleFormSubmit = event => {
        event.preventDefault();

        let authService = new AuthService();

        const firstname = firstnameRef.current.value;
        const lastname = lastnameRef.current.value;
        const email = emailAddressRef.current.value;
        const mobile = mobileNumberRef.current.value;
        const password = passwordRef.current.value;
        const passwordRepeat = passwordRepeatRef.current.value;


        if(password!==passwordRepeat){
            console.log("Passwords do not match");
            return;
        }

        const formData = new FormData();

        formData.append("firstName", firstname);
        formData.append("lastName", lastname);
        formData.append("mobileNumber", mobile);
        formData.append("emailAddress", email);
        formData.append("Password", password);

        authService
            .register(formData)
            .then((response) => {
                if(response.data.status===200){
                    console.log(response.data.message);
                }
                //history.replace("/dashboard");
            })
            .catch((error) => {
                console.log("Something went wrong, try again.")
            }
            );

    }
    return (
        <Center textAlign="center" fontSize="xl" >
            <Grid mx={5} px={5} boxShadow='lg' width={{ sm: '100%', md: '75%', lg: '65%', xl: '50%' }} border='1px' borderColor='gray.100' borderRadius='25px'>
                <Box>
                    <Text fontSize='5xl'>Register</Text>
                </Box>
                <form onSubmit={handleFormSubmit}>
                <Box>
                    <HStack>
                        <FormControl isRequired w='50%'>
                            <FormLabel htmlFor='firstname'>Firstname</FormLabel>
                            <Input id='firstname' type='text' ref={firstnameRef} placeholder='Firstname' />
                        </FormControl>
                        <FormControl isRequired w='50%'>
                            <FormLabel htmlFor='firstname'>Lastname</FormLabel>
                            <Input id='lastname' type='text' ref={lastnameRef} placeholder='Lastname' />
                        </FormControl>
                    </HStack>
                </Box>
                <Box>
                    <HStack>
                        <FormControl w='50%' isRequired>
                            <FormLabel htmlFor='email'>Email address</FormLabel>
                            <Input id='email' type='email' ref={emailAddressRef} placeholder='Email address' />
                        </FormControl>
                        <FormControl w='50%' isRequired>
                            <FormLabel htmlFor='mobileNumber'>Mobile Number</FormLabel>
                            <Input id='mobileNumber' type='text' ref={mobileNumberRef} placeholder='Mobile Number' pattern="^\+(?:[0-9]●?){6,14}[0-9]$" />
                        </FormControl>
                    </HStack>
                </Box>
                <Box>
                    <HStack>
                        <FormControl w='50%' isRequired>
                            <FormLabel htmlFor='password'>Password</FormLabel>
                            <Input id='password' type='password' ref={passwordRef} placeholder='Password' />
                        </FormControl>
                        <FormControl w='50%' isRequired>
                            <FormLabel htmlFor='passwordRepeat'>Repeat password</FormLabel>
                            <Input id='passwordRepeat' type='password' ref={passwordRepeatRef} placeholder='Repeat password' />
                        </FormControl>
                    </HStack>

                </Box>
                <Box>
                    <Button my={4} colorScheme='teal' type='submit'>
                        Register
                    </Button>
                </Box>
                </form>
            </Grid>
        </Center>
    );
}