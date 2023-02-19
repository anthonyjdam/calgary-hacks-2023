import React from 'react'
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { scaleLinear } from "d3-scale"



const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"



function Map({ countries }) {

    console.log(countries);

    let minValue;
    let maxValue;

    if (countries.length !== 0) {
        const sorted = [...countries].sort((a, b) => (a.pop > b.pop) ? 1 : ((b.pop > a.pop) ? -1 : 0))


        minValue = sorted[0].pop
        maxValue = sorted[sorted.length - 1].pop
    }


    const minColor = "#CFD8DC"
    const maxColor = "#37474F"


    const customScale = scaleLinear().domain([minValue, maxValue]).range([minColor, maxColor])

    return (
        <ComposableMap>
            <Geographies geography={geoUrl}>
                {({ geographies }) =>
                    geographies.map((geo) => {


                        const x = countries.find(country => country.id === geo.id)

                        return (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                stroke="#000000"
                                onClick={() => console.log("geo", geo.id, "data", countries[1].id)}
                                style={{
                                    default: {
                                        outline: "none",
                                        fill: x ? customScale(x.pop) : "#FFFFFF"
                                    },
                                    hover: { outline: "#266DD3", fill: "#266DD3" },
                                    pressed: { outline: "none" },
                                }}
                            />
                        )
                    })
                }
            </Geographies>
        </ComposableMap>
    )
}

export default Map