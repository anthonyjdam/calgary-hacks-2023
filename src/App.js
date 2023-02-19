import React, { useEffect, useState } from "react";
import axios from "axios";
import Map from "./components/Map";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CardActions } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';

import Card from '@mui/material/Card'


import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


const indicators = [{ id: 'Potable Water', code: "SH.H2O.SMDW.ZS", photo: "https://images.unsplash.com/photo-1495774539583-885e02cca8c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" },
{ id: 'Poverty', code: "SI.POV.NAHC", photo: 'https://bsmedia.business-standard.com/_media/bs/img/article/2022-04/07/full/1649270628-8781.jpg' },
{ id: 'Out of School', code: "SE.PRM.UNER", photo: 'https://images.unsplash.com/photo-1533285962792-0c3c5e9cb0d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' }]


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



function ActionAreaCard(prop1) {
  function handleButtonClick() {
    const handle = prop1.func
    handle(prop1.code)
  }

  return (

    <Card sx={{ maxWidth: 600 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          // image="/static/images/cards/contemplative-reptile.jpg"
          image={prop1.photo}
          alt=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {prop1.indicator_id}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        <CardActions>
          <Button onClick={()=>handleButtonClick()}>GET</Button>
        </CardActions>
        </CardContent>
      </CardActionArea>
    </Card>
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

            return <ActionAreaCard func={handleFetch} inicator={indicator.code} indicator_id={indicator.id} photo={indicator.photo} />
          })}

        </div>
        <button className="mx-12"  onClick={() => handleFetch("SH.H2O.SMDW.ZS")}>Fetch water data</button>
        <button className="mx-12" onClick={() => handleFetch("SI.POV.NAHC")}>Fetch poverty data</button>
        <button className="mx-12" onClick={() => handleFetch("SE.PRM.UNER")}>Fetch education data</button>
        <DataTable rows={rows} columns={columns} />


      </main>
    </>
  );
}



export default App;
