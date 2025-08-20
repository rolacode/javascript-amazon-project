import { HomePage } from './pages/HomePage';
import { Routes, Route } from 'react-router';
import './App.css';
import { CheckoutPage } from './pages/CheckoutPage';

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/Checkout" element={<CheckoutPage />} /> 
    </Routes>
  )
}

export default App
