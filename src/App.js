import React, { useEffect } from "react";
import axios from "axios";
import Map from "./components/Map";
import Card from '@mui/material/Card'




const indicators = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]

function App() {

  useEffect(
    () => {
      axios.get(`http://api.worldbank.org/v2/country/br/indicator/1.1_ACCESS.ELECTRICITY.TOT?format=json`).then(response => console.log(response))
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
        <hr />
      </header>
      <main className="p-10">
        <Map className="p-10" />
        <div className="flex justify-between">
          {indicators.map((indicator) => {
            return <Card 
            className="p-10" 
            children={
              indicator.id
            } />
          })}
        </div>
      </main>
    </>
  );
}



export default App;
