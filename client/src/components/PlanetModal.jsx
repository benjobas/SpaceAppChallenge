import React, { useEffect, useState } from 'react';

const PlanetModal = (props) => {
  const [isDrawingOpen, setIsDrawingOpen] = useState(false);

  const openDrawingCanvas = () => {
    setIsDrawingOpen(true);
  };

  const closeDrawingCanvas = () => {
    setIsDrawingOpen(false);
  };

  return (
    <div id="modal_wrapper">
        <div id="planet_modal">
          <div id="planet_name">
          <button id="close_modal" onClick={() => props.select(null)}>
              Volver
            </button>
            <button id="Crear constelación" onClick={openDrawingCanvas}
            >
              Crear constelación
            </button>
          </div>
          {props.planet.name.toUpperCase()}
          <div>
          <div>
          <img
            src="../../k2-22.gif"
            alt="Descripción del GIF"
            width="25%"
            height="auto"
            style={{ display: 'block', margin: '0 auto' }}
          />
        </div>
          </div>
          <div>
            <span id="description" className="planet_description">{props.planet.description || "11 Com b is a gas giant exoplanet that orbits a K-type star. Its mass is 19.4 Jupiters, it takes 326.03 days to complete one orbit of its star, and is 1.29 AU from its star. Its discovery was announced in 2008."}</span>
          </div>
          <div id="orbital_radius">
            <span id="radius">Ascención Recta [grados] <span className="planet_info">{props.planet.orbitMax + ' AU'}</span></span>
            <br/>
            <span id="period">Declinación [grados] <span className="planet_info">{props.planet.orbitPer + ' Days'}</span></span>
          </div>
          <div id="planet_mass">
            <span id="mass">Radio terrestre<br/><span className="planet_info">{props.planet.planetMass ? props.planet.planetMass + " Earths" : "N/A"}</span></span>
            <br />
            <span id="temperature">Radio Joviano<br/><span className="planet_info">{props.planet.planetTemp || "N/A"}</span></span>
          </div>
          <div id="distance">
            Distancia desde la tierra&nbsp;<span className="planet_info">{props.planet.distance ? props.planet.distance + " Años Luz" : " N/A"}</span>
          </div>
          <div id="discovery_year">
            Periodo [días]&nbsp;<span className="planet_info">{props.planet.discYear}</span>
          </div>
        </div>
    </div>
  )
}

export default PlanetModal;