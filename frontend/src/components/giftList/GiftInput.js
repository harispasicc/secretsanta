import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import Add from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import { addGift, editGift } from '../../api/api-personGift';

const GiftInput = ({ giftForEdit, person, clearGift, isMessage }) => {
  const [error, setError] = useState('');
  const [openInput, setOpenInput] = useState(false);
  const [initialValues, setInitialValues] = useState({ name: '' })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues
  })

  useEffect(() => {
    setOpenInput(false);
  }, [])

  useEffect(() => {
    if (Object.keys(giftForEdit).length) {
      setInitialValues({ name: giftForEdit.name });
      setOpenInput(true);
    }
    else {
      setInitialValues({ name: '' });
      setOpenInput(false)
    }
  }, [giftForEdit])

  const onChange = (e) => {
    formik.handleChange(e);
    setError('');
  }

  const handleAdd = () => {
    setOpenInput(true);
    setError('');
  }

  const submit = (e) => {
    e.preventDefault()
    isMessage('');
    if (!Object.keys(giftForEdit).length) {
      addGift({ personId: person._id, name: formik.values.name })
        .then(res => {
          if (!res.error) {
            formik.handleReset();
            isMessage(res.message);
            setOpenInput(false);
          } else {
            setError(res.error);
          }
        })
    } else {
      editGift({ personId: person._id, giftId: giftForEdit._id, name: formik.values.name })
        .then(res => {
          if (!res.error) {
            formik.handleReset();
            isMessage(res.message);
            setOpenInput(false);
            clearGift();
          } else {
            setError(res.error);
          }
        })
    }
  }
  return (
    <Box sx={{ textAlign: 'center',marginTop:'10px' }}>
      {
        openInput ?
          <Box>
            <form onSubmit={submit}>
              <TextField
                label="Enter a present"
                value={formik.values.name}
                onChange={onChange}
                name="name"
                sx={{ width: "180px", borderRadius: "6px" }}
              />
            </form>
            {error && <Box className='error'>
              <Typography color='error' sx={{ fontSize: '12px', paddingTop: '10px' }}>{error}</Typography>
            </Box>}
          </Box>
          :
          <Box>
            <Button size='large' style={{ color: "black" }} onClick={handleAdd}> Add item &nbsp;
              <Add />
            </Button>
          </Box>
      }
    </Box>
  )
}

export default GiftInput
