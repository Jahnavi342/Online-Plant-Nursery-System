import { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/api/orders", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setOrders(response.data);
      } catch (error) {
        alert("Failed to load orders.");
      }
    };

    fetchOrders();
  }, [user.token]);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="border p-4 mb-4 rounded shadow">
          <p>
            <strong>Plant:</strong> {order.plant?.name}
          </p>
          <p>
            <strong>Quantity:</strong> {order.quantity}
          </p>
          <p>
            <strong>Payment:</strong> {order.paymentMethod}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Ordered on:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
