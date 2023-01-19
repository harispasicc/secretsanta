import React, { useState, useEffect } from 'react';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import giftBox from "../../assets/images/gift-box.jpg";
import { Button, CardMedia, Box, Typography, Stack, ButtonGroup } from "@mui/material";
import { getGift, getGifts, removeGift } from '../../api/api-personGift';
import SuccessDialog from '../letterToSanta/SuccessDialog';
import GiftInput from './GiftInput';

const GiftListCard = ({ person }) => {
  const [gifts, setGifts] = useState([]);
  const [giftForEdit, setGiftForEdit] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (message) setOpenDialog(false);
    }, 3000)
    return () => {
      clearTimeout(timer);
    }
  }, [message])

  useEffect(() => {
    getGifts(person._id).then(res => {
      if (!res.error)
        setGifts(res)
    });
  }, [person, message]);

  const isMessage = (message) => {
    setMessage(message);
  }

  const clearGift = () => {
    setGiftForEdit({})
  }

  const handleEdit = (id) => {
    getGift({ personId: person._id, giftId: id })
      .then(res => setGiftForEdit(res));
  }

  const remove = (id) => {
    if (giftForEdit._id === id)
      setGiftForEdit({})
    setMessage('')
    removeGift({ personId: person._id, giftId: id })
      .then(res => {
        if (!res.error) {
          setMessage(res.message);
          setOpenDialog(true);
        }
      })
  }

  return (
    <Box>
      <Box sx={{ height: '23vh', overflowY: 'scroll' }}>
        <Box sx={{ width: '93%' }}>
          {gifts?.map(gift =>
            <div className="child-wish-list" key={gift._id}>
              <div className="child-line">
                <Box elevation={6} className="gift-box-icon">
                  <CardMedia component="img" image={giftBox} alt="Gift Box" />
                </Box>
                <Stack direction='row' sx={{ justifyContent: 'space-between', minWidth: '140px' }}>
                  <Typography sx={{ fontFamily: 'Satisfy', fontSize: '19px' }}>{gift.name}</Typography>
                  <ButtonGroup variant='default' sx={{ width: '80px' }}>
                    <Button onClick={() => handleEdit(gift._id)} style={{ color: "gray" }}>
                      <EditIcon />
                    </Button>
                    <Button style={{ color: "gray" }} onClick={() => remove(gift._id)}>
                      <DeleteIcon />
                    </Button>
                  </ButtonGroup>
                </Stack>
                <SuccessDialog open={openDialog} message={message} />
              </div>
            </div>
          )}
        </Box>
      </Box>
      <GiftInput giftForEdit={giftForEdit} person={person} clearGift={clearGift} isMessage={isMessage} />
    </Box>
  )
}

export default GiftListCard;
