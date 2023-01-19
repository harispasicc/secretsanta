import React, { useContext, useEffect } from "react";
import { StateContext } from "./contexts/StateContext";
import { isAuthenticated } from "./api/api-auth";
import MainRouter from "./MainRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#DF0000",
    },
    secondary: {
      main: "#42a5f5",
    },
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        container: {
          backgroundColor: "transparent",
          color: "white",
        },
      },
    },
  },

  inputLabel: {
    color: "white",
  },
});

const App = () => {
  const { user, setUser } = useContext(StateContext);

  const checkIsAuthenticated = async () => {
    let response;
    response = await isAuthenticated();
    if (response.isAuthenticated === true) {
      setUser(response.user);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    if (user === null) {
      checkIsAuthenticated();
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <MainRouter />
    </ThemeProvider>
  );
};

export default App;
