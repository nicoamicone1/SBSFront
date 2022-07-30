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
  const regex=/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setValue("")
    setOpen(false);
  };

  const handleSave=()=>{
    if(regex.test(value)){
      setDummy((prev)=>({...prev,image_url:value}))
      handleClose()
    }
    else setError(true)
  }
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
                error={error}
                variant="standard"
                value={value}
                helperText={error&&"Introducir una url valida"}
                onChange={(e)=>{
                  setError(false)
                  setValue(()=>e.target.value)}}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Ok</Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}


export default UrlDialog