import React, { useContext, useState, useEffect } from "react";
import { StateContext } from "../contexts/StateContext";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Container,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChristmassTree from "../assets/images/christmas_tree.png";
import {useNavigate} from "react-router-dom";

const mainPages = [
  { name: "Home", url: "/" },
  { name: "About Us", url: "/about-us" },
  { name: "Advent Calendar", url: "/calendar" },
  { name: "Letter to Santa", url: "/letter" },
  {name: 'Secret Santa', url:'/secret-santa'},
  { name: "Gift List", url: "/gift-list" },
];

const Header = () => {
  const { user, childMode } = useContext(StateContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [pages, setPages] = useState(mainPages);
  let navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setPages([...mainPages, { name: "Log out", url: "/logout" }]);
    } else {
      setPages([...mainPages, { name: "Log in", url: "/login" }]);
    }
  }, [user]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src={ChristmassTree}
              alt='Christmass tree'
              style={{ height: "40px", marginRight: "30px" }}
            />
            Santa App
          </Typography>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Santa App
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* Part for bigger devices */}
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ color: "white", display: "block" }}
              >
                <div onClick={() => !childMode ? navigate(page.url) : navigate('/letter')}>{page.name}</div>
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* Part for mobile devices */}
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <div onClick={() => !childMode ? navigate(page.url) : navigate('/letter')}>{page.name}</div>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
