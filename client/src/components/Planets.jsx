import React, { useState, useEffect } from 'react';

const Planets = (props) => {
  return (
    <div id="planets">
      <svg>
        {props.planets.map((planet, i) => (
          <g className="circle" key={i} transform={`translate(${planet.ra * 4}, ${planet.dec < 0 ? planet.dec * 2 + 90 * 2 : planet.dec * 2})`}>
            <circle cx="0" cy="0" r="12.875" style={{fill: "rgb(137, 200, 244)"}}>
            </circle>
          </g>
        ))}
      </svg>
    </div>
  )
}

export default Planets;