import React from "react";
import Sidenavbar from "../admin/Sidenavbar";
import { Box } from "@mui/material";
function Home() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidenavbar />
        <Box component="main" sx={{ p: 3 }}>
         
        </Box>
      </Box>
    </>
  );
}

export default Home;
