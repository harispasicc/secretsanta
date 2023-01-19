import React, { useState } from "react";
import { Formik } from "formik";
import { resetPassword } from "../../api/api-user";
import { Button, Paper, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useNavigate, useParams } from "react-router-dom";
import { validate as uuidValidate } from "uuid";
import SantaClause from "../../assets/images/santa-claus.png";
import Background from "../../assets/images/background.jpg";

const emptyFields = {
  password: "",
  password2: "",
};

const ResetPassword = () => {
  const { uuid } = useParams();
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const validUUID = uuidValidate(uuid);

  return (
    <div style={{ padding: 30 }}>
      <Formik
        initialValues={{ ...emptyFields }}
        onSubmit={async (values) => {
          const response = await resetPassword({
            uuid: uuid,
            password: values.password,
          });
          if (response.message && response.message === "success") {
            setApiError("");
            values = { ...emptyFields };
            navigate("/login");
          } else {
            setApiError(response.error);
          }
        }}
        validate={(values) => {
          const errors = {};
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
                  <Typography variant="h5">
                    {validUUID ? "Reset your password" : "Not a valid URL"}
                  </Typography>
                </Grid>
                {validUUID ? (
                  <>
                    {" "}
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
                  </>
                ) : null}
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
                    Submit
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
              </Grid>
            </form>
          </Paper>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
