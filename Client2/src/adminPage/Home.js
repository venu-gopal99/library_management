import React from "react";
import Sidenavbar from "../admin/Sidenavbar";
import Navbar from "../admin/Navbar"
import { Box } from "@mui/material";
function Home() {
  return (
    <>
    <Navbar/>
      <Box sx={{ display: "flex" }}>
        <Sidenavbar />
        <Box component="main" sx={{ p: 3 }}>
         
        </Box>
      </Box>
    </>
  );
}

export default Home;
