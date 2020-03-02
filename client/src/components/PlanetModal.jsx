import React, { useState } from 'react';

const PlanetModal = (props) => {

  return (
    <div id="modal_wrapper">
      <div id="planet_modal">
        <button id="close_modal" onClick={() => props.select()}>
          X
        </button>
        <div id="planet_name">
          Planet Name: {props.planet.name}
        </div>
        <div id="orbital_radius">
          Orbital Radius: {props.planet.orbitMax}
        </div>
        <div id="orbital_period">
          Orbital Period: {props.planet.orbitPer}
        </div>
        <div id="distance">
          Distance From Earth: {props.planet.distance} parsecs
        </div>
        <div id="planet_mass">
          Planet Mass: {props.planet.planetMass}
        </div>
        <div id="planet_temp">
          Planet Temperature: {props.planet.planetTemp}
        </div>
        <div id="discovery_year">
          Discovery Year: {props.planet.discYear}
        </div>
      </div>
    </div>
  )
}

export default PlanetModal;