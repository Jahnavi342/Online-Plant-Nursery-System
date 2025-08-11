import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    university: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!isAuthenticated()) {
        setError("Please log in to view your profile");
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get("/api/auth/profile");
        setFormData({
          name: response.data.name,
          email: response.data.email,
          university: response.data.university || "",
          address: response.data.address || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        if (error.response?.status === 401) {
          setError("Your session has expired. Please log in again.");
        } else {
          setError("Failed to fetch profile. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user, isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.put("/api/auth/profile", formData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response?.status === 401) {
        setError("Your session has expired. Please log in again.");
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;
    
    try {
      await axiosInstance.delete(`/api/auth/users/${user._id}`);
      alert("Account deleted successfully");
      logout();
      navigate("/register");
    } catch (err) {
      console.error("Error deleting account:", err);
      if (err.response?.status === 401) {
        alert("Your session has expired. Please log in again.");
      } else {
        alert("Failed to delete account. Please try again.");
      }
    }
  };

  if (!isAuthenticated()) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center">
        <p className="text-red-500">Please log in to view your profile.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">Your Profile</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="University"
          value={formData.university}
          onChange={(e) =>
            setFormData({ ...formData, university: e.target.value })
          }
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <button
          onClick={handleDeleteUser}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
