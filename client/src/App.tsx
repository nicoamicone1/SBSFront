import React, { createContext } from "react"
import './App.css';
import { Route, Routes } from 'react-router-dom';
import WebA from './pages/WebA';
import WebB from './pages/WebB';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import {useState,useEffect} from "react"
import { IProduct } from './interfaces';
import axios from "axios"
import {IProdContext} from "./interfaces"

let theme = createTheme();
theme = responsiveFontSizes(theme);

export const api="https://apisbs.herokuapp.com/products"
export const ProductContext=createContext({} as IProdContext)

function App() {
  const [products,setProducts]=useState<IProduct[]>([])
  
  useEffect(()=>{
    axios(`${api}/products`).then((res)=>setProducts(()=>res.data))
  },[])

  return (  
    <ProductContext.Provider value={{products,setProducts}}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path='/' element={<WebA/>}/>
          <Route path='/WebB' element={<WebB/>}/>
        </Routes>
      </ThemeProvider>
    </ProductContext.Provider>
  );
}

export default App;


