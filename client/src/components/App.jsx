import React, { useState, useEffect } from "react";
import axios from "axios";
import Planets from "./Planets.jsx";
import PlanetModal from "./PlanetModal.jsx";
import { CSSTransition } from "react-transition-group";

const App = () => {
  const [current, setCurrent] = useState(null);
  const [planets, setPlanets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    axios.get("/planets").then((response) => {
      setPlanets(response.data);
    });
  }, []);

  const receiveData = async () => {
    try {
      const response = await axios.get("/openai");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(receiveData, 10000);
    return () => clearInterval(interval);
  }, []);

  const populatePlanets = () => {
    axios
      .get("https://back-space-lab.vercel.app/exoplanet/")
      .then((response) => {
        let habitablePlanets = calculateHabitableZone(response.data);
        axios({
          method: "post",
          url: "/populate",
          data: habitablePlanets,
        });
      });
  };

  const calculateHabitableZone = (planets) => {
    const colors = [
      "rgb(137, 200, 244)",
      "rgb(136, 44, 44)",
      "rgb(180, 111, 21)",
      "rgb(26, 174, 194)",
    ];
    const sunTemp = 5700;
    const aI = 0.000027619;
    const bI = 0.0000000038095;
    const a0 = 0.00013786;
    const b0 = 0.0000000014286;
    const rIs = 0.72;
    const r0s = 1.77;

    return planets.filter((planet) => {
      if (
        planet.st_teff !== null &&
        planet.st_lum !== null &&
        planet.pl_orbsmax !== null
      ) {
        const luminosity = 10 ** planet.st_lum;
        const innerBound =
          (rIs -
            aI * (planet.st_teff - sunTemp) -
            bI * (planet.st_teff - sunTemp) ** 2) *
          Math.sqrt(luminosity);
        const outerBound =
          (r0s -
            a0 * (planet.st_teff - sunTemp) -
            b0 * (planet.st_teff - sunTemp) ** 2) *
          Math.sqrt(luminosity);
        planet.color = colors[Math.floor(Math.random() * colors.length)];
        return (
          planet.pl_orbsmax >= innerBound && planet.pl_orbsmax <= outerBound
        );
      }
    });
  };

  return (
    <div id="main" style={{ fontFamily: "Lexend, sans-serif" }}>
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "white",
            fontWeight: "800",
          }}
        >
          Bienvenido a SpaceLab
        </h1>
        <p
          style={{
            color: "white",
            fontWeight: "700",
          }}
        >
          Elige un exoplaneta
        </p>
      </div>

      <svg id="planet_container" height="100vh" width="100vw">
        {planets.map((planet, i) => (
          <Planets planet={planet} key={i} select={setCurrent} />
        ))}
      </svg>

      <CSSTransition
        classNames="modal_t"
        in={current ? true : false}
        timeout={300}
      >
        {current ? (
          <PlanetModal planet={current} select={setCurrent} />
        ) : (
          <span></span>
        )}
      </CSSTransition>
    </div>
  );
};

export default App;
