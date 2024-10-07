const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true });

const planetSchema = mongoose.Schema({
  name: String,
  starName: String,
  orbitPer: Number,
  orbitMax: Number,
  distance: Number,
  planetTemp: Number,
  planetMass: Number,
  discYear: String,
  starLum: Number,
  starTemp: Number,
  ra: Number,
  dec: Number,
  color: String,
  description: String,
});

const Planet = mongoose.model("Planet", planetSchema);

module.exports = Planet;
