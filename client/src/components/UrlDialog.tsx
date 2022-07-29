import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import * as color from "../colores"
import { IProduct } from '../interfaces';

interface Props{
    setDummy:React.Dispatch<React.SetStateAction<IProduct>>
}

const UrlDialog:React.FC<Props> =({setDummy}) =>{
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <IconButton sx={{background:color.goldgradiant,ml:1}} onClick={handleClickOpen}>
            <LinkIcon/>
        </IconButton>
        <Dialog fullWidth open={open} onClose={handleClose}>
            <DialogTitle>Insertar Url de la Imagen</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Url"
                type="url"
                fullWidth
                variant="standard"
                value={value}
                onChange={(e)=>setValue(()=>e.target.value)}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={()=>{
                setDummy((prev)=>({...prev,image_url:value}))
                handleClose()
                }}>Ok</Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}


export default UrlDialog