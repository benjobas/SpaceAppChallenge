import React, { useState, useEffect } from 'react';

const Planets = (props) => {

  const calculateRA = (planet) => {
    const width = window.innerWidth;
    const adjusted = width / 360;
    return planet.ra * adjusted;
  }

  const getPlanetColor = () => {
    const colors = ['rgb(137, 200, 244)','rgb(136, 44, 44)','rgb(180, 111, 21)', 'rgb(26, 174, 194)'];
    return colors[Math.floor(Math.random() * colors.length)];
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

  return (
    <circle className="planet" id={`${props.planet.name} ${props.planet.starName}`} cx={calculateRA(props.planet)} cy={calculateDEC(props.planet)} r="5.875" style={{fill: `${getPlanetColor()}`}}/>
  )
}

export default Planets;