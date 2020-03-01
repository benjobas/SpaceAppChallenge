const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/planets');

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
})

const Planet = mongoose.model('Planet', planetSchema);

module.exports = Planet;