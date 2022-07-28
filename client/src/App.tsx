import React from "react"
import './App.css';
import { Route, Routes } from 'react-router-dom';
import WebA from './pages/WebA';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import {useState} from "react"
import { IProduct } from './interfaces';

let theme = createTheme();
theme = responsiveFontSizes(theme);


function App() {
  const [products,setProducts]=useState<IProduct[]>([{
    _id:"1123",
    name:"Iphone 11",
    price:200,
    description:"hola",
    image_url:"https://http2.mlstatic.com/D_NQ_NP_656548-MLA46114829749_052021-O.webp"
  },{
    _id:"1123",
    name:"Iphone 11",
    price:200,
    description:"hola",
    image_url:"https://http2.mlstatic.com/D_NQ_NP_656548-MLA46114829749_052021-O.webp"
  },{
    _id:"1123",
    name:"Iphone 11",
    price:200,
    description:"hola",
    image_url:"https://http2.mlstatic.com/D_NQ_NP_656548-MLA46114829749_052021-O.webp"
  },{
    _id:"1123",
    name:"Iphone 11",
    price:200,
    description:"hola",
    image_url:"https://http2.mlstatic.com/D_NQ_NP_656548-MLA46114829749_052021-O.webp"
  },{
    _id:"1123",
    name:"Iphone 11",
    price:200,
    description:"hola",
    image_url:"https://http2.mlstatic.com/D_NQ_NP_656548-MLA46114829749_052021-O.webp"
  },{
    _id:"1123",
    name:"Iphone 11",
    price:200,
    description:"hola",
    image_url:"https://http2.mlstatic.com/D_NQ_NP_656548-MLA46114829749_052021-O.webp"
  }])
  return (   
    <ThemeProvider theme={theme}>
    <Routes>
      <Route path='/' element={<WebA products={products} />}/>
    </Routes>
    </ThemeProvider>
  );
}

export default App;
