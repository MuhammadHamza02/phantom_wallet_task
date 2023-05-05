import React from 'react';
import './App.css';
import SubCard from './components/UiComponent/SubCard';

import Connect2Phantom from './components/Connect2Phantom';
import { Grid } from '@mui/material';

function App() {
  return (

    <div className='App'>
      <Grid container spacing={1}>
        <Grid item md={12} sx={{ display: "flex", justifyContent: 'center', mt: 5 }} >
          <h1>Solana With Phantom wallet</h1>

        </Grid>
        <Grid item md={12} sx={{ display: "flex", justifyContent: 'center' }}>
          <Connect2Phantom />
        </Grid>

      </Grid>
    </div>
  );
}

export default App;