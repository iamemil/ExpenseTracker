import React from 'react';
import Navbar from './components/Navbar';
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Receipts from './pages/receipts/Receipts';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import customTheme from "./utils/theme";
import { Route, Routes, Navigate } from 'react-router-dom';
function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <Navbar/>
      <Routes>
      <Route path="" element={<Navigate to="/home" />} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/dashboard" element={<Dashboard/>} />
        <Route exact path="/receipts" element={<Receipts/>} />
        <Route exact path="/signup" element={<Register/>} />
        <Route exact path="/login" element={<Login/>} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
