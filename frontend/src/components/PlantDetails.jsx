import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../axiosConfig";

const PlantDetails = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const { data } = await axiosInstance.get(`/api/plants/${id}`);
        setPlant(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPlant();
  }, [id]);

  if (!plant) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 shadow rounded">
      <img src={`http://localhost:5001${plant.image}`} />
      <h2 className="text-2xl font-bold">{plant.name}</h2>
      <p className="mb-2 font-bold">Category: {plant.category}</p>
      <p className="mb-2 font-bold">Price: ${plant.price}</p>
      <p className="mb-4">{plant.description}</p>
      <button
        onClick={() => navigate(`/order/${plant._id}`)}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Order This Plant
      </button>
    </div>
  );
};

export default PlantDetails;
