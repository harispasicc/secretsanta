import React,{useState} from "react";
import { Button, CardMedia, Box, Typography } from "@mui/material";
import useSound from 'use-sound';
import gift from "../../assets/images/gift.jpg";
import letter from "../../assets/images/letter.png";
import jingleSound from '../../assets/sounds/jingleSound.mp3';
import ManageGifts from "./ManageGifts";
import PasswordModal from "./PasswordModal";

function ChildView() {
  const [showParentButton, setShowParentButton] = useState(false);
  const [play] = useSound(jingleSound);
  
  return (
    <div className='boxLetter'>
        <Box className="parentalMode">
        <Box className="snow"></Box>
        <CardMedia component='img' image={letter} className='letter' alt='letter' />
        <Box className="titleBox">
        <Typography variant="h3" sx={{ fontFamily: 'Satisfy', color: '#DF0000' }}>Letter to Santa</Typography>
        <Typography variant="h5" sx={{ fontFamily: 'Satisfy', color: '#DF0000' }}>Child Mode</Typography>
      </Box>
          <Box>
            <Box className="child-message">
              <Typography variant="h5" sx={{ fontFamily: 'Satisfy' }}>Dear Santa,</Typography>
              <Typography variant="h5" sx={{ fontFamily: 'Satisfy' }}>
                I was very good this year, and I would like to get:
              </Typography>
            </Box>
            <ManageGifts />
          </Box>
        <Box elevation={6} className="side-gift-icon">
          <CardMedia component="img" image={gift} alt="Kid with gift" />
        </Box>
        <Box className="allDone">
          <Button className="submit-button" variant="contained" color="success" size="large"
            onClick={() => {
              setShowParentButton(true);
              play();
            }}
          > All Done
          </Button>
          {
            showParentButton &&
          <PasswordModal />
          }
        </Box>
      </Box>
    </div>
  );
}

export default ChildView;
