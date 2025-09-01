import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import "./OrdersPage.css";
import { formatMoney } from "../../utilis/money";
import { OrderDetails } from "./OrderDetails";
import { TrackingPage } from "../TrackingPage";

export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get("/api/orders?expand=products");
      setOrders(response.data);
    };
    fetchOrders();
  }, []);

  return (
    <>
      <link rel="icon" type="image/png" href="/orders-favicon.png" />

      <title>Orders</title>

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(order.orderTimeMs).format("MMMM D")}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{formatMoney(order.totalCostCents)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <OrderDetails order={order} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
