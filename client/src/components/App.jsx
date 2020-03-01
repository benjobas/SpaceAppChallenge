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
        axios({
          method: 'post',
          url: '/populate',
          data: response.data,
        })
          .then(() => {
            console.log('populated');
          })
      })
  }

  return (
    <div>
      React working!
      <button onClick={populatePlanets}>
        Populate Planets
      </button>
    </div>
  )
}

export default App;

