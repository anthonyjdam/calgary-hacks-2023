import React, { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import axios from "axios";

import { ComposableMap, Geographies, Geography } from "react-simple-maps"

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"




function App() {
  useEffect(
    () => {
      axios.get('http://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?format=json').then(response => console.log(response.data[0].lastupdated))
    }
    , [])

  return (
    <>
      {/* <div className="flex flex-row bg-black text-white min-h-screen">

        <Sidebar />

        <div className="p-10 flex-1 flex flex-row justify-between border-solid border-white border-2 ">
          <h1 className="font-semibold text-3xl"></h1>
          <ul className="flex flex-row gap-10">
            <li><a href="https://www.google.com/">link1</a></li>
            <li><a href="https://www.google.com/">link2</a></li>
            <li><a href="https://www.google.com/">link3</a></li>
          </ul>
        </div>

      </div> */}
      <header>
        <h1 className="flex justify-between text-4xl font-medium p-5">
          TITLE
          <a>Donate now</a>
        </h1>
      </header>
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
      </ComposableMap>
    </>
  );
}



export default App;
