import axios from "axios";
import { NavLink, useParams } from "react-router";
import { Header } from "../components/Header";
import "./TrackingPage.css";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const trackOrder = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`
      );
      setOrder(response.data);
    };

    if (orderId) {
      trackOrder();
    }
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  // find the product from the order by productId
  const orderProduct = order.products.find(
    (p) => String(p.productId) === String(productId)
  );

  if (!orderProduct) {
    return <div>Product not found in this order.</div>;
  }

  // --- Delivery progress calculation ---
  const totalDeliveryTimeMs =
    orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
  if (deliveryPercent > 100) deliveryPercent = 100;
  if (deliveryPercent < 0) deliveryPercent = 0;

  // --- Status flags ---
  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent === 100;

  return (
    <>
      <link rel="icon" type="image/png" href="/tracking-favicon.png" />
      
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <NavLink className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </NavLink>

          <div className="delivery-date">
            {isDelivered ? "Delivered on " : "Arriving on "}{" "}
            {dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
          </div>

          <div className="product-info">{orderProduct.product.name}</div>
          <div className="product-info">Quantity: {orderProduct.quantity}</div>

          <img
            className="product-image"
            src={orderProduct.product.image}
            alt={orderProduct.product.name}
          />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing ? "current-status" : ""}`}>
              Preparing
            </div>
            <div className={`progress-label ${isShipped ? "current-status" : ""}`}>
              Shipped
            </div>
            <div className={`progress-label ${isDelivered ? "current-status" : ""}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
