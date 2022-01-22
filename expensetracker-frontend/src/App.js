import React from 'react';
import {
  ChakraProvider,

  theme,
} from '@chakra-ui/react';

import { Logo } from './Logo';
import {Redirect, Route} from 'react-router-dom';
import Navbar from './pages/navbar/Navbar';
import Home from "./pages/home/Home";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Navbar/>
      <Home/>
    </ChakraProvider>
  );
}

export default App;
