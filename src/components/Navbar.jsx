import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-green-700 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold hover:underline">
        🌿 Plant Nursery
      </Link>

      <div className="flex gap-4 items-center">
        {/* If user is logged in */}
        {user ? (
          <>
            {user.role === "admin" ? (
              <>
                <Link to="/admin" className="hover:underline">
                  Dashboard
                </Link>
                <Link to="/admin/plants" className="hover:underline">
                  Manage Plants
                </Link>
                <Link to="/admin/orders" className="hover:underline">
                  Manage Orders
                </Link>
                <Link to="/admin/users" className="hover:underline">
                  View Users
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
                <Link to="/profile" className="hover:underline">
                  Profile
                </Link>
                <Link to="/plant-care" className="hover:underline">
                  Plant Care Tips
                </Link>

                <Link to="/orders" className="hover:underline">
                  My Orders
                </Link>
              </>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 ml-2"
            >
              Logout
            </button>
          </>
        ) : (
          // If no user is logged in
          <>
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/plant-care" className="hover:underline">
              Plant Care Tips
            </Link>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-green-700 px-4 py-1 rounded hover:bg-gray-200"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
