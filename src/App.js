import React, { useEffect } from "react";
import axios from "axios";
import Map from "./components/Map";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


const indicators = [{ id: 'Potable Water', photo: "https://images.unsplash.com/photo-1495774539583-885e02cca8c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"}, 
                    { id: 'Poverty', photo: 'https://bsmedia.business-standard.com/_media/bs/img/article/2022-04/07/full/1649270628-8781.jpg'}, 
                    { id: 'Out of School', photo: 'https://images.unsplash.com/photo-1533285962792-0c3c5e9cb0d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'}]


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



function ActionAreaCard(prop1) {
  return (
    
    <Card sx={{ maxWidth: 600 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          // image="/static/images/cards/contemplative-reptile.jpg"
          image = {prop1.photo}
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
        </CardContent>
      </CardActionArea>
    </Card>
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
        <h1 className="flex justify-between text-4xl font-large p-5">
          GiveWithInsite
          <a>Donate now</a>
        </h1>
        <hr />
      </header >
      <main className="p-10">
        <Map className="p-10" />
        <DataTable />
        <div className="flex justify-between">

          {indicators.map((indicator) => {
            return <ActionAreaCard indicator_id={indicator.id} photo={indicator.photo} />
          })}

        </div>

      </main>

    </>
  );
}



export default App;
