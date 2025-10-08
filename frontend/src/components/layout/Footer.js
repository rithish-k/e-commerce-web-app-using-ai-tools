import React from "react";
import { Box, Typography, Button, Link } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidIcon from "@mui/icons-material/Android";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "hsl(51, 54%, 3%)",
        color: "hsl(100, 100%, 99%)",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        p: 4,
        gap: 2,
      }}
    >
      {/* Left Column: Download App */}
      <Box sx={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: 1,alignItems: "center"}}>
        <Typography variant="h6">Download Our App</Typography>
        <Box sx={{ display: "flex", gap: 1}}>
          <Button
            variant="contained"
            startIcon={<AppleIcon />}
            sx={{ backgroundColor: "#000", color: "#fff", "&:hover": { backgroundColor: "#333333ff" } }}
          >
            Apple
          </Button>
          <Button
            variant="contained"
            startIcon={<AndroidIcon />}
            sx={{ backgroundColor: "#3ddc84", color: "#fff", "&:hover": { backgroundColor: "#35b972" } }}
          >
            Android
          </Button>
        </Box>
      </Box>

      {/* Middle Column: Branding */}
      <Box sx={{ flex: "1 1 200px", textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold",color:"hsl(100, 100%, 99%)","&:hover":{color : "hsl(17, 87%, 54%)"} }}>
          ShopSimp
        </Typography>
        <Typography>Simp Worthy Products</Typography>
        <Typography variant="body2" sx={{ mt: 1, fontSize: "0.8rem" }}>
        &copy; {new Date().getFullYear()} ShopSimp. All Rights Reserved.
        </Typography>
      </Box>

      {/* Right Column: Follow Us */}
      <Box sx={{ flex: "1 1 200px", display: "flex",flexDirection: "column",textAlign: { xs: "left", md: "right" } ,alignItems: "center"}}>
        <Typography variant="h6">Follow Us</Typography>
        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <Link href="#" sx={{ color: "#fff", "&:hover": { color : "#3b5998"}, fontWeight: "bold", textDecoration: "none" }}>Facebook</Link>
          <Link href="#" sx={{ color: "#fff", "&:hover": { color : "#00acee"}, fontWeight: "bold", textDecoration: "none" }}>Twitter</Link>
          <Link href="#" sx={{ color: "#fff", "&:hover": { color : "#c13584"}, fontWeight: "bold", textDecoration: "none" }}>Instagram</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
