import axios from "axios";
import { useState } from "react";

const AddPlantForm = () => {
  const [plant, setPlant] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setPlant({ ...plant, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(plant).forEach((key) => {
      formData.append(key, plant[key]);
    });
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await axios.post("http://localhost:5001/api/plants", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Plant added successfully!");
      setPlant({
        name: "",
        category: "",
        price: "",
        description: "",
      });
      setImageFile(null);
    } catch (err) {
      console.error(err);
      alert("Failed to add plant");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border">
      <h2 className="text-xl font-bold mb-4">Add New Plant</h2>
      <input
        name="name"
        placeholder="Name"
        value={plant.name}
        onChange={handleChange}
        className="w-full p-2 mb-3 border"
        required
      />
      <input
        name="category"
        placeholder="Category"
        value={plant.category}
        onChange={handleChange}
        className="w-full p-2 mb-3 border"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full p-2 mb-3 border"
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={plant.price}
        onChange={handleChange}
        className="w-full p-2 mb-3 border"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={plant.description}
        onChange={handleChange}
        className="w-full p-2 mb-3 border"
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded"
      >
        Add Plant
      </button>
    </form>
  );
};

export default AddPlantForm;
