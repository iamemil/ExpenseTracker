import React, { useRef } from "react";
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react';
import AuthService from "../../api/AuthService";
import { useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
function ResetPassword(props) {
    const [showPassword, setShowPassword] = useState(false);
    let authService = new AuthService();
    const passwordRef = useRef();
    const [searchParams, setSearchParams] = useSearchParams();

    const MySwal = withReactContent(Swal);

    if (searchParams.get("resetToken") != null) {

    }
    const handleFormSubmit = event => {
        event.preventDefault();
        if (searchParams.get("resetToken") != null) {
            const password = passwordRef.current.value;
            const token = searchParams.get("resetToken");
            authService
                .resetPassword(token,password)
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
                        Enter new password
                    </Heading>
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
                    <Stack spacing={6}>
                        <Button
                            colorScheme={"teal"} type="submit">
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Flex>
    );
}



export default ResetPassword;
