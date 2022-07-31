import { Box, Typography } from "@mui/material";
import * as color from "../colores";

const Text = (text: string, size: string) => {
  return (
    <Typography
      sx={{
        fontSize: `${size}`,
        background: color.goldgradiant,
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {text}
    </Typography>
  );
};

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: color.azulosc,
        p: 3,
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {Text("Daniel Nicolás Amicone", "2.5vh")}
      {Text("Fullstack Jr", "2vh")}
      {Text("nicoamicone1@gmail.com", "1.75vh")}
      {Text("Fecha deploy: 29/7", "1.75vh")}
    </Box>
  );
};

export default Footer;
