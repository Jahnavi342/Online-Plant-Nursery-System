import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

const PlaceOrder = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    quantity: 1,
    paymentMethod: "Cash on Delivery",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        setError(null);
        const { data } = await axiosInstance.get(`/api/plants/${id}`);
        setPlant(data);
      } catch (err) {
        console.error("Error fetching plant:", err);
        setError("Failed to load plant details. Please try again.");
      }
    };
    fetchPlant();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated()) {
      setError("Please log in to place an order.");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      await axiosInstance.post("/api/orders", { ...formData, plant: id });
      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error("Error placing order:", err);
      if (err.response?.status === 401) {
        setError("Your session has expired. Please log in again.");
      } else {
        setError("Failed to place order. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated()) {
    return (
      <div className="max-w-md mx-auto mt-10 text-center">
        <p className="text-red-500">Please log in to place an order.</p>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="text-center mt-10">
        {error ? (
          <div>
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Order: {plant.name}</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          required
          value={formData.customerName}
          onChange={(e) =>
            setFormData({ ...formData, customerName: e.target.value })
          }
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Phone"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Address"
          required
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Quantity"
          min="1"
          required
          value={formData.quantity}
          onChange={(e) =>
            setFormData({ ...formData, quantity: parseInt(e.target.value) })
          }
          className="w-full mb-3 p-2 border rounded"
        />
        <select
          value={formData.paymentMethod}
          onChange={(e) =>
            setFormData({ ...formData, paymentMethod: e.target.value })
          }
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="Cash on Delivery">Cash on Delivery</option>
          <option value="Online">Online</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default PlaceOrder;
