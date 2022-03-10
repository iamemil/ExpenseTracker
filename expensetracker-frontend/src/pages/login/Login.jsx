import React, { useRef, useState } from "react";
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
import AuthService from "../../api/AuthService";
import secureLs from "../../common/helper";
export default function Login() {

    const [credentialError, setcredentialError] = useState("");
    const emailAddressRef = useRef();
    const passwordRef = useRef();

    const handleFormSubmit = event => {
        event.preventDefault();

        let authService = new AuthService();
        const email = emailAddressRef.current.value;
        const password = passwordRef.current.value;
        const params = {
            emailAddress: email,
            Password: password
        };
        authService
            .signin(params)
            .then((response) => {
                console.log(response);
                secureLs.set("Authorization", response.token);
                //history.replace("/dashboard");
            })
            .catch((error) => {
                setcredentialError("Please, enter your credentials correctly.")
            }
            );

    }
    return (
        <Center textAlign="center" fontSize="xl">

            <Grid mx={5} px={5} boxShadow='lg' width={{ sm: '100%', md: '75%', lg: '65%', xl: '50%' }} border='1px' borderColor='gray.100' borderRadius='25px'>
                <Box>
                    <Text fontSize='5xl'>Login</Text>
                </Box>
                <form onSubmit={handleFormSubmit}>
                    <Box>
                        <FormControl isRequired>
                            <FormLabel htmlFor='email'>Email address</FormLabel>
                            <Input id='email' type='email' ref={emailAddressRef} placeholder='Email address' />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl isRequired>
                            <FormLabel htmlFor='password'>Password</FormLabel>
                            <Input id='password' type='password' ref={passwordRef} placeholder='Password' />
                        </FormControl>
                    </Box>
                    <Box>
                        <Button my={4} colorScheme='teal' type='submit'>
                            Login
                        </Button>
                    </Box>
                </form>
            </Grid>
        </Center>
    );
}