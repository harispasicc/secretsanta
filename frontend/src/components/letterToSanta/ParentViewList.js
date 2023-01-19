import React, { useContext, useEffect, useState } from "react";
import { CardMedia, Box, Paper, Typography, Stack } from "@mui/material";
import { StateContext } from "../../contexts/StateContext";
import { getGifts } from "../../api/api-gift";
import giftBox from "../../assets/images/gift-box.jpg";
import snowman from "../../assets/images/snowman.jpg";
import frame from '../../assets/images/frame.png'
import parentSanta from "../../assets/images/parentSanta.png";

function ParentViewList() {
  const { childView } = useContext(StateContext);
  const [potentialGifts, setPotentialGifts] = useState([]);

  useEffect(() => {
    getGifts(childView._id).then(res => {
      setPotentialGifts(res);
    })
  }, [childView])

  return (
    <>
      <CardMedia component='img' image={frame} className='frame' alt='frame' />
      <Box className="titleBox">
        <Typography variant="h3" sx={{ fontFamily: 'Satisfy', color: '#DF0000' }}>Letter to Santa</Typography>
        <Typography variant="h5" sx={{ fontFamily: 'Satisfy', color: '#DF0000' }}>Parental View List</Typography>
      </Box>
      <Box sx={{ height: '58vh' }}>
        <Box>
          <Paper elevation={3} className="paper" id='potentialPresents'>
            <Typography variant="h4" sx={{ fontFamily: 'Satisfy', color: 'green' }}>{childView.name}</Typography>
            <Typography variant="h5" sx={{ fontFamily: 'Satisfy', py: '10px' }}>
              Potential Presents:</Typography>
            <Box sx={{ height: '22vh', overflowY: 'scroll' }}>
              {(potentialGifts).map(gift =>
                <Box sx={{ width: '100%' }} key={gift._id}>
                  <Stack direction='row' sx={{ alignItems: 'center' }}>
                    <Box elevation={6} className="gift-box-icon">
                      <CardMedia component="img" image={giftBox} alt="Gift Box" />
                    </Box>
                    <Typography variant="h6" sx={{ fontFamily: 'Satisfy' }}>
                      {gift.name}
                    </Typography>
                  </Stack>
                </Box>
              )}
            </Box>
          </Paper>
        </Box>
        <Box className="parentSanta">
          <CardMedia component='img' image={parentSanta} alt='Santa' />
        </Box>
        <Box className='snowman'>
          <CardMedia component='img' image={snowman} alt='Snow man' />
        </Box>
      </Box>
    </>
  );
}

export default ParentViewList;
