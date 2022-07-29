import { Box, Container, Grid, Typography,Pagination, Button, List, ListItem, CardMedia, IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import NavBar from '../components/NavBar'
import * as color from "../colores"
import Loading from "../components/Loading"
import { useContext, useState } from "react"
import { ProductContext } from "../App"
import swal from "sweetalert2"
import { IProduct } from "../interfaces";
import axios from "axios";
import {api} from "../App"
import EditProduct from "../components/EditProduct";




const WebB = () => {
    const [page,setPage]=useState(1)
    const {products,setProducts}=useContext(ProductContext)

    const handleDelete=(product:IProduct)=>{
        swal.fire({
            title: 'Seguro que desea eliminar el producto?',
            text: `Está por eliminar ${product.name}`,
            icon: 'warning',
            confirmButtonText: 'Eliminar',
            confirmButtonColor:"#8c0900",
            showCancelButton:true,
            cancelButtonText:"Cancelar",
            reverseButtons:true
        }).then((res)=>{
            if(res.isConfirmed){
                axios.delete(`${api}/products/${product._id}`)
                .then((res)=>{
                    if(res.status===200){
                        swal.fire({
                            title: 'Producto Borrado con Éxito',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        })
                    }
                })
                .then(()=>{
                    axios(`${api}/products`).then((res)=>setProducts(()=>res.data))
                })
                .catch(()=>{
                    swal.fire({
                        title: 'Error al borrar el producto',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                })
            }
        })
    }
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(()=>value);
    };

    return(
        <Container maxWidth={false} sx={{p:{xs:0},height:"100vh"}} >

            <NavBar/>

            <Box sx={{mt:2}}>

                <Box sx={{bgcolor:"white"}}>
                    <Typography 
                    variant="h2" 
                    sx={{
                    ml:"5%",
                    fontWeight:400,
                    background:color.goldgradiant,
                    backgroundClip:"text",
                    WebkitTextFillColor:"transparent",
                    pb:2
                    }}>
                        Productos
                    </Typography>
                </Box>

                <Box sx={{
                    display:"flex",
                    justifyContent:"center",
                    paddingY:4,
                    background:"linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(222,222,222,1) 50%, rgba(212,212,212,1) 100%)"}}
                    >

                    {products.length?
                    <List sx={{width:{xs:"100%",md:"60%"}}}>
                    {products.slice((page*6)-6,page*6).map((product)=>(
                        <ListItem>
                            <Box sx={{
                                display:"flex",
                                flexDirection:"row",
                                bgcolor:"white",
                                borderRadius:3,
                                width:"100%",
                                alignItems:"center",
                                justifyContent:"space-between"
                                }}>
                                <Box>
                                <CardMedia
                                component="img"
                                image={product.image_url}
                                sx={{height:50,width:50,objectFit:"contain",p:1}}
                                />
                                </Box>

                                <Typography noWrap variant="h5" sx={{fontWeight:300,ml:2,width:"100%"}}>{product.name}</Typography>

                                <Box sx={{
                                bgcolor:color.azulosc,
                                p:0.5,
                                borderRadius:2,
                                marginX:2
                                }}>
                                    <Typography 
                                        variant="h6" 
                                        sx={{
                                            color:"white",
                                            background:color.goldgradiant,
                                            backgroundClip:"text",
                                            WebkitTextFillColor:"transparent"}}
                                        >$ 
                                        {product.price}
                                    </Typography>
                                </Box>

                                <Box sx={{display:"flex",justifyContent:"center"}}>
                                    <IconButton color="error" onClick={()=>handleDelete(product)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                    <EditProduct product={product}/>
                                </Box>
                            </Box>
                        </ListItem>
                    ))}
                    </List>
                    :<Loading/>}
                </Box>
                <Box sx={{display:`${products.length>6?"flex":"none"}`,justifyContent:"center"}}>
                    <Pagination count={Math.ceil(products.length/6)} page={page} onChange={handleChange} color="primary" />
                </Box>
            </Box>
        </Container>
    )
}

export default WebB