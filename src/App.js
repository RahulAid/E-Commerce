import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import ProductList from './features/product/components/ProductList';
import Home from './pages/Home';
import SignupPage from './pages/SignupPage';
import {LoginPage} from './pages/LoginPage';

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { Signup } from './features/auth/components/Signup';
import Cart from './features/cart/Cart';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetail from './features/product/components/ProductDetail';
import ProductDetailPage from './pages/ProductDetailPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "login",
    element: <LoginPage/>,
  },
  {
    path: "signup",
    element: <SignupPage/>,
  },
  {
    path: "cart",
    element: <CartPage/>,
  },
  {
    path: "checkout",
    element: <Checkout/>,
  },
  {
    path: "product-detail",
    element: <ProductDetailPage/>,
  }
]);



function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
