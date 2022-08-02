import React, { createContext } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import WebB from "./pages/WebB";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import { useState, useEffect } from "react";
import { IProduct } from "./interfaces";
import axios from "axios";
import { IProdContext } from "./interfaces";
import io from "socket.io-client";

let theme = createTheme();
theme = responsiveFontSizes(theme);

export const api = "https://graphqlsbs.herokuapp.com/graphql";

export const ProductContext = createContext({} as IProdContext);

export const mil = (number: number) => {
  const exp = /(\d)(?=(\d{3})+(?!\d))/g;
  const rep = "$1.";
  let arr = number.toString().split(".");
  arr[0] = arr[0].replace(exp, rep);
  return arr[1] ? arr.join(".") : arr[0];
};
const client = io("https://graphqlsbs.herokuapp.com/");

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    client.connect();
  }, []);

  client.on("reload", (query) => {
    console.log(query);
    axios
      .post(`${api}`, {
        query: query,
      })
      .then((res) => {
        setProducts(() => res.data.data.allProducts);
      })
      .then(() => setLoaded(true));
  });

  return (
    <ProductContext.Provider value={{ products, setProducts, loaded, client }}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<WebB />} />
        </Routes>
      </ThemeProvider>
    </ProductContext.Provider>
  );
}

export default App;
