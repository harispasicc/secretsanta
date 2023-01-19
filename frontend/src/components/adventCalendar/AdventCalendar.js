import React, { useState, useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import './adventCalendar.css';
import DayCard from './DayCard';
import createCalendar from './helpers.js';

function AdventCalendar() {
  const [days, setDays] = useState([]);

  useEffect(() => {
    const calendar = localStorage.calendar
      ? JSON.parse(localStorage.calendar)
      : createCalendar();
        setDays(calendar); 
  }, [])

  useEffect(() => {
    days.length && localStorage.setItem('calendar', JSON.stringify(days));
  }, [days])

  const handleClick = (id) => {
    const updateDays = days.map( day => (day.id === id && day.disabled === true)  ? { ...day, disabled: !day.disabled } : day)
    setDays(updateDays);
    localStorage.setItem('calendar', JSON.stringify(updateDays));
  }
  return (
    <Box textAlign={"center"} mt={2}>
      <Typography variant='h3' color='red'>
        Advent Calendar
      </Typography>
      <Stack sx={{ margin:10, marginTop:5 }}>
        <Box className='cardCalendar-grid'>
          {days?.map((day, index) => (
            <DayCard day={day} num={index} handleClick={handleClick} key={index} />
          ))}
        </Box>
      </Stack>
    </Box>
  );
}
export default AdventCalendar;
