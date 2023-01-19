import { Box, Button, Card, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import tree from '../../assets/images/christmas_tree.png';

function DayCard({ day, num, handleClick }) {
  const { id, message, disabled } = day;
  const [isFlipped, setIsFlipped] = useState(!disabled);
  const [open, setOpen] = useState(false);

  const oneClick = (id, num) => {
    let currentDay = new Date().getDate();
    let day = num + 1;
    if (day === currentDay || currentDay - day === 1) {
      setIsFlipped(true);
      handleClick(id);
    } else {
      return;
    }
  }

  return (
    <>
      <Paper className={`cardCalendar ${isFlipped ? 'flip' : ''}`}
        style={{ height: '80px' }}
        onClick={() => oneClick(id, num)}>
        <Card className={`cardCalendar ${!isFlipped ? 'front' : 'gone'}`}>
          <Typography sx={{ position: "absolute", top: 3, left: 3, fontSize: 20 }}>{num + 1}</Typography>
          <CardMedia
            component="img"
            sx={{ width: 30, ml: 3, mb: 0.5 }}
            image={tree}
            alt="tree" />
        </Card>
        <Box className='back' onClick={() => setOpen(true)}>{message}</Box>
      </Paper>
      <Dialog open={open}>
        <DialogContent>
          <DialogContentText color="error">
            The card is already opened!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary"
            autoFocus="autoFocus" onClick={() => setOpen(false)}>cansel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default DayCard;
