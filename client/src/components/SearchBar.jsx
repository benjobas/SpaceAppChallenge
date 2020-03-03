import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = (props) => {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const queryDB = () => {
    axios.get('/planets')
      .then((response) => {
        filterPlanetsBySearch(response.data);
      })
  }

  const filterPlanetsBySearch = (planets) => {
    const results = planets.filter(planet => {
      return planet.name.toLowerCase().includes(input);
    })
    setSearchResults(results);
  }



  return (
    <div id="search_bar">
      <input type="text" className="search-box" placeholder="Search Planets" id="input_text" onChange={e => setInput(e.target.value)}/>
      <input type="submit" value="" className="search-btn" onClick={() => queryDB()}/>
      <div id={searchResults.length ? "results_wrapper" : ""}>
        {searchResults.map((planet, i) => {
          if (i < 3) {
            return (
              <div className="search_result" key={i} onClick={() => {
                props.set(planet);
                setSearchResults([]);
              }}>
                {planet.name}
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default SearchBar;