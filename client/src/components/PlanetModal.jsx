import React, { useEffect } from 'react';
import anime from 'animejs/lib/anime.es.js';

const PlanetModal = (props) => {

  const animate = (planet) => {
    const path = anime.path('#path');
    anime({
      targets: '#planet_icon',
      translateX: path('x'),
      translateY: path('y'),
      rotate: path('angle'),
      easing: 'linear',
      duration: planet.orbitPer * 300,
      loop: true
    });
  }

  useEffect(() => {
    animate(props.planet);
  }, [])

  return (
    <div id="modal_wrapper">
        <div id="planet_modal">
          <div id="planet_name">
            <span></span>
            {props.planet.name.toUpperCase()}
            <button id="close_modal" onClick={() => props.select(null)}>
              X
            </button>
          </div>
          <div id="orbital_radius">
            <span id="radius">Orbital Radius: <span className="planet_info">{props.planet.orbitMax + ' AU'}</span></span>
            <br/>
            <span id="period">Orbital Period: <span className="planet_info">{props.planet.orbitPer + ' Days'}</span></span>
          </div>
          <div id="planet_mass">
            <span id="mass">Planet Mass:<br/><span className="planet_info">{props.planet.planetMass ? props.planet.planetMass + " Earths" : "N/A"}</span></span>
            <br />
            <span id="temperature">Planet Temp (K):<br/><span className="planet_info">{props.planet.planetTemp || "N/A"}</span></span>
          </div>
          <div id="orbital_map">
            <svg id="orbit" viewBox="0 0 400 300" height="300" width="400">
              <path id="path" d="M 100 50 A 50 50 0 1 1 300 250 A 50 50 0 1 1 100 50z" fill="none" stroke="black" strokeWidth="1"></path>
            </svg>
            <div id="planet_icon" style={{background: `${props.planet.color}`}}>
            </div>
            <div className="star_name">
              {props.planet.starName}
            </div>
            <div className="shadow"></div>
            </div>
          <div id="distance">
            Distance From Earth:&nbsp;<span className="planet_info">{props.planet.distance ? props.planet.distance + " parsecs" : " N/A"}</span>
          </div>
          <div id="discovery_year">
            Discovery Year:&nbsp;<span className="planet_info">{props.planet.discYear}</span>
          </div>
        </div>
    </div>
  )
}

export default PlanetModal;