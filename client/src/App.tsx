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

export const api="https://apisbs.herokuapp.com"

export const ProductContext=createContext({} as IProdContext)

export const mil = (number:number) => {
  const exp = /(\d)(?=(\d{3})+(?!\d))/g;
  const rep = '$1.';
  let arr = number.toString().split('.');
  arr[0] = arr[0].replace(exp,rep);
  return arr[1] ? arr.join('.'): arr[0];
}

function App() {
  const [products,setProducts]=useState<IProduct[]>([])
  const [loaded,setLoaded]=useState(false)
  
  useEffect(()=>{
    axios(`${api}/products`).then((res)=>setProducts(()=>res.data)).then(()=>setLoaded(true))
  },[])

  return (  
    <ProductContext.Provider value={{products,setProducts,loaded}}>
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


