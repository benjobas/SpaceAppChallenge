import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    console.log('mounted');
  }, []);

  const populatePlanets = () => {
    axios.get('https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_hostname,pl_name,pl_orbper,pl_orbsmax,pl_eqt,pl_masse,pl_disc,st_lum,st_teff,gaia_dist&format=json')
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
        return planet.pl_orbsmax >= innerBound && planet.pl_orbsmax <= outerBound;
      }
    })
  }

  return (
    <div>
      <h1>
        React working!
      </h1>
      <button onClick={populatePlanets}>
        Populate Planets
      </button>
    </div>
  )
}

export default App;

