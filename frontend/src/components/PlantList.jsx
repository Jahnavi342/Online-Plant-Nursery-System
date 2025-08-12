import { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";

const PlantList = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await axiosInstance.get("/api/plants");
        setPlants(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPlants();
  }, []);

  return (
    <div className="px-6 py-10 bg-green-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-10">
        🌱 Available Plants
      </h2>

      {plants.length === 0 ? (
        <p className="text-center text-gray-600">
          No plants available right now.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plants.map((plant) => (
            <div
              key={plant._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={`{plant.image}`}
                alt={plant.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  {plant.name}
                </h3>
                <p className="text-gray-600 mb-1">
                  <strong>Category:</strong> {plant.category}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Price:</strong> ${plant.price}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {plant.description}
                </p>
                <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlantList;

