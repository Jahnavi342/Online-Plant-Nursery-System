import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return (
      <h2 className="text-red-600 text-center mt-10">
        Access denied. Admins only.
      </h2>
    );
  }

  return (
    <div className="mt-10">
      {/* HERO SECTION */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 px-6 lg:px-16 mb-16">
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold mb-4">Welcome, Admin 🌿</h1>
          <p className="text-lg mb-6 text-gray-700">
            Use the tools below to manage plants, orders, and users effectively.
            Keep your nursery running smoothly!
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/admin/plants"
              className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
            >
              🪴 Manage Plants
            </Link>
            <Link
              to="/admin/orders"
              className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
            >
              📦 Manage Orders
            </Link>
            <Link
              to="/admin/users"
              className="bg-yellow-600 text-white px-4 py-2 rounded shadow hover:bg-yellow-700"
            >
              👥 View Users
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2">
          <img
            src="/images/gallery6.avif"
            alt="Admin Hero"
            className="rounded shadow-lg w-full max-h-[400px] object-cover"
          />
        </div>
      </div>

      {/* GALLERY / ADMIN HIGHLIGHTS */}
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

      {/* FOOTER */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-10">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Green Nursery Admin Panel. All
          rights reserved.
        </p>
        <p className="text-sm mt-1">Contact: admin@greennursery.com</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
