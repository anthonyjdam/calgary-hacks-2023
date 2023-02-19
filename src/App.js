import React, { useEffect, useState } from "react";
import axios from "axios";
import Map from "./components/Map";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import Card from '@mui/material/Card'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Charity from "./components/Charity";



const indicators = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]


const columns = [
  { field: 'country', headerName: 'Country', width: 200 },
  { field: 'id', headerName: 'Country ID', width: 90 },
  {
    field: 'pop',
    headerName: 'Value',
    type: 'number',
    width: 95,
  },
  {
    field: 'date',
    headerName: 'Year',
    type: 'number',
    width: 95,
  },
];




function DataTable(props) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={props.rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}

function App() {

  const [rows, setRows] = useState([]);

  function handleFetch(indicator_code) {
    axios.get(`http://api.worldbank.org/v2/country/all/indicator/${indicator_code}?format=json&date=2018&per_page=1000`)
      .then(response => {
        const countries = response.data[1]
        console.log(countries);
        const validCountries = countries.filter(country => country.value !== null)
        console.log(validCountries);
        const formattedCountries = validCountries.map(entry => {
          const formattedCountry = { country: entry.country.value, id: entry.countryiso3code, pop: entry.value, date: entry.date }
          return formattedCountry
        })
        setRows(formattedCountries)
        console.log("fetch");
      }
      )
  }

  return (
    <>
      <header>
        <nav>
          <h1 className="flex justify-between text-4xl font-medium p-5">
            GiveWithInsight
          </h1>
          <hr />
        </nav>
      </header >
      <main className="p-10">
        <Map className="p-10" countries={rows} />
        <div className="flex justify-between">
          {indicators.map((indicator) => {
            return <Card
              className="p-10"
              children={
                indicator.id
              } />
          })}
        </div>
        <DataTable rows={rows} columns={columns} />
        <button onClick={() => handleFetch("SH.H2O.SMDW.ZS")}>Fetch water data</button>
        <button onClick={() => handleFetch("SI.POV.NAHC")}>Fetch poverty data</button>
        <button onClick={() => handleFetch("SE.PRM.UNER")}>Fetch education data</button>
      </main>
    </>
  );
}



export default App;
