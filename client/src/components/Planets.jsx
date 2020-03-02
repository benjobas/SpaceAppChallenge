import React, { useState, useEffect } from 'react';

const Planets = (props) => {
  return (
    <div id="planets">
      {props.planets.map((planet, i) => (
        <svg className="circle" key={i}>
          <circle cx={`${planet.ra}`} cy={planet.dec < 0 ? `${planet.dec + 90}` : `${planet.dec}`} r="12.875" style={{fill: "rgb(137, 200, 244)"}}>
          </circle>
        </svg>
      ))}
    </div>
  )
}

export default Planets;