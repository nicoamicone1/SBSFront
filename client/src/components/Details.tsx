import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import * as color from "../colores";
import { IProduct } from "../interfaces";
import { Box, CardMedia } from "@mui/material";
import { mil } from "../App";

interface Props {
  product: IProduct;
}

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            visibility: "hidden",
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const Details: React.FC<Props> = ({ product }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        onClick={handleClickOpen}
        sx={{
          background: color.goldgradiant,
          borderRadius: 2,
        }}
      >
        <InfoIcon sx={{ color: color.azulosc }} />
      </IconButton>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {product.name}
        </BootstrapDialogTitle>

        <DialogContent dividers>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              image={product.image_url}
              sx={{
                height: { xs: 300, sm: 400 },
                width: { xs: 300, sm: 400 },
                objectFit: "contain",
              }}
            />

            <Box
              sx={{
                bgcolor: color.azulosc,
                ml: { xs: 0, md: 1 },
                p: 0.5,
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  background: color.goldgradiant,
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ${mil(product.price)}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 1 }}>
            <Typography>{product.description}</Typography>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cerrar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default Details;
