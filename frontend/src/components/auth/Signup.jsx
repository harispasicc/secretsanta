import React, { useContext, useState, useEffect } from "react";
import { Formik } from "formik";
import { register } from "../../api/api-auth.js";
import { StateContext } from "../../contexts/StateContext";
import { Button, Paper, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useNavigate, useLocation } from "react-router-dom";
import SantaClause from "../../assets/images/santa-claus.png";
import Background from "../../assets/images/background.jpg";

const emptyFields = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const Signup = () => {
  const { user } = useContext(StateContext);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      navigate(from, { replace: true });
    }
  });

  return (
    <div style={{ padding: 30 }}>
      <Formik
        initialValues={{ ...emptyFields }}
        onSubmit={async (values) => {
          const response = await register({
            name: values.name,
            email: values.email,
            password: values.password,
          });
          if (response.message) {
            setApiError("");
            values = { ...emptyFields };
            navigate("/login");
          } else {
            setApiError(response.error);
          }
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Required";
          }
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
          if (!values.password2) {
            errors.password2 = "Required";
            // eslint-disable-next-line
          } else if (values.password != values.password2) {
            errors.password2 = "Passwords do not match.";
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
                    label="Name"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
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
                <Grid
                  item
                  container
                  xs={12}
                  display="flex"
                  justifyContent="center"
                >
                  <TextField
                    label="Repeat password"
                    type="password"
                    name="password2"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password2}
                    error={touched.password2 && Boolean(errors.password2)}
                    helperText={touched.password2 && errors.password2}
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
                    Signup
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
                    onClick={() => navigate("/login")}
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
                    onClick={() => navigate("/login")}
                  >
                    Already have an account? Login
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </Paper>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
