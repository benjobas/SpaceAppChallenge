const Planet = require('./index.js');
const Promise = require('bluebird');

const removeOld = () => new Promise((resolve, reject) => {
  Planet.deleteMany({}, (err, data) => {
    if (err) { reject(err) }
    else { resolve(data) }
  })
});

const insertPlanets = (entries) => {
  let planetList = entries.map(entry => {
    const toEnter = {
      name: entry.pl_name,
      starName: entry.pl_hostname,
      orbitPer: entry.pl_orbper,
      orbitMax: entry.pl_orbsmax,
      distance: entry.gaia_dist,
      planetTemp: entry.pl_eqt,
      planetMass: entry.pl_masse,
      discYear: entry.pl_disc,
      starLum: entry.st_lum,
      starTemp: entry.st_teff,
      ra: entry.ra,
      dec: entry.dec,
    }
    return toEnter;
  })

  return new Promise((resolve, reject) => {
    Planet.insertMany(planetList, (err, data) => {
      if (err) { reject(err) }
      else { resolve(data) }
    })
  })
}

const getPlanets = () => new Promise((resolve, reject) => {
  Planet.find({}, (err, data) => {
    if (err) { reject(err) }
    else { resolve(data) }
  })
})

module.exports = {
  insertPlanets,
  removeOld,
  getPlanets
}