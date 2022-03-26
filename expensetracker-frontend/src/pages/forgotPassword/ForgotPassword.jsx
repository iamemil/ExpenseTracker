import React, { useRef } from "react";
import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import AuthService from "../../api/AuthService";
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
function ForgotPassword(props) {
    let authService = new AuthService();
    const emailAddressRef = useRef();
    const [searchParams, setSearchParams] = useSearchParams();

    const MySwal = withReactContent(Swal);

    if (searchParams.get("resetToken") != null) {
        authService.confirm(searchParams.get("confirmToken")).then(res => {
            if (res.data.status == 200) {
                MySwal.fire({
                    title: 'Success',
                    text: 'Your account has been verified',
                    icon: 'success'
                })
            } else {
                MySwal.fire({
                    title: 'Warning',
                    text: res.data.message,
                    icon: 'warning'
                })
            }
        })
    }
    const handleFormSubmit = event => {
        event.preventDefault();
        const email = emailAddressRef.current.value;
        const formData = new FormData();
        formData.append("emailAddress", email);
        authService
            .forgotPassword(email)
            .then((response) => {
                if (response.data.status === 200) {
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
                    text: error,
                    icon: 'error',
                    confirmButtonColor: '#319795'
                });
            }
            );

    }
    return (
        <Flex
            align={'center'}
            justify={'center'}>
            <form onSubmit={handleFormSubmit}>
                <Stack
                    spacing={4}
                    w={'full'}
                    maxW={'md'}
                    bg={useColorModeValue('white', 'gray.700')}
                    rounded={'xl'}
                    boxShadow={'lg'}
                    p={6}
                    my={12}>
                    <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                        Forgot your password?
                    </Heading>
                    <Text
                        fontSize={{ base: 'sm', sm: 'md' }}
                        color={useColorModeValue('gray.800', 'gray.400')}>
                        You&apos;ll get an email with a reset link
                    </Text>

                    <FormControl id="email" isRequired>
                        <Input
                            placeholder="your-email@example.com"
                            _placeholder={{ color: 'gray.500' }}
                            type="email" ref={emailAddressRef}
                        />
                    </FormControl>
                    <Stack spacing={6}>
                        <Button
                            colorScheme={"teal"} type="submit">
                            Request Reset Link
                        </Button>
                    </Stack>
                </Stack>

            </form>
        </Flex>
    );
}



export default ForgotPassword;
