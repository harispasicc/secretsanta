import React, { useState, useContext, useEffect } from "react";
import { Button, TextField, Box, Modal, Typography, IconButton } from "@mui/material";
import { useFormik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import { addPerson, editPerson } from "../../api/api-person";
import { StateContext } from "../../contexts/StateContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 8,
  paddingTop: 3
};

function PersonModal({ open, handleClose, person, edit, handleEditClose }) {
  const [error, setError] = useState('');
  const [initialValues, setInitialValues] = useState({ name: '', age: '' });
  const { user } = useContext(StateContext)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues
  })

  useEffect(() => {
    if (edit) {
      setInitialValues({ fullName: person.fullName })
    } else {
      setInitialValues({ fullName: '' })
    }
    //eslint-disable-next-line
  }, [person, open])

  const cancel = () => {
    open ? handleClose() : handleEditClose();
    formik.handleReset();
    setError('');
  }

  const onChange = (e) => {
    formik.handleChange(e);
    setError('');
  }

  const add = () => {
    const person = {
      fullName: formik.values.fullName,
      userId: user._id
    }
    addPerson(person).then(res => {
      if (res.error) setError(res.error);
      else {
        handleClose();
        formik.handleReset();
      }
    })
  }

  const update = () => {
    const personForEdit = {
      fullName: formik.values.fullName,
      userId: user._id,
      personId: person._id
    }
    editPerson(personForEdit).then(res => {
      if (res.error) setError(res.error);
      else {
        handleEditClose();
        formik.handleReset();
      }
    })
  }

  return (
    <div>
      <Modal open={open ? open : edit} onClose={cancel} aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" >
        <Box sx={style}>
          <Box sx={{ textAlign: 'right', marginRight: '-40px' }}>
            <IconButton color="inherit" onClick={cancel} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "30px" }}>
            <Typography id="modal-modal-title" variant="h4" component="h2" sx={{fontFamily:'Satisfy', color:''}}>
              {open ? 'Add person' : 'Edit person'}
            </Typography>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Full name"
              name="fullName"
              value={formik.values.fullName}
              onChange={onChange}
              sx={{ width: "230px", borderRadius: "6px" }}
            />
          </form>
          {error && <Box className='error'>
            <Typography color='error' sx={{ fontSize: '12px', paddingTop: '10px' }}>{error}</Typography>
          </Box>}
          <div className="modal-buttons">
            <Button
              className="submit-button"
              variant="contained"
              color="success"
              type="submit"
              onClick={open ? add : update}
            >
              Submit
            </Button>
            <Button onClick={cancel} variant="contained" style={{ backgroundColor: "gray" }}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default PersonModal;
