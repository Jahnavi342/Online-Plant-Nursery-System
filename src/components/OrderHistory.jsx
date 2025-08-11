import { useEffect, useState, useCallback } from "react";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, loading: authLoading } = useAuth();

  const fetchOrders = useCallback(async () => {
    if (!isAuthenticated()) {
      setError("Please log in to view your orders");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { data } = await axiosInstance.get("/api/orders");
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      if (err.response?.status === 401) {
        setError("Your session has expired. Please log in again.");
      } else {
        setError("Failed to load orders. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!authLoading) {
      fetchOrders();
    }
  }, [authLoading, fetchOrders]);

  const handleCancel = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    
    try {
      await axiosInstance.put(`/api/orders/${orderId}/cancel`);
      alert("Order cancelled successfully");
      fetchOrders(); // Refresh the orders list
    } catch (err) {
      console.error("Error cancelling order:", err);
      if (err.response?.status === 401) {
        alert("Your session has expired. Please log in again.");
      } else {
        alert("Failed to cancel order. Please try again.");
      }
    }
  };

  if (authLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!isAuthenticated()) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Your Order History</h2>
        <p className="text-red-500">Please log in to view your orders.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Your Order History</h2>
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Your Order History</h2>
        <p className="text-red-500">{error}</p>
        <button 
          onClick={fetchOrders}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

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
              {order.status !== "Delivered" && order.status !== "Cancelled" && (
                <button
                  onClick={() => handleCancel(order._id)}
                  className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
