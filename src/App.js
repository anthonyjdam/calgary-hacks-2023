import React, { useEffect } from "react";
import axios from "axios";
import Map from "./components/Map";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import Card from '@mui/material/Card'



const indicators = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]


async function getData() {
  axios.get('http://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?format=json').then(response => console.log(response.data[0].lastupdated))
}

const columns = [
  { field: 'country', headerName: 'Country', width: 90 },
  { field: 'id', headerName: 'Indicator', width: 90 },
  {
    field: 'pop',
    headerName: 'Population',
    type: 'number',
    width: 95,
  },
];

const rows = [
  { id: 1, county: 'Mexico', pop: '212112' },
  { id: 2, county: 'Romania', pop: '222222' },
];

function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}

function App() {

  useEffect(
    () => {
      axios.get(`http://api.worldbank.org/v2/country/br/indicator/1.1_ACCESS.ELECTRICITY.TOT?format=json`).then(response => console.log(response))
    }
    , [])

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
        <DataTable/>
      </main>

    </>
  );
}



export default App;
