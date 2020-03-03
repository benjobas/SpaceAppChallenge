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
            Planet Name: {props.planet.name}
            <button id="close_modal" onClick={() => props.select(null)}>
              X
            </button>
          </div>
          <div id="orbital_radius">
            Orbital Radius: {props.planet.orbitMax + ' AU'}
            <br/>
            Orbital Period: {props.planet.orbitPer + ' Days'}
          </div>
          <div id="planet_mass">
            Planet Mass: {props.planet.planetMass || "N/A"}
            <br />
            Planet Temperature: {props.planet.planetTemp + ' K' || "N/A"}
          </div>
          <div id="orbital_map">
            <svg id="orbit" viewBox="0 0 400 300" height="300" width="400">
              <path id="path" d="M 100 50 A 50 50 0 1 1 300 250 A 50 50 0 1 1 100 50z" fill="none" stroke="black" strokeWidth="1"></path>
            </svg>
            <div id="planet_icon" style={{background: `${props.planet.color}`}}>
            </div>
            <div className="shadow"></div>
            </div>
          <div id="distance">
            Distance From Earth: {props.planet.distance} parsecs
          </div>
          <div id="discovery_year">
            Discovery Year: {props.planet.discYear}
          </div>
        </div>
    </div>
  )
}

export default PlanetModal;