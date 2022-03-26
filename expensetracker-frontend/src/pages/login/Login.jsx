import React, { useRef } from "react";
import {
    Box,
    Text,
    Button,
    FormControl,
    FormLabel,
    Input,
    Flex,
    Stack,
    Link,
    Heading,
    useColorModeValue
} from '@chakra-ui/react';
import AuthService from "../../api/AuthService";
import { connect } from "react-redux";
import { loginSuccessfull } from "../../redux/actions/authAction";
import secureLs from "../../common/helper";
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
function Login(props) {
    const navigate = useNavigate();
    let authService = new AuthService();
    const emailAddressRef = useRef();
    const [searchParams, setSearchParams] = useSearchParams();

    const passwordRef = useRef();
    const MySwal = withReactContent(Swal);

    if (searchParams.get("confirmToken") != null) {
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
        const password = passwordRef.current.value;
        const formData = new FormData();
        formData.append("emailAddress", email);
        formData.append("Password", password);
        authService
            .signin(formData)
            .then((response) => {
                if (response.data.status === 200) {
                    props.onLoginSuccess();
                    secureLs.set("Authorization", response.data.token);
                    navigate('/dashboard');
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
                // ONLY FOR TESTING
                props.onLoginSuccess();
                navigate('/dashboard');
                // ONLY FOR TESTING
            }
            );

    }
    return (
            <Flex
                align={'center'}
                justify={'center'}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to track all your expenses easily✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <form onSubmit={handleFormSubmit}>
                                <FormControl id="email" isRequired>
                                    <FormLabel>Email address</FormLabel>
                                    <Input type="email" ref={emailAddressRef} />
                                </FormControl>
                                <FormControl id="password" isRequired>
                                    <FormLabel>Password</FormLabel>
                                    <Input type="password" ref={passwordRef} />
                                </FormControl>
                                <Stack spacing={10}>
                                    <Stack
                                        direction={{ base: 'column', sm: 'row' }}
                                        align={'start'}
                                        justify={'space-between'}>
                                        <Link color={'blue.400'} href="/forgot-password">Forgot password?</Link>
                                    </Stack>
                                    <Button
                                        colorScheme='teal' type="submit">
                                        Sign in
                                    </Button>
                                </Stack>

                            </form>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginSuccess: () => dispatch(loginSuccessfull())
    };
};

export default connect(null, mapDispatchToProps)(Login);
