import { Box, CardMedia, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const Empty = () => {
  const location = useLocation();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 350,
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 300 }}>
        No hay productos para mostrar
      </Typography>
      <CardMedia
        component="img"
        image="https://img.icons8.com/plumpy/384/sad.png"
        sx={{ height: "30vh", width: "30vh", objectFit: "contain", mt: 2 }}
      />
      <Typography variant="body2" sx={{ fontWeight: 300, mt: 2 }}>
        {location.pathname === "/"
          ? "Sube algunos productos para verlos aquí"
          : "Sube algunos productos para administrarlos desde aquí"}
      </Typography>
    </Box>
  );
};

export default Empty;
