import { useState } from "react";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

const OrderForm = ({ plantId, price }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    plant: plantId,
    quantity: 1,
    customerName: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "Cash on Delivery",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/api/orders", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      alert("Order placed successfully!");
    } catch (error) {
      alert("Failed to place order.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Place Your Order</h2>

      <input
        type="text"
        placeholder="Your Name"
        className="w-full p-2 mb-2 border rounded"
        value={formData.customerName}
        onChange={(e) =>
          setFormData({ ...formData, customerName: e.target.value })
        }
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mb-2 border rounded"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Phone Number"
        className="w-full p-2 mb-2 border rounded"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Delivery Address"
        className="w-full p-2 mb-2 border rounded"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        required
      />

      <label className="block mb-2">Quantity</label>
      <input
        type="number"
        min={1}
        value={formData.quantity}
        className="w-full p-2 mb-2 border rounded"
        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
      />

      <label className="block mb-2">Payment Method</label>
      <select
        className="w-full p-2 mb-4 border rounded"
        value={formData.paymentMethod}
        onChange={(e) =>
          setFormData({ ...formData, paymentMethod: e.target.value })
        }
      >
        <option value="Cash on Delivery">Cash on Delivery</option>
        <option value="Online">Online</option>
      </select>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Place Order
      </button>
    </form>
  );
};

export default OrderForm;
