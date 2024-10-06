import ChatComponent from "./Chat.jsx";
import React, { useState } from "react";
import DrawingCanvas from "./DrawingCanvas.jsx";

const PlanetModal = (props) => {
  const [isDrawingOpen, setIsDrawingOpen] = useState(false);

  const openDrawingCanvas = () => {
    setIsDrawingOpen(true);
  };

  const closeDrawingCanvas = () => {
    setIsDrawingOpen(false);
  };

  // Datos comunes que se muestran para planetas
  const PlanetInfo = ({ label, value, unit }) => (
    <div>
      <span>{label}:&nbsp;</span>
      <span className="planet_info">
        {value ? value + " " + (unit || "") : "N/A"}
      </span>
    </div>
  );

  return (
    <div id="modal_wrapper">
      <div id="planet_modal">
        <div id="planet_name">
          <button id="close_modal" onClick={() => props.select(null)}>
            Volver
          </button>
          <button id="Crear_constelacion" onClick={openDrawingCanvas}>
            Crear constelación
          </button>
        </div>

        <h2>{props.planet.name.toUpperCase()}</h2>

        {/* Imagen y descripción del planeta */}
        <div>
          <img
            src="../../k2-22.gif"
            alt="Descripción del GIF"
            width="25%"
            height="auto"
            style={{ display: "block", margin: "0 auto" }}
          />
        </div>

        <div>
          <span id="description" className="planet_description">
            {props.planet.description || "Descripción no disponible"}
          </span>
        </div>

        {/* Información detallada del planeta */}
        <PlanetInfo
          label="Ascensión Recta [grados]"
          value={props.planet.orbitMax}
          unit="AU"
        />
        <PlanetInfo
          label="Declinación [grados]"
          value={props.planet.orbitPer}
          unit="Days"
        />
        <PlanetInfo
          label="Radio terrestre"
          value={props.planet.planetMass}
          unit="Earths"
        />
        <PlanetInfo label="Radio Joviano" value={props.planet.planetTemp} />
        <PlanetInfo
          label="Distancia desde la Tierra"
          value={props.planet.distance}
          unit="Años Luz"
        />
        <PlanetInfo label="Periodo" value={props.planet.discYear} unit="días" />
        <ChatComponent />

        {/* Canvas para dibujar constelaciones */}
        <DrawingCanvas isOpen={isDrawingOpen} onClose={closeDrawingCanvas} />

        {/* Video */}
        <div>
          <video width="25%" height="auto" loop autoPlay muted>
            <source src="../../k2-22.mp4" type="video/mp4" />
            Tu navegador no soporta el elemento de video
          </video>
        </div>
      </div>
    </div>
  );
};

export default PlanetModal;
