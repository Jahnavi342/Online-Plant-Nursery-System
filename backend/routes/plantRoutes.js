const express = require("express");
const router = express.Router();
const multer = require("multer");
const Plant = require("../models/Plant");
const path = require("path");

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder to save images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Serve images statically
router.use("/uploads", express.static("uploads"));

// GET all plants with filters
router.get("/", async (req, res) => {
  const { category, minPrice, maxPrice, name } = req.query;
  let filter = {};

  if (category) filter.category = category;
  if (name) filter.name = { $regex: name, $options: "i" };
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  try {
    const plants = await Plant.find(filter);
    res.json(plants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single plant by ID
router.get("/:id", async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) return res.status(404).json({ message: "Plant not found" });
    res.json(plant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a new plant
router.post("/", upload.single("image"), async (req, res) => {
  const { name, category, price, description } = req.body;
  const image = req.file ? `/api/plants/uploads/${req.file.filename}` : "";

  try {
    const newPlant = new Plant({ name, category, price, description, image });
    await newPlant.save();
    res.status(201).json(newPlant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update a plant
router.put("/:id", async (req, res) => {
  const { name, category, image, price, description } = req.body;
  try {
    const updatedPlant = await Plant.findByIdAndUpdate(
      req.params.id,
      { name, category, image, price, description },
      { new: true, runValidators: true }
    );
    if (!updatedPlant)
      return res.status(404).json({ message: "Plant not found" });
    res.json(updatedPlant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a plant
router.delete("/:id", async (req, res) => {
  try {
    await Plant.findByIdAndDelete(req.params.id);
    res.json({ message: "Plant deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
