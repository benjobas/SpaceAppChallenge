import React, { useState } from "react";

const Planets = (props) => {
  let [selected, changeSelected] = useState(false);

  const calculateRA = (planet) => {
    const width = window.innerWidth;
    const adjusted = width / 360;
    return planet.ra * adjusted;
  };

  const calculateDEC = (planet) => {
    const height = window.innerHeight - 30;
    const adjusted = height / 180;
    let dec = planet.dec;
    if (dec < 0) {
      dec = Math.abs(dec) + 90;
    }
    return dec * adjusted + 20;
  };

  const changeSize = (boolean) => {
    changeSelected(boolean);
  };

  const ra = calculateRA(props.planet);
  const dec = calculateDEC(props.planet);

  return (
    <g className="planet_wrapper">
      <circle
        className="planet"
        id={`${props.planet.name} ${props.planet.starName}`}
        cx={ra}
        cy={dec}
        r={selected ? "13.75" : "6.875"}
        style={{ fill: `${props.planet.color}` }}
        strokeWidth="1"
        stroke="yellow"
        fill="yellow"
        onMouseEnter={() => changeSize(true)}
        onMouseLeave={() => changeSize(false)}
        onClick={() => props.select(props.planet)}
      />

      <foreignObject x={ra - 40} y={dec - 40} width="80" height="40">
        <div className="planet-label">{props.planet.name}</div>
      </foreignObject>
    </g>
  );
};

export default Planets;
