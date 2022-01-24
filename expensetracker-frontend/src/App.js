import React from 'react';
import Navbar from './pages/navbar/Navbar';
import Home from "./pages/home/Home";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import {
  ChakraProvider,
} from '@chakra-ui/react';
import customTheme from "./utils/theme";
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <Navbar/>
      <Routes>
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/signup" element={<SignUp/>} />
        <Route exact path="/login" element={<Login/>} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
