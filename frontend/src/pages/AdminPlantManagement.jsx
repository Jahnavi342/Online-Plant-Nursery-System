import axios from "axios";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

const AdminPlantManagement = () => {
  const { user } = useAuth();
  const [plants, setPlants] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const fetchPlants = async () => {
    try {
      const { data } = await axiosInstance.get("/api/plants");
      setPlants(data);
    } catch (err) {
      alert("Failed to fetch plants.");
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleSubmit = async () => {
    if (!formData.name || !formData.price) {
      alert("Please fill all required fields.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      if (editingId) {
        // UPDATE
        await axios.put(`http://localhost:5001/api/plants/${editingId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Plant updated");
      } else {
        // ADD
        if (!imageFile) return alert("Please upload an image");
        await axios.post("http://localhost:5001/api/plants", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Plant added");
      }

      setFormData({
        name: "",
        category: "",
        price: "",
        description: "",
      });
      setImageFile(null);
      setEditingId(null);
      fetchPlants();
    } catch {
      alert("Failed to save plant");
    }
  };

  const handleEdit = (plant) => {
    setFormData({
      name: plant.name,
      category: plant.category,
      price: plant.price,
      description: plant.description,
    });
    setImageFile(null);
    setEditingId(plant._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: "",
      category: "",
      price: "",
      description: "",
    });
    setImageFile(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this plant?")) return;
    try {
      await axiosInstance.delete(`/api/plants/${id}`);
      fetchPlants();
    } catch {
      alert("Failed to delete plant");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">
        {editingId ? "Edit Plant" : "Add New Plant"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="p-2 border rounded col-span-2"
        />
        <div className="col-span-2 flex gap-4">
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white p-2 rounded w-full"
          >
            {editingId ? "Update Plant" : "Add Plant"}
          </button>
          {editingId && (
            <button
              onClick={handleCancelEdit}
              className="bg-gray-400 text-white p-2 rounded w-full"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-3">All Plants</h3>
      <div className="grid gap-4">
        {plants.map((plant) => (
          <div
            key={plant._id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <img
                src={`http://localhost:5001${plant.image}`}
                alt={plant.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{plant.name}</p>
                <p>
                  ${plant.price} - {plant.category}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(plant)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(plant._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPlantManagement;
