const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://benjobas:benjitosan2@cluster0.rkc41.mongodb.net/planet?retryWrites=true&w=majority&appName=Cluster0', { useUnifiedTopology: true });

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
})

const Planet = mongoose.model('Planet', planetSchema);

module.exports = Planet;