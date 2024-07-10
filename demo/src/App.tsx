import React from 'react'

import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import Chip from '@mui/material/Chip';

import Calender from './Components/Calender';

import "./App.css"


const App :React.FC = () => {

  return (
    <>

<Grid container   direction="column" alignItems="center"
  justifyContent="center" sx={{ marginTop:6}}>

  <Grid item sm={12} md={12} lg={12} xs={12} sx={{display:'flex'}} >

    <Typography sx={{ fontFamily:"Poppins",fontWeight:3000,fontSize:30 ,marginRight:3}}>My Availabilty</Typography>

    <Chip sx={{marginTop:1}} label="12 Available hours these week" component="a" href="#basic-chip" clickable />


  </Grid>
</Grid>
    
<Grid container sx={{marginLeft:35}}>


<Grid item  sm={8} md={8} lg={8} xs={8} sx={{marginTop:3}} >
 
 <Calender/>

  </Grid>
  </Grid>
    
    
    </>
  )
}

export default App