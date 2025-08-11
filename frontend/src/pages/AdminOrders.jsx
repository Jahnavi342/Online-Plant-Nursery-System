import { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

const AdminOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [statusOptions] = useState([
    "Pending",
    "Accepted",
    "Packed",
    "On the Way",
    "Delivered",
  ]);

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

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axiosInstance.put(
        `/api/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      fetchOrders(); // refresh list
    } catch (error) {
      alert("Failed to update status.");
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      fetchOrders();
    }
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">Admin Order Management</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded shadow bg-white">
              <p>
                <strong>Customer:</strong> {order.customerName}
              </p>
              <p>
                <strong>Email:</strong> {order.email}
              </p>
              <p>
                <strong>Phone:</strong> {order.phone}
              </p>
              <p>
                <strong>Address:</strong> {order.address}
              </p>
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
                <strong>Placed At:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>

              <div className="mt-2">
                <label className="mr-2 font-semibold">Status:</label>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="p-2 border rounded"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
