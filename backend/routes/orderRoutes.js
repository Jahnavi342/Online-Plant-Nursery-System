const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

// 📦 Create a new order
router.post("/", protect, async (req, res) => {
  const {
    plant,
    quantity,
    customerName,
    email,
    phone,
    address,
    paymentMethod,
  } = req.body;

  try {
    const newOrder = new Order({
      user: req.user.id,
      plant,
      quantity,
      customerName,
      email,
      phone,
      address,
      paymentMethod,
    });

    const saved = await newOrder.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📄 Get all orders for admin
router.get("/", protect, async (req, res) => {
  try {
    const isAdmin = req.user.role === "admin";

    const orders = isAdmin
      ? await Order.find().populate("user plant")
      : await Order.find({ user: req.user.id }).populate("plant");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔄 Update order status (admin only)
router.put("/:id/status", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Access denied" });

    order.status = req.body.status;
    await order.save();

    res.json({ message: "Status updated", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// In routes/orderRoutes.js
// Cancel Order (User or Admin)
router.put("/:id/cancel", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Users can only cancel their own orders unless admin
    if (req.user.role !== "admin" && order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (order.status === "Delivered") {
      return res
        .status(400)
        .json({ message: "Cannot cancel an already delivered order" });
    }

    order.status = "Cancelled";
    await order.save();

    res.json({ message: "Order cancelled", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
