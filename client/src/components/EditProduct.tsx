import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Box, CardMedia, IconButton, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { IProduct } from '../interfaces';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import * as color from "../colores"
import swal from "sweetalert2"
import Loading from './Loading';
import UrlDialog from './UrlDialog';
import {api,ProductContext} from "../App"
import axios from "axios"

interface Props{
    product:IProduct
}

const EditProduct:React.FC<Props> = ({product}) => {

  const [open, setOpen] = React.useState(false);
  const {setProducts}=React.useContext(ProductContext)
  const [dummy,setDummy]= React.useState<IProduct>(product);
  const [loading,setLoading]=React.useState(false);
  const [error,setError]= React.useState({
    name:false,
    price:false,
    description:false
  });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange= (target:HTMLInputElement) =>{
    if(target.name!=="price"){
        setError((prev)=>({...prev,[target.name]:false}))
        setDummy((prev)=>({...prev,[target.name]:target.value}))
        if(target.value==="") setError((prev)=>({...prev,[target.name]:true}))
    }else{
        setError((prev)=>({...prev,[target.name]:false}))
        if(parseInt(target.value)>=0)setDummy((prev)=>({...prev,[target.name]:target.value}))
        if(parseInt(target.value)<=0) setError((prev)=>({...prev,[target.name]:true}))
    }
  }

  const handleUpload=(target:HTMLInputElement)=>{
    const pic = target.files;
    if(!pic![0])return;
    setLoading(true)
    let formData=new FormData();
    formData.append('file',pic![0]);
    formData.append('upload_preset','uroim98f');
    fetch('https://api.cloudinary.com/v1_1/fotosnicoamicone/upload',{
        method: 'POST',
        body: formData,
    })
    .then((res)=>res.json())
    .then((res)=> {
        setDummy((prev)=>({...prev,image_url:res.url}))
        setLoading(false)
    })
    .catch(()=>{
        swal.fire({
            title: 'Error al cargar la imagen',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    });
  }

  const saveChanges=()=>{
    
    axios.put(`${api}/products/${product._id}`,dummy)
    .then((res)=>{
        if(res.status===200){
            swal.fire({
                title:"Producto Modificado",
                icon:"success",
                confirmButtonText:"Ok"
            })
        }
    })
    .then(()=>{
        axios(`${api}/products`).then((res)=>setProducts(()=>res.data))
        handleClose()
    })
    .catch(()=>{
        swal.fire({
            title:"Error al modificar producto",
            icon:"error",
            confirmButtonText:"Ok"
        })
        handleClose()
    })
  }
  return (
    <div>
        <IconButton color="primary" onClick={handleClickOpen}>
            <EditIcon/>
        </IconButton>
        <Dialog
            fullWidth
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
            {"Editar Producto"}
            </DialogTitle>

            <DialogContent>
                <input 
                aria-label="Archivo" 
                type="file" name="imagen"
                onChange={(e)=>handleUpload(e.target)}
                style={{ display: 'none' }}
                className="inputbtn"
                />
                <Box sx={{display:"flex",alignItems:"center",flexDirection:"column",width:"100%"}}>
                    <Box sx={{width:"40vw",display:"flex",justifyContent:"center"}}>
                        {!loading?
                        <CardMedia
                        component="img"
                        image={dummy.image_url}
                        alt="productImage"
                        sx={{width:{xs:"100%",md:"50%"},height:{xs:"100%",md:"40vh"},objectFit:"contain"}}
                        />:<Loading/>}
                    </Box>
                    <Box sx={{display:"flex"}}>
                        <IconButton 
                        sx={{background:color.goldgradiant,mr:1}}
                        onClick={()=>{
                            const element:HTMLElement = document.getElementsByClassName('inputbtn')[0] as HTMLElement;
                            element.click()
                        }}
                        >
                            <FileUploadIcon/>
                        </IconButton>
                        <UrlDialog setDummy={setDummy}/>
                    </Box>

                    <Box sx={{width:"80%",mt:1}}>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",mt:1}}>
                            <Typography>Nombre: </Typography>
                            <TextField error={error.name} name="name" size="small" sx={{ml:1}} value={dummy.name} onChange={(e)=>handleChange(e.target as HTMLInputElement)}/>
                        </Box>

                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",mt:1}}>
                            <Typography>Precio: </Typography>
                            <TextField error={error.price} name="price" type="number" size="small" sx={{ml:1}} value={dummy.price} onChange={(e)=>handleChange(e.target as HTMLInputElement)}/>
                        </Box>

                        <Box sx={{display:"flex",mt:1,flexDirection:"column"}}>
                            <Typography>Descripción: </Typography>
                            <TextField multiline error={error.description} name="description" size="small" value={dummy.description} onChange={(e)=>handleChange(e.target as HTMLInputElement)}/>
                        </Box>
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Close
                </Button>
                <Button onClick={saveChanges} autoFocus>
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}

export default EditProduct