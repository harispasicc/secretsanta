import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

const HowItWorks = () => {
  return (
    <Box className="howItWorks">
      <Paper elevation={3} className="paper">
        <Typography variant="h6" sx={{marginBottom:'8px'}}>How it works</Typography>
        <Typography variant="body2" sx={{ textAlign: "justify" }}>
          Here you can enable that your child(ren) make a list of gifts they
          want to recieve from Santa. View a list provide you to see the child's
          gift list when created and get idea what they want to get from Santa.
          You can manage with child's information about name and age. Make a
          list button redirects you to Child view.
        </Typography>
      </Paper>
    </Box>
  );
};

export default HowItWorks;
