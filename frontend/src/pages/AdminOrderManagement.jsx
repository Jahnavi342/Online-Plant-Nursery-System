import { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

const AdminOrderManagement = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const { data } = await axiosInstance.get("/api/orders", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    await axiosInstance.put(
      `/api/orders/${id}/status`,
      { status },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    fetchOrders();
  };

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
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Manage Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="border p-4 mb-4 rounded shadow">
          <p>
            <strong>Customer:</strong> {order.customerName}
          </p>
          <p>
            <strong>Plant:</strong> {order.plant?.name}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <select
            value={order.status}
            onChange={(e) => handleStatusChange(order._id, e.target.value)}
            className="mt-2 p-2 border rounded"
          >
            <option>Pending</option>
            <option>Accepted</option>
            <option>Packed</option>
            <option>On the Way</option>
            <option>Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default AdminOrderManagement;
