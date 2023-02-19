import React from 'react'
import { ComposableMap, Geographies, Geography } from "react-simple-maps"

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"



function Map() {
    return (
        <ComposableMap>
            <Geographies geography={geoUrl}>
                {({ geographies }) =>
                    geographies.map((geo) => (
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="#C9DADC"
                            stroke="#000000"
                            onClick={() => console.log(geographies)}
                            style={{
                                default: { outline: "none", fill: "#CFD8DC" },
                                hover: { outline: "#266DD3", fill: "#266DD3" },
                                pressed: { outline: "none" },
                              }}
                        />
                    ))
                }
            </Geographies>
        </ComposableMap>
    )
}

export default Map