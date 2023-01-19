import React, { useContext, useState, useEffect } from "react";
import { Formik } from "formik";
import { signin } from "../../api/api-auth.js";
import { StateContext } from "../../contexts/StateContext";
import { Button, Paper, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useNavigate, useLocation } from "react-router-dom";
import SantaClause from "../../assets/images/santa-claus.png";
import Background from "../../assets/images/background.jpg";
import ForgotPasswordDialog from "./ForgotPasswordDialog.jsx";

const Login = () => {
  const { user, setUser } = useContext(StateContext);
  const [apiError, setApiError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      navigate(from, { replace: true });
    }
  });

  return (
    <div style={{ padding: 8 }}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          const response = await signin(values);
          if (response.user) {
            setUser(response.user);
            setApiError("");
            navigate(from, { replace: true });
          } else {
            setApiError(response.error);
            console.log(response);
          }
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          return errors;
        }}
      >
        {({
          values,
          handleSubmit,
          isValid,
          dirty,
          isSubmitting,
          handleBlur,
          handleChange,
          touched,
          errors,
        }) => (
          <Paper
            sx={{
              backgroundImage: `url(${Background})`,
              backgroundSize: "cover",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid
                item
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <Grid
                  item
                  container
                  xs={12}
                  display="flex"
                  justifyContent="center"
                >
                  <img
                    alt="Santa Clause"
                    src={SantaClause}
                    style={{
                      width: "15%",
                    }}
                  />
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  display="flex"
                  justifyContent="center"
                >
                  <TextField
                    label="Email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{
                      margin: 2,
                      backgroundColor: "beige",
                      width: "250px",
                    }}
                  />
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  display="flex"
                  justifyContent="center"
                >
                  <TextField
                    label="Password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    sx={{
                      margin: 2,
                      backgroundColor: "beige",
                      width: "250px",
                    }}
                  />
                </Grid>
                {apiError !== "" && (
                  <Grid
                    item
                    container
                    xs={12}
                    display="flex"
                    justifyContent="center"
                  >
                    <Typography
                      variant="subtitle1"
                      color="primary"
                      sx={{
                        fontWeight: "bold",
                      }}
                      style={{
                        background: "beige",
                        strokeWidth: "1px",
                        paddingLeft: "5px",
                        paddingRight: "5px",
                        marginBottom: "5px",
                        borderRadius: "10px",
                      }}
                    >
                      {apiError}
                    </Typography>
                  </Grid>
                )}
                <Grid
                  item
                  container
                  xs={12}
                  display="flex"
                  justifyContent="center"
                >
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    onClick={() => setOpenDialog(true)}
                  >
                    Forgot password?
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                  xs={{ xs: 12, sm: 3 }}
                  display="flex"
                  justifyContent="center"
                >
                  <Button
                    fullWidth
                    disabled={!(isValid && dirty) || isSubmitting}
                    type="submit"
                    variant="contained"
                    sx={{
                      margin: 2,
                      width: "250px",
                    }}
                  >
                    Login
                  </Button>
                </Grid>
                <Grid
                  item
                  container
                  xs={{ xs: 12, sm: 3 }}
                  display="flex"
                  justifyContent="center"
                >
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    sx={{
                      margin: 2,
                      width: "250px",
                    }}
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  display="flex"
                  justifyContent="center"
                >
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    style={{
                      background: "beige",
                      strokeWidth: "1px",
                      paddingLeft: "5px",
                      paddingRight: "5px",
                      marginBottom: "5px",
                      borderRadius: "10px",
                    }}
                    onClick={() => navigate("/signup")}
                  >
                    Do not have an account? Sign up!
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </Paper>
        )}
      </Formik>
      <ForgotPasswordDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </div>
  );
};

export default Login;
