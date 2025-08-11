import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import OrderHistory from "./components/OrderHistory";
import PlaceOrder from "./components/PlaceOrder";
import PlantDetails from "./components/PlantDetails";
import PlantList from "./components/PlantList";
import ProtectedRoute from "./components/ProtectedRoute";
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
        <Route path="/plant-care" element={<PlantCareTips />} />
        
        {/* Protected User Routes */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/orders" 
          element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          } 
        />
        
        {/* Public Plant Routes */}
        <Route path="/plants" element={<PlantList />} />
        <Route path="/plants/:id" element={<PlantDetails />} />
        <Route 
          path="/order/:id" 
          element={
            <ProtectedRoute>
              <PlaceOrder />
            </ProtectedRoute>
          } 
        />

        {/* Protected Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/plants" 
          element={
            <ProtectedRoute adminOnly>
              <AdminPlantManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/orders" 
          element={
            <ProtectedRoute adminOnly>
              <AdminOrderManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute adminOnly>
              <AdminUserList />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
