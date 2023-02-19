import React, { useEffect, useState } from "react";
import axios from "axios";
import Map from "./components/Map";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import Card from '@mui/material/Card'



const indicators = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]


const columns = [
  { field: 'country', headerName: 'Country', width: 200 },
  { field: 'id', headerName: 'Indicator', width: 90 },
  {
    field: 'pop',
    headerName: 'Population',
    type: 'number',
    width: 95,
  },
  {
    field: 'date',
    headerName: 'Date',
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

  function handleFetch() {
    axios.get(`http://api.worldbank.org/v2/country/all/indicator/SH.H2O.SMDW.ZS?format=json&date=2020&per_page=1000`)
      .then(response => {
        const countries = response.data[1]
        const validCountries = countries.filter(country => country.value !== null)
        const formattedCountries = validCountries.map(entry => {
          const formattedCountry = { country: entry.country.value, id: entry.country.id, pop: entry.value, date: entry.date }
          return formattedCountry
        })
        setRows(formattedCountries)
        console.log("fetch");
      }
      )
  }

  return (
    <>
      < header >
        <h1 className="flex justify-between text-4xl font-medium p-5">
          TITLE
          <a>Donate now</a>
        </h1>
        <hr />
      </header >
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
        <DataTable rows={rows} columns={columns} />
        <button onClick={() => handleFetch()}>Fetch</button>
      </main>

    </>
  );
}



export default App;
