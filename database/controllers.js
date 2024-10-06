const Planet = require("./index.js");
const Promise = require("bluebird");
require("dotenv").config();
console.log(process.env.OPENAI_API_KEY);
const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const removeOld = () =>
  new Promise((resolve, reject) => {
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
        description: "11 Com b is a gas giant exoplanet that orbits a K-type star. Its mass is 19.4 Jupiters, it takes 326.03 days to complete one orbit of its star, and is 1.29 AU from its star. Its discovery was announced in 2008.",
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
        description:
          "11 UMi b is a gas giant exoplanet that orbits a K-type star. Its mass is 10.3 Jupiters, it takes 516.22 days to complete one orbit of its star, and is 1.54 AU from its star. Its discovery was announced in 2009.",
      },
      {
        name: "K2-22 b",
        starName: "K2-22",
        orbitPer: 2.61,
        orbitMax: 169.48,
        distance: 243,
        planetTemp: 0.205,
        planetMass: 2300,
        discYear: "2016",
        starLum: 0.61, 
        starTemp: 5000,
        ra: 185.1234567, 
        dec: -12.3456789, 
        color: "blue", 
        description: "K2-22 b is a super-Earth exoplanet that orbits the star K2-22. It has a mass of about 2.6 Earth masses and orbits within the habitable zone of its star. Its discovery was announced in 2016.",
      },
    ];

    return await Planet.insertMany(planetList);
  } catch (error) {
    throw new Error(`Error al insertar planetas: ${error.message}`);
  }
};

const getPlanets = () =>
  new Promise((resolve, reject) => {
    Planet.find({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
const openAI = async (question) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: question.message }],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0];
};
module.exports = {
  insertPlanets,
  removeOld,
  getPlanets,
  openAI,
};
