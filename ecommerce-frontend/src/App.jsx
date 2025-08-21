import { HomePage } from './pages/HomePage';
import { Routes, Route } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Header } from './components/Header';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';
import { CheckoutHeader } from './components/CheckoutHeader';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {

  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch cart items from the API
    axios.get("/api/cart-items")
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, []);
  

  return (
    <Routes>
      <Route path="/header" element={<Header />} />
      <Route path="/checkout-header" element={<CheckoutHeader />} />
      <Route index element={<HomePage cart={cart} />} />
      <Route path="/Checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="/Orders" element={<OrdersPage />} />
      <Route path="/tracking" element={<TrackingPage />} /> 
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
