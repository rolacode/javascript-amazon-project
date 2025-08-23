import axios from "axios";
import { useEffect, useState } from "react";
import { CheckoutHeader } from "../../components/CheckoutHeader";
import { OrderSummary } from "./OrderSummary";
import "./CheckoutPage.css";
import { PaymentSummary } from "./PaymentSummary";

export function CheckoutPage({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      let response = await axios.get("/api/delivery-options?expand=estimatedDeliveryTime");
        setDeliveryOptions(response.data);

      response = await axios.get("/api/payment-summary");
        setPaymentSummary(response.data);  
    }

    fetchCheckoutData();
  }, []); // The empty array ensures this runs only once

  return (
    <>
      <link rel="icon" type="image/png" href="/cart-favicon.png" />

      <title>Checkout</title>

      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>
        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />

          <PaymentSummary paymentSummary={paymentSummary} />   
        </div>
      </div>
    </>
  );
}