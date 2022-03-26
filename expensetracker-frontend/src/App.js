import React from 'react';
import { connect } from "react-redux";
import Navbar from './components/Navbar';
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Receipts from './pages/receipts/Receipts';
import Statistics from './pages/statistics/Statistics';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import ResetPassword from './pages/resetPassword/ResetPassword';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import customTheme from "./utils/theme";
import { Route, Routes, Navigate } from 'react-router-dom';
function App(props) {

  return (
    <ChakraProvider theme={customTheme}>
      <Navbar/>
      <Routes>
      <Route path="" element={<Navigate to="/home" />} />
        <Route exact path="/home" element={<Home/>} />
        {props.store.isLoggedIn ? (
        <>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route exact path="/receipts" element={<Receipts />} />
        <Route exact path="/statistics" element={<Statistics />} />
        </>
        ) : (
          <>
          <Route exact path="/signup" element={<Register/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/forgot-password" element={<ForgotPassword/>} />
        <Route exact path="/reset-password" element={<ResetPassword/>} />
          </>
        )}
        
      </Routes>
    </ChakraProvider>
  );
}

const mapStateToProps = (store) => {
  return {
    store,
  };
};

export default connect(mapStateToProps)(App);
