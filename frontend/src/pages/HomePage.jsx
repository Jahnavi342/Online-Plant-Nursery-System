import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../axiosConfig";

const HomePage = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await axiosInstance.get("/api/plants");
        setPlants(res.data);
      } catch (err) {
        console.error("Failed to load plants", err);
      }
    };

    fetchPlants();
  }, []);

  const popularPlants = plants.slice(0, 4);
  const discountedPlants = plants
    .filter((plant) => plant.price < 300)
    .slice(0, 4);

  return (
    <div className="text-gray-800">
      {/* 🟢 Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 py-12 bg-green-50">
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold mb-4">Grow Your Green Space</h1>
          <p className="mb-6 text-lg">
            Discover a wide variety of plants perfect for your home, garden, or
            workspace. Easy ordering and fast delivery!
          </p>
          <Link
            to="/plants"
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
          >
            Browse Plants
          </Link>
        </div>
        <div className="lg:w-1/2">
          <img
            src="/images/hero.avif"
            alt="Plants"
            className="rounded shadow-lg w-full max-h-[400px] object-cover"
          />
        </div>
      </section>

      {/* 🟢 Popular Plants */}
      <section className="px-6 py-10 bg-white">
        <h2 className="text-2xl font-bold mb-4">Popular Plants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularPlants.map((plant) => (
            <div
              key={plant._id}
              className="bg-green-100 p-4 rounded shadow hover:shadow-md"
            >
              <img src={`http://localhost:5001${plant.image}`} />

              <h3 className="text-lg font-semibold mt-2">{plant.name}</h3>
              <p className="text-sm text-gray-600">${plant.price}</p>
              <Link
                to={`/plants/${plant._id}`}
                className="text-green-700 font-semibold block mt-2 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-gray-50 py-10 px-6 lg:px-16">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Quick View Gallery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            "gallery1.webp",
            "gallery2.webp",
            "gallery3.webp",
            "gallery4.avif",
            "gallery5.avif",
          ].map((img, index) => (
            <div key={index} className="overflow-hidden rounded shadow">
              <img
                src={`/images/${img}`}
                alt={`Gallery ${index + 1}`}
                className="w-full h-64 object-cover transition-transform hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
      {/* 🟢 Info Section */}
      <section className="px-6 py-12 bg-white border-t border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-center">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="font-bold text-lg mb-2">🚚 Fast Delivery</h3>
            <p>We ensure quick and safe delivery of your plants.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">💯 Quality Plants</h3>
            <p>Only healthy, well-grown plants are listed on our platform.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">📦 Easy Ordering</h3>
            <p>Simple and secure checkout with flexible payment options.</p>
          </div>
        </div>
      </section>

      {/* 🟢 Footer */}
      <footer className="bg-green-700 text-white py-6 text-center mt-6">
        <p>
          © {new Date().getFullYear()} Online Plant Nursery. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
