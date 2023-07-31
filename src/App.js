import React, {useState }from 'react';
import logo from './logo.svg';

import './App.css';
import ProductList from './features/product/components/ProductList';
import Home from './pages/Home';


import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Link,
} from "react-router-dom";

import Cart from './features/cart/Cart';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';




const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "cart",
    element: <CartPage/>,
  },
  {
    path: "checkout",
    element: <Checkout/>,
  },
  
  

]);



function App() {

  const [cartData, setCartData ] =useState([])
  return (
    <div className="App">
      
      <RouterProvider router={router} >
      </RouterProvider>
    </div>
  );
}

export default App;
