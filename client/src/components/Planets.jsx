import React, { useState, useEffect } from 'react';

const Planets = (props) => {

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
    if (dec * adjusted < 1) {
      dec += 20;
    }
    return dec * adjusted;
  }

  return (
    <circle cx={calculateRA(props.planet)} cy={calculateDEC(props.planet)} r="5.875" style={{fill: "rgb(137, 200, 244)"}}/>
  )
}

export default Planets;