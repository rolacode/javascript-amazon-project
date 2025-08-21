import { HomePage } from './pages/HomePage';
import { Routes, Route } from 'react-router';
import './App.css';
import { Header } from './components/Header';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';
import { CheckoutHeader } from './components/CheckoutHeader';

function App() {
  return (
    <Routes>
      <Route path="/header" element={<Header />} />
      <Route path="/checkout-header" element={<CheckoutHeader />} />
      <Route index element={<HomePage />} />
      <Route path="/Checkout" element={<CheckoutPage />} />
      <Route path="/Orders" element={<OrdersPage />} />
      <Route path="/tracking" element={<TrackingPage />} /> 
    </Routes>
  )
}

export default App
