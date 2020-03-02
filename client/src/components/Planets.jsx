import React, { useState } from 'react';

const Planets = (props) => {
  let [selected, changeSelected] = useState(false);

  const calculateRA = (planet) => {
    const width = window.innerWidth;
    const adjusted = width / 360;
    return planet.ra * adjusted;
  }

  const calculateDEC = (planet) => {
    const height = window.innerHeight - 30;
    const adjusted = height / 180;
    let dec = planet.dec
    if (dec < 0) {
      dec = Math.abs(dec) + 90;
    }
    return (dec * adjusted) + 20;
  }

  const changeSize = (boolean) => {
    !boolean ? changeSelected(false) : changeSelected(true);
  }

  const ra = calculateRA(props.planet);
  const dec = calculateDEC(props.planet);

  return (
    <g className="planet_wrapper">
      <circle 
        className="planet" 
        id={`${props.planet.name} ${props.planet.starName}`} 
        cx={ra} cy={dec} r={selected ? "11.75" : "5.875"} 
        style={{fill: `${props.planet.color}`}} strokeWidth="1" stroke="white" 
        onMouseEnter={() => changeSize(true)} 
        onMouseLeave={() => changeSize(false)}
        onClick={() => props.select(props.planet)}
      />
      <text color="white" x={ra + 15} y={dec} className="planet_name" id={selected ? "name_enlarge" : "none"}>{props.planet.name}</text>
    </g>
  )
}

export default Planets;
