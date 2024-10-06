import React, { useState } from "react";
import ChatComponent from "./Chat.jsx";
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
          <button
            class="button-19"
            id="close_modal"
            onClick={() => props.select(null)}
          >
            Back
          </button>
          {!isDrawingOpen && (
            <>
              <button
                class="button-29"
                id="Crear_constelacion"
                onClick={openDrawingCanvas}
              >
                Create constellation
              </button>
            </>
          )}
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

            <PlanetInfo
              label="Right ascencion [degrees]"
              value={props.planet.orbitMax}
              unit="AU"
            />
            <PlanetInfo
              label="Declination [degrees]"
              value={props.planet.orbitPer}
              unit="Days"
            />
            <PlanetInfo
              label="Terrestrial radio"
              value={props.planet.planetMass}
              unit="Earths"
            />
            <PlanetInfo label="Jovian Radio" value={props.planet.planetTemp} />
            <PlanetInfo
              label="Distance from Earth"
              value={props.planet.distance}
              unit="Light years"
            />
            <PlanetInfo
              label="Period"
              value={props.planet.discYear}
              unit="days"
            />
            <ChatComponent />
          </>
        )}

        <DrawingCanvas isOpen={isDrawingOpen} onClose={closeDrawingCanvas} />

        <div>
          <video width="25%" height="auto" loop autoPlay muted>
            <source src="../../k2-22.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default PlanetModal;
