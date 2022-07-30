import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "./Drawer";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          display: "flex",
          alignItems: "center",
          minHeight: 60,
          flexDirection: "row",
          width: "100%",
          backgroundColor: "white",
          boxShadow: "none",
        }}
      >
        <Drawer />

        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 300, color: "black" }}
          >
            Grupo SBS Challenge
          </Typography>
        </Box>
      </AppBar>
    </Box>
  );
}
