import { HomePage } from './pages/home/HomePage';
import { Routes, Route } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Header } from './components/Header';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/orders/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';
import { CheckoutHeader } from './components/CheckoutHeader';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {

  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch cart items from the API
    const fetchAppData = async () => {
      const response = await axios.get("/api/cart-items?expand=product");
      setCart(response.data);   
    };
    
    fetchAppData();
  }, []);
  

  return (
    <Routes>
      <Route path="/header" element={<Header />} />
      <Route path="/checkout-header" element={<CheckoutHeader />} />
      <Route index element={<HomePage cart={cart} />} />
      <Route path="/Checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="/Orders" element={<OrdersPage cart={cart} />} />
      <Route path="/tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} /> 
      <Route path="*" element={<NotFoundPage cart={cart} />} />
    </Routes>
  )
}

export default App
