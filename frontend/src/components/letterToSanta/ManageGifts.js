import React, { useState, useEffect, useContext } from 'react';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import giftBox from "../../assets/images/gift-box.jpg";
import { Button, CardMedia, Box, Typography, TextField } from "@mui/material";
import { addGift, editGift, getGift, getGifts, removeGift } from '../../api/api-gift';
import { useFormik } from 'formik';
import { StateContext } from '../../contexts/StateContext';
import SuccessDialog from './SuccessDialog';

const ManageGifts = () => {
  const { childView } = useContext(StateContext)
  const [gifts, setGifts] = useState([]);
  const [giftForEdit, setGiftForEdit] = useState({});
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [initialValues, setInitialValues] = useState({ name: '' });
  const [message, setMessage] = useState('');

  const formik = useFormik({
    enableReinitialize: true,
    initialValues
  })
 
  useEffect(() => {
    const timer = setTimeout(() => {
      if (message) setOpenDialog(false);
  }, 3000)
  return () => {
      clearTimeout(timer);
  } 
  },[message])
  
  useEffect(() => {
    if (Object.keys(giftForEdit).length) setInitialValues({name:giftForEdit.name})
    else setInitialValues({ name: '' })
  }, [giftForEdit,message])
  
  useEffect(() => {
    getGifts(childView._id).then(res => {
      if (!res.error)
        setGifts(res)
    });
  }, [childView, message]);
  
  const onChange = (e) => {
    formik.handleChange(e);
    setError('');
  }
  
  const submit = () => {
    setMessage('');
    if (!Object.keys(giftForEdit).length) {
      addGift({ childId: childView._id, name: formik.values.name })
        .then(res => {
          if (!res.error) {
            formik.handleReset();
            setMessage(res.message)
          } else {
            setError(res.error);
          }
        })
    } else {
      editGift({ childId: childView._id, giftId: giftForEdit._id, name: formik.values.name })
      .then(res => {
        if (!res.error) {
          formik.handleReset();
          setMessage(res.message);
          setGiftForEdit({})
        } else {
          setError(res.error);
        }
      })
    }
  }
  
  const handleEdit = (id) => {
    getGift({ childId: childView._id, giftId: id })
      .then(res => setGiftForEdit(res));
    setError('');
  }

  const remove = (id) => {
    removeGift({ childId: childView._id, giftId: id })
      .then(res => {
        if (!res.error) {
          setMessage(res.message);
          setOpenDialog(true);
          setGiftForEdit({});
        } else {
          setError(res.error);
      }
    })
  } 
  
  return (
    <>
       <div className="child-wish-input">
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  label="Let the Santa know your wish"
                  value={formik.values.name}
                  onChange={onChange}
                  name="name"
                  sx={{ width: "280px", borderRadius: "6px", marginLeft: "50px" }}
                />
              </form>
        <Button className="submit-button" variant="contained" color="success" type="submit"
          onClick={submit}>
                Add present
        </Button>
        </div>
            {error &&<Box className='error'>
            <Typography color='error' sx={{fontSize:'12px', p:'10px', paddingLeft:'120px'}}>{error}</Typography>
        </Box>}
      <Box className='gifts'>
      {
        gifts.map(gift =>
          <Box key={gift._id}>
            <div className="child-line">
              <Box elevation={6} className="gift-box-icon">
                <CardMedia component="img" image={giftBox} alt="Gift box" sx={{zIndex:'-1'}} />
              </Box>
                    <Typography variant="h6" sx={{fontFamily:'Satisfy'}}>{gift.name}</Typography>
                    <div className="child-icons">
                <Button onClick={() => { handleEdit(gift._id);}} size="medium" style={{ color: "gray" }}>
                  <EditIcon className="edit-icon" />
                </Button>
                <Button size="medium" style={{ color: "gray" }} onClick={()=>remove(gift._id)}>
                  <DeleteIcon className="delete-icon" />
                </Button>
                    </div>
                    <SuccessDialog open={ openDialog} message={message} />
            </div>
          </Box>
          )}
        </Box>
    </>
  )
}

export default ManageGifts;
