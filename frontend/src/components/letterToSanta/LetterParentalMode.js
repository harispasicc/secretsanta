import { Typography, Box, CardMedia, Grid } from "@mui/material";
import React from "react";
import HowItWorks from "./HowItWorks";
import frame from '../../assets/images/frame.png'
import santa from "../../assets/images/santa.png";
import ManageChildren from "./ManageChildren";

const LetterParentalMode = () => {

  return (
    <Box className="parentalMode">
      <Box className="snow"></Box>
      <CardMedia component='img' image={frame} className='frame' alt='frame' />
      <Box className="titleBox">
        <Typography variant="h3" sx={{ fontFamily: 'Satisfy', color: '#DF0000' }}>Letter to Santa</Typography>
        <Typography variant="h5" sx={{ fontFamily: 'Satisfy', color: '#DF0000' }}>Parental Mode</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <Box className="img">
            <CardMedia component="img" image={santa} alt="Santa Claus" />
          </Box>
          <HowItWorks />
        </Grid>
        <Grid item sm={6}>
          <ManageChildren />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LetterParentalMode;
