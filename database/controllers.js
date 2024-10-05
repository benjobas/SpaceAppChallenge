const Planet = require('./index.js');
const Promise = require('bluebird');

const removeOld = () => new Promise((resolve, reject) => {
  Planet.deleteMany({}, (err, data) => {
    if (err) { 
      reject(err); 
    } else { 
      resolve(data); 
    }
  });
});

const insertPlanets = async (entries) => {
  try {
    // const planetList = entries.map(entry => ({
    //   name: entry.pl_name,
    //   starName: entry.st_name || "Unknown Star",
    //   orbitPer: entry.pl_orbper || null,
    //   orbitMax: entry.pl_orbsmax || null,
    //   distance: entry.sy_dist || null,
    //   planetTemp: entry.pl_eqt || null,
    //   planetMass: entry.pl_bmasse || null,
    //   discYear: entry.disc_year ? entry.disc_year.toString() : null,
    //   starLum: entry.st_lum || null,
    //   starTemp: entry.st_teff || null,
    //   ra: entry.ra || null,
    //   dec: entry.dec || null,
    //   color: entry.color || null,
    // }));
    const planetList = [
      {
        name: "11 Com b",
        starName: "Star A",
        orbitPer: null,
        orbitMax: 1.21,
        distance: 93.1846,
        planetTemp: null,
        planetMass: 5434.7,
        discYear: "2007",
        starLum: null,
        starTemp: null,
        ra: 185.1787793,
        dec: 17.7932516,
        color: null,
      },
      {
        name: "11 UMi b",
        starName: "Star B",
        orbitPer: 516.21997,
        orbitMax: 1.53,
        distance: 125.321,
        planetTemp: null,
        planetMass: 4684.8142,
        discYear: "2009",
        starLum: null,
        starTemp: 4213,
        ra: 229.2745954,
        dec: 71.8239428,
        color: null,
      }
    ];
    

    return await Planet.insertMany(planetList);
  } catch (error) {
    throw new Error(`Error al insertar planetas: ${error.message}`);
  }
};

const getPlanets = () => new Promise((resolve, reject) => {
  Planet.find({}, (err, data) => {
    if (err) { 
      reject(err); 
    } else { 
      resolve(data); 
    }
  });
});

module.exports = {
  insertPlanets,
  removeOld,
  getPlanets
};
