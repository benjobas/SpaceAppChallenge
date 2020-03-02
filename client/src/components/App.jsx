import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Planets from './Planets.jsx';

const App = () => {
  const [current, setCurrent] = useState(null);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    axios.get('/planets')
      .then((response) => {
        setPlanets(response.data);
      })
  }, []);

  const populatePlanets = () => {
    axios.get('https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_hostname,pl_name,pl_orbper,pl_orbsmax,pl_eqt,pl_masse,pl_disc,st_lum,st_teff,gaia_dist,ra,dec&format=json')
      .then((response) => {
        let habitablePlanets = calculateHabitableZone(response.data);
        axios({
          method: 'post',
          url: '/populate',
          data: habitablePlanets,
        })
      })
  }

  const calculateHabitableZone = (planets) => {
    const colors = ['rgb(137, 200, 244)','rgb(136, 44, 44)','rgb(180, 111, 21)', 'rgb(26, 174, 194)'];
    const sunTemp = 5700;
    const aI = 0.000027619;
    const bI = 0.0000000038095;
    const a0 = 0.00013786;
    const b0 = 0.0000000014286;
    const rIs = 0.72;
    const r0s = 1.77;
    return planets.filter(planet => {
      if (planet.st_teff !== null && planet.st_lum !== null && planet.pl_orbsmax !== null) {
        const luminosity = 10 ** (planet.st_lum)
        const innerBound = (rIs - aI * (planet.st_teff - sunTemp) - (bI * (planet.st_teff - sunTemp) ** 2)) * Math.sqrt(luminosity);
        const outerBound = (r0s - a0 * (planet.st_teff - sunTemp) - (b0 * (planet.st_teff - sunTemp) ** 2)) * Math.sqrt(luminosity);
        planet.color = colors[Math.floor(Math.random() * colors.length)];
        return planet.pl_orbsmax >= innerBound && planet.pl_orbsmax <= outerBound;
      }
    })
  }

  return (
    <div>
      <h1 id="title">
        Welcome To Exoplanetary
      </h1>
      <svg id="planet_container" height={`${window.innerHeight}`} width={`${window.innerWidth}`}>
        {planets.map((planet, i) => (
          <Planets planet={planet} key={i}/>
        ))}
      </svg>
      <button onClick={populatePlanets}>
        Populate Planets
      </button>
    </div>
  )
}

export default App;

