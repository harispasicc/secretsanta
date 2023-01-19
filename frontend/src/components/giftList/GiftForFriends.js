import { Typography, Box, Button, Avatar, Card, CardContent, Grid, ButtonGroup, Divider } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import Add from "@mui/icons-material/Add";
import PersonModal from "./PersonModal";
import SuccessDialog from "../letterToSanta/SuccessDialog";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import giftList from "../../assets/images/giftList.png";
import { getPeople, getPerson, removePerson } from "../../api/api-person";
import { StateContext } from "../../contexts/StateContext";
import GiftListCard from "./GiftListCard";
import { Stack } from "@mui/system";

const GiftForFriends = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [person, setPerson] = useState({});
  const [message, setMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [people, setPeople] = useState([]);
  const { user } = useContext(StateContext);

  useEffect(() => {
    getPeople(user._id).then(res => setPeople(res));
    //eslint-disable-next-line
  }, [person, open, message, edit]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (message) {
        setOpenDialog(false);
      }
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleEdit = id => {
    setEdit(true);
    getPerson(id).then(res => setPerson(res));
  };

  const handleEditClose = () => setEdit(false);

  const remove = id => {
    setMessage("");
    removePerson(id).then(res => {
      setMessage(res.message);
      if (res.message) setOpenDialog(true);
    });
  };

  return (
    <Box className="parentalMode" sx={{ backgroundImage: `url(${giftList})` }}>
      <Box className="titleBox">
        <Typography
          variant="h4"
          sx={{ fontFamily: "Satisfy", color: "#DF0000" }}
        >
          Gift List
        </Typography>
      </Box>
      <Box className="add" sx={{ justifyContent: "center" }}>
        <Avatar /> &nbsp;
        <Button size="large" style={{ color: "green" }} onClick={handleOpen}>
          {" "}
          Add Person &nbsp;
          <Add />
        </Button>
      </Box>
      <PersonModal
        edit={edit}
        open={open}
        person={person}
        handleClose={handleClose}
        handleEditClose={handleEditClose}
      />
      <Box sx={{ margin: 4, height: "50vh" }}>
        <Grid container spacing={3}>
          {people.map(person => (
            <Grid item sm={4} md={3} key={person._id}>
              <Card sx={{ height: "48vh" }}>
                <CardContent>
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ fontFamily: "Satisfy", color: "green" }}
                    >
                      {person.fullName}
                    </Typography>
                    <ButtonGroup variant="default" sx={{ width: "80px" }}>
                      <Button
                        onClick={() => handleEdit(person._id)}
                        style={{ color: "green" }}
                      >
                        <Edit />
                      </Button>
                      <Button
                        style={{ color: "green" }}
                        onClick={() => remove(person._id)}
                      >
                        <Delete />
                      </Button>
                    </ButtonGroup>
                  </Stack>
                  <Divider />
                  <Box>
                    <GiftListCard person={person} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <SuccessDialog open={openDialog} message={message} />
    </Box>
  );
};

export default GiftForFriends;
