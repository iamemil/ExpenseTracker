import React, { useRef } from "react";
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
import { connect } from "react-redux";
import { loginSuccessfull } from "../../redux/actions/authAction";
import secureLs from "../../common/helper";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
function Login(props) {
    const navigate = useNavigate();
    const emailAddressRef = useRef();
    const passwordRef = useRef();
    const MySwal = withReactContent(Swal);

    const handleFormSubmit = event => {
        event.preventDefault();

        let authService = new AuthService();
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
                    //alert(response.data.message);
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

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginSuccess: () => dispatch(loginSuccessfull())
    };
};

export default connect(null, mapDispatchToProps)(Login);
