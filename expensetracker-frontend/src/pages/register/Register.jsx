import React, { useRef } from "react";
import {
    Box,
    Text,
    Button,
    FormControl,
    FormLabel,
    Input,
    HStack,
    Flex,
    InputGroup,
    InputRightElement,
    Stack,
    Heading,
    useColorModeValue,
    Link,
} from '@chakra-ui/react';
import AuthService from "../../api/AuthService";
import Swal from 'sweetalert2';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import withReactContent from 'sweetalert2-react-content';
export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const emailAddressRef = useRef();
    const mobileNumberRef = useRef();
    const passwordRef = useRef();
    const passwordRepeatRef = useRef();

    const MySwal = withReactContent(Swal);

    const handleFormSubmit = event => {
        event.preventDefault();

        let authService = new AuthService();

        const firstname = firstnameRef.current.value;
        const lastname = lastnameRef.current.value;
        const email = emailAddressRef.current.value;
        const mobile = mobileNumberRef.current.value;
        const password = passwordRef.current.value;

        const formData = new FormData();

        formData.append("firstName", firstname);
        formData.append("lastName", lastname);
        formData.append("mobileNumber", mobile);
        formData.append("emailAddress", email);
        formData.append("Password", password);

        authService
            .register(formData)
            .then((response) => {
                if (response.data.status == 200) {
                    MySwal.fire({
                        title: 'Success',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonColor: '#319795'
                    });
                } else {
                    MySwal.fire({
                        title: 'Warning',
                        text: response.data.message,
                        icon: 'warning',
                        confirmButtonColor: '#319795'
                    });
                }
            })
            .catch((error) => {
                MySwal.fire({
                    title: 'Error',
                    text: "Something went wrong, try again.",
                    icon: 'error',
                    confirmButtonColor: '#319795'
                });
            }
            );

    }
    return (<Flex
            align={'center'}
            justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Register
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <form onSubmit={handleFormSubmit}>
                        <Stack spacing={4}>
                            <HStack>
                                <Box>
                                    <FormControl id="firstName" isRequired>
                                        <FormLabel>First Name</FormLabel>
                                        <Input type="text" ref={firstnameRef} />
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="lastName" isRequired>
                                        <FormLabel>Last Name</FormLabel>
                                        <Input type="text" ref={lastnameRef} />
                                    </FormControl>
                                </Box>
                            </HStack>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" ref={emailAddressRef} />
                            </FormControl>
                            <FormControl id="mobileNumber" isRequired>
                                <FormLabel>Mobile Number</FormLabel>
                                <Input type="text" ref={mobileNumberRef} pattern="^\+(?:[0-9]●?){6,14}[0-9]$" />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'} ref={passwordRef} />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText="Submitting"
                                    size="lg"
                                    colorScheme={'teal'} type="submit">
                                    Sign up
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Already a user?<Link color={'blue.400'} href="/login">Login</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
}