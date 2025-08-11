import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

const PlaceOrder = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [plant, setPlant] = useState(null);
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
      const { data } = await axiosInstance.get(`/api/plants/${id}`);
      setPlant(data);
    };
    fetchPlant();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(
        "/api/orders",
        { ...formData, plant: id },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      alert("Failed to place order");
    }
  };

  if (!plant) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Order: {plant.name}</h2>
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
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default PlaceOrder;
