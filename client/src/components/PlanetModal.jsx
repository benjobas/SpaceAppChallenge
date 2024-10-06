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
          {!isDrawingOpen && (<>
          <button id="Crear_constelacion" onClick={openDrawingCanvas}>
            Crear constelación
          </button>
          </>)}
        </div>

        <h2>{props.planet.name.toUpperCase()}</h2>

        {!isDrawingOpen && (
          <>
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
          </>
        )}

        <DrawingCanvas isOpen={isDrawingOpen} onClose={closeDrawingCanvas} />

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
