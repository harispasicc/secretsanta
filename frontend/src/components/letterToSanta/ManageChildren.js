import React, { useState, useContext, useEffect } from "react";
import { Button, Box, Typography, Grid, ButtonGroup } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SantaModal from "./SantaModal";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../contexts/StateContext";
import { getChildren, getChild, removeChild } from "../../api/api-children";
import SuccessDialog from "./SuccessDialog";

function ManageChildren() {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [children, setChildren] = useState([]);
  const [child, setChild] = useState({});
  const [message, setMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const { user, setChildView, setChildMode } = useContext(StateContext);
  let navigate = useNavigate();

  useEffect(() => {
    getChildren(user._id).then(res => setChildren(res));
  }, [child, open, message, edit, user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (message) {
        setOpenDialog(false);
      }
    }, 3000)
    return () => {
      clearTimeout(timer);
    }
  }, [message])

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleEdit = (id) => {
    setEdit(true);
    getChild(id).then(res => setChild(res));
  }

  const handleEditClose = () => setEdit(false);

  const remove = (id) => {
    setMessage('');
    removeChild(id).then(res => {
      setMessage(res.message);
      if (res.message) {
        setOpenDialog(true)
      }
    })
  }

  return (
    <Box className="paper-right">
      <Typography variant="h4" sx={{ fontFamily: 'Satisfy', marginBottom: '30px' }}>Manage children</Typography>
      {
        children?.map(child =>
          <Grid container key={child._id} sx={{ marginBottom: '10px' }}>
            <Grid item sm={3} md={2}>
              <Typography variant="h6" className="manage-person" sx={{ fontFamily: 'Satisfy' }}>
                {child.name}
              </Typography>
            </Grid>
            <Grid item sm={4}>
              {
                (child.gifts).length ?
                  <Button variant="contained" color="success"
                    onClick={() => {
                      navigate("/parental-view-list");
                      setChildView(child);
                    }}>
                    View a List
                  </Button>
                  :
                  <Button variant="contained" style={{ backgroundColor: "gray" }}
                    onClick={() => {
                      setChildView(child);
                      setChildMode(true);
                    }}>
                    Make a List
                  </Button>
              }
            </Grid>
            <Grid item sm={3} >
              <ButtonGroup variant="default">
                <Button onClick={() => handleEdit(child._id)} style={{ color: "gray", paddingRight: '0' }}>
                  <EditIcon />
                </Button>
                <Button style={{ color: "gray" }} onClick={() => remove(child._id)}>
                  <DeleteIcon />
                </Button>
              </ButtonGroup>
              <SuccessDialog open={openDialog} message={message} />
            </Grid>
          </Grid>
        )
      }
      <div className="add-child">
        <Button size='large' style={{ color: "black" }} onClick={handleOpen}> Add a Child &nbsp;
          <AddIcon />
        </Button>
      </div>
      <SantaModal
        edit={edit}
        open={open}
        child={child}
        handleClose={handleClose}
        handleEditClose={handleEditClose}
      />
    </Box>
  );
}

export default ManageChildren;
