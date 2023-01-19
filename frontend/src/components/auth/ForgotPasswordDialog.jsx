import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { requestForgotPassword } from "../../api/api-user";

const ForgotPasswordDialog = ({ openDialog, setOpenDialog }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showEmailSent, setShowEmailSent] = useState(false);

  const handleCloseDialog = (event, reason) => {
    // eslint-disable-next-line
    if (reason && reason == "backdropClick") return;
    setEmail("");
    setError("");
    setOpenDialog(false);
    setShowEmailSent(false);
  };
  const handleChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setError(validate(newEmail));
  };

  const validate = (email) => {
    let error = "";
    if (!email) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      error = "Invalid email address";
    }
    return error;
  };

  const handleRequestForgotPassword = () => {
    requestForgotPassword(email)
      .then((response) => {
        if (response?.uuid) {
          setShowEmailSent(true);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ textAlign: "center" }}>
          What's my password?
          <IconButton
            style={{ position: "absolute", top: "0", right: "0" }}
            onClick={handleCloseDialog}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {!showEmailSent ? (
            <>
              <DialogContentText>
                If you have forgotten your password, you can reset it here.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                value={email}
                error={Boolean(error)}
                helperText={error}
                onChange={handleChange}
              />
              <Grid container display="flex" justifyContent="center">
                <Button
                  disabled={!email || Boolean(error)}
                  fullWidth
                  variant="contained"
                  color="secondary"
                  sx={{
                    marginTop: 2,
                    color: "white",
                  }}
                  onClick={handleRequestForgotPassword}
                >
                  Send my password
                </Button>
              </Grid>
            </>
          ) : (
            <>
              <DialogContentText>
                If there is an account associated with {email}, <br />
                then email has been sent to reset password.
              </DialogContentText>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            {showEmailSent ? "Close" : "Cancel"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ForgotPasswordDialog;
