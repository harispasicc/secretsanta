import React from 'react';
import { BsCheck2Circle } from 'react-icons/bs';
import { Dialog, DialogContent } from '@mui/material';

const SuccessDialog = ({ open, message }) => {
  return (
    <Dialog open={open} maxWidth={false}>
      <DialogContent sx={{ color: 'green', fontSize: '20px' }}>
        <BsCheck2Circle size={30} /> {message}
      </DialogContent>
    </Dialog>
  )
}

export default SuccessDialog;
