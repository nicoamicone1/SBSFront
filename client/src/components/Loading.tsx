import * as React from "react";
import { Box, Typography } from "@mui/material";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/500.css";

const Loading = () => {
  return (
    <>
      <Box
        sx={{
          mt: 0,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className="loadingio-spinner-pulse-1g227l6am6f">
          <div className="ldio-wkgde2p7rfk">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Loading;
