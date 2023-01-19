import React from "react";
import {Typography} from "@mui/material";

const Footer = () => {
  return (
    <Typography
      variant="h6"
      noWrap
      component="div"
      sx={{
        position: 'fixed',
        textAlign: 'center',
        width: '100%',
        zindex: 999,
        bottom: 0,
        fontSize: '0.9em',
        backgroundColor: "#DF0000",
        padding:'4px',
        color: 'white',
      }}
    >
      Santa App &#64; Paragon
    </Typography>
    // &copy; Yet to be named team
  );
};

export default Footer;
