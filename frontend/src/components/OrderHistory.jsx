import { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  const fetchOrders = async () => {
    const { data } = await axiosInstance.get("/api/orders", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setOrders(data);
  };
  useEffect(() => {
    fetchOrders();
  }, [user]);

  const handleCancel = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await axiosInstance.put(`/api/orders/${orderId}/cancel`);
      alert("Order cancelled");
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to cancel order");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Order History</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="p-4 border rounded shadow">
              <p>
                <strong>Plant:</strong> {order.plant?.name}
              </p>
              <p>
                <strong>Quantity:</strong> {order.quantity}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Placed on:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
