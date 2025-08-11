import { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

const AdminUserList = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axiosInstance.get("/api/auth/users", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axiosInstance.delete(`/api/auth/users/${userId}`);
      alert("User deleted successfully");
      fetchUsers(); // Refresh user list
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Registered Users</h2>
      <div className="grid gap-4">
        {users.map((u) => (
          <div key={u._id} className="border p-4 rounded shadow">
            <p>
              <strong>Name:</strong> {u.name}
            </p>
            <p>
              <strong>Email:</strong> {u.email}
            </p>
            <p>
              <strong>Role:</strong> {u.role}
            </p>
            <p>
              <strong>University:</strong> {u.university || "N/A"}
            </p>
            <p>
              <strong>Address:</strong> {u.address || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUserList;
