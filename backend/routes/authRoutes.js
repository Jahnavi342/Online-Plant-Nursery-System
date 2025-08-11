const express = require("express");
const {
  registerUser,
  loginUser,
  updateUserProfile,
  getProfile,
  getAllUsers,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const User = require("../models/User");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateUserProfile);
router.get("/users", protect, getAllUsers);

router.delete("/users/:id", protect, async (req, res) => {
  try {
    // Only admin or the same user can delete
    if (req.user.role !== "admin" && req.user.id !== req.params.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
