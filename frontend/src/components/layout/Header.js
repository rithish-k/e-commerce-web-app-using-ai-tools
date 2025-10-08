import React,{useState} from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";


const Header = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (value) => () => {
    setOpen(value);
  };
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Contact", path: "/contact" },
    { label: "About", path: "/about" },
  ];

  return (
    <>
    {/* Top Navbar */}
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          backdropFilter: "blur(10px)",
          backgroundColor: "hsl(51, 54%, 3%)",
          color: "hsl(100, 100%, 99%)",
          px: 2,
        }}
      >
        <Toolbar>
          {/* Left - Logo */}
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              letterSpacing: 1,
              color:"hsl(100, 100%, 99%)",
              "&:hover":{color : "hsl(17, 87%, 54%)"},
            }}
          >
            shopsimp
          </Typography>

          {/* Desktop Links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {navLinks.map((link) => (
              <Button
                key={link.label}
                component={Link}
                to={link.path}
                sx={{ textTransform: "none", fontSize: "1rem",color:"hsl(100, 100%, 99%)","&:hover":{color : "hsl(17, 87%, 54%)"} }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            color="inherit"
            edge="end"
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
    <Toolbar />

      {/* Overlay Drawer Menu (for mobile) */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: "100%",
            height: "100%",
            backgroundColor: "hsl(100, 100%, 99%)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <IconButton
          onClick={toggleDrawer(false)}
          sx={{ position: "absolute", top: 20, right: 20, color: "hsl(51, 54%, 3%)" }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>

        <List sx={{ textAlign: "center" }}>
          {navLinks.map((link) => (
            <ListItem
              button
              key={link.label}
              component={Link}
              to={link.path}
              onClick={toggleDrawer(false)}
              sx={{
                fontSize: "1.5rem",
                justifyContent: "center",
                "&:hover": { color: "#90caf9" },
              }}
            >
              <ListItemText primary={link.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>

    </>

     
  )
}
export default Header;
