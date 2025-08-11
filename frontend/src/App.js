import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import OrderHistory from "./components/OrderHistory";
import PlaceOrder from "./components/PlaceOrder";
import PlantDetails from "./components/PlantDetails";
import PlantList from "./components/PlantList";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrderManagement from "./pages/AdminOrderManagement";
import AdminPlantManagement from "./pages/AdminPlantManagement";
import AdminUserList from "./pages/AdminUserList";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import PlantCareTips from "./pages/PlantCareTips";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* User Routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/plants" element={<PlantList />} />
        <Route path="/plants/:id" element={<PlantDetails />} />
        <Route path="/order/:id" element={<PlaceOrder />} />
        <Route path="/orders" element={<OrderHistory />} />

        <Route path="/plant-care" element={<PlantCareTips />} />
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/plants" element={<AdminPlantManagement />} />
        <Route path="/admin/orders" element={<AdminOrderManagement />} />
        <Route path="/admin/users" element={<AdminUserList />} />
      </Routes>
    </Router>
  );
}

export default App;
