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
import logo from "../../assets/logo.png";
import { styled, alpha } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";



const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(3),
  width: "auto",
  display: "flex",
  alignItems: "center",
  padding: "0 8px",
}));

const SearchIconWrapper = styled("div")(() => ({
  paddingRight: "8px",
  display: "flex",
  alignItems: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    width: "15ch",
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Header = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      if (keyword.trim()) {
        navigate(`/products/${keyword}`);
      } else {
        navigate("/products");
      }
    }
  };

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
        color="primary"
        elevation={0}
        sx={{
          // backdropFilter: "blur(10px)",
          backgroundColor: "hsl(51, 54%, 3%)",
          color: "hsl(100, 100%, 99%)",
          px: 2,
        }}
      >
        <Toolbar>
          {/* Left - Logo */}

          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              flexGrow: 1,
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="shopsimp logo"
              sx={{
                height: 40,
                width: 40,
                mr: 1.5,
                borderRadius: "8px",
                objectFit: "contain",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                letterSpacing: 1,
                color: "hsl(100, 100%, 99%)",
                "&:hover": { color: "hsl(17, 87%, 54%)" },
              }}
            >
              shopsimp
            </Typography>
          </Box>
          

          {/* Desktop Links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {navLinks.map((link) => (
              <Button
                key={link.label}
                component={Link}
                to={link.path}
                sx={{ textTransform: "none", fontSize: "1rem",color:"hsl(100, 100%, 99%)","&:hover":{color : "hsla(17, 87%, 54%, 1.00)"} }}
              >
                {link.label}
              </Button>
            ))}
          </Box>
          {/* 🔍 Search Bar (Desktop only) */}
          <Box sx={{ display: { xs: "none", md: "flex" }, ml: 3 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleSearchSubmit}  // ✅ ENTER triggers search
              />
            </Search>
          </Box>

          {/* 🛒 Cart & 👤 Profile Icons */}
          <Box sx={{ display: { xs: "none", md: "flex" }, ml: 2, gap: 1 }}>
            <IconButton color="inherit" component={Link} to="/cart">
              <Badge badgeContent={2} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" component={Link} to="/profile">
              <AccountCircleIcon />
            </IconButton>
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
          <Box sx={{ mt: 4, display: "flex", gap: 3 }}>
            <IconButton color="inherit" component={Link} to="/cart">
              <Badge badgeContent={2} color="error">
                <ShoppingCartIcon sx={{ color: "hsl(51, 54%, 3%)" }} />
              </Badge>
            </IconButton>
            <IconButton color="inherit" component={Link} to="/profile">
              <AccountCircleIcon sx={{ color: "hsl(51, 54%, 3%)" }} />
            </IconButton>
          </Box>
        </List>
      </Drawer>

    </>

     
  )
}
export default Header;
