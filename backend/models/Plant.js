const mongoose = require("mongoose");

const PlantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  image: { type: String },
  price: { type: Number },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Plant", PlantSchema);
