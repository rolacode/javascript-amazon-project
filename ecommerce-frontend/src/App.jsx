import { HomePage } from './pages/HomePage';
import { Routes, Route } from 'react-router';
import './App.css';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/Checkout" element={<CheckoutPage />} />
      <Route path="/Orders" element={<OrdersPage />} />
      <Route path="/tracking" element={<TrackingPage />} /> 
    </Routes>
  )
}

export default App
