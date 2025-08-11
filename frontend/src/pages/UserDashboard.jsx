import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../axiosConfig";

const UserDashboard = () => {
  const [plants, setPlants] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const fetchPlants = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const { data } = await axiosInstance.get(`/api/plants?${query}`);
      setPlants(data);
    } catch (err) {
      console.error("Error fetching plants:", err);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, [filters]);

  const indoorPlants = plants.filter((p) =>
    p.category?.toLowerCase().includes("indoor")
  );
  const outdoorPlants = plants.filter((p) =>
    p.category?.toLowerCase().includes("outdoor")
  );

  return (
    <div className="p-4">
      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 py-12 bg-green-100 rounded-md shadow-md">
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-extrabold text-green-800 mb-4">
            Welcome to Green Nursery 🌿
          </h1>
          <p className="mb-6 text-lg text-gray-700">
            Explore a curated collection of lush indoor and outdoor plants
            perfect for your space. Enjoy smooth browsing, effortless ordering,
            and prompt delivery.
          </p>
          <Link
            to="/plants"
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
          >
            Browse All Plants
          </Link>
        </div>
        <div className="lg:w-1/2 mb-6 lg:mb-0">
          <img
            src="/images/gallery4.avif"
            alt="Hero Plants"
            className="rounded shadow-lg w-full max-h-[400px] object-cover"
          />
        </div>
      </section>

      {/* Filter Bar */}
      <div className="mt-10 mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          Find Your Perfect Plant 🌱
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by name"
            className="border p-2 rounded shadow-sm"
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category (e.g., Indoor)"
            className="border p-2 rounded shadow-sm"
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Min Price"
            className="border p-2 rounded shadow-sm"
            onChange={(e) =>
              setFilters({ ...filters, minPrice: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Max Price"
            className="border p-2 rounded shadow-sm"
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: e.target.value })
            }
          />
        </div>
      </div>

      {/* Indoor Plants Section */}
      {indoorPlants.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-green-700 mt-8 mb-4">
            🌼 Indoor Plants
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {indoorPlants.map((plant) => (
              <div
                key={plant._id}
                className="border p-4 rounded shadow bg-white"
              >
                <img
                  src={`{plant.image}`}
                  alt={plant.name}
                  className="w-full h-48 object-cover rounded mb-2"
                />
                <h3 className="text-lg font-semibold">{plant.name}</h3>
                <p className="text-sm text-gray-600">{plant.category}</p>
                <p className="font-medium text-green-700">${plant.price}</p>
                <Link
                  to={`/plants/${plant._id}`}
                  className="text-white font-bold p-3 rounded bg-black mt-2 inline-block "
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Outdoor Plants Section */}
      {outdoorPlants.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-green-700 mt-10 mb-4">
            🌳 Outdoor Plants
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {outdoorPlants.map((plant) => (
              <div
                key={plant._id}
                className="border p-4 rounded shadow bg-white"
              >
                <img
                  src={`{plant.image}`}
                  alt={plant.name}
                  className="w-full h-48 object-cover rounded mb-2"
                />
                <h3 className="text-lg font-semibold">{plant.name}</h3>
                <p className="text-sm text-gray-600">{plant.category}</p>
                <p className="font-medium text-green-700">${plant.price}</p>
                <Link
                  to={`/plants/${plant._id}`}
                  className="text-white font-bold p-3 rounded bg-black mt-2 inline-block "
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Footer */}
      <footer className="bg-green-700 text-white py-6 text-center mt-10 rounded-t">
        <p className="text-sm">
          © {new Date().getFullYear()} Green Nursery. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Fast Delivery | Eco-Friendly Packaging | Quality Guaranteed
        </p>
      </footer>
    </div>
  );
};

export default UserDashboard;
