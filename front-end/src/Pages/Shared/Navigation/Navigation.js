import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, NavLink } from "react-router-dom";
import useAuth from "./../../../hooks/useAuth";

const Navigation = () => {
  const { user, logout } = useAuth();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1, textAlign: "left" }}>
            <Typography variant="h6" component="div">
              Doctors Portal
            </Typography>
          </Box>

          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/appointment"
          >
            <Button color="inherit">Appointment</Button>
          </Link>

          {user?.email ? (
            <Box>
              <NavLink
                style={{ textDecoration: "none", color: "white" }}
                to="/dashboard"
              >
                <Button color="inherit">Dashboard</Button>
              </NavLink>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/about"
              >
                <Button color="inherit">About</Button>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/blog"
              >
                <Button color="inherit">Blog</Button>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/contact"
              >
                <Button color="inherit">Contact</Button>
              </Link>
              <Button onClick={logout} color="inherit">
                Logout
              </Button>
            </Box>
          ) : (
            <NavLink
              style={{ textDecoration: "none", color: "white" }}
              to="/login"
            >
              <Button color="inherit">Login</Button>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navigation;
