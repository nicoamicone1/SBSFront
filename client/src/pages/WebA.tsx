import { Box, Container, Grid, Typography,Pagination } from "@mui/material"
import Card from "../components/Card"
import NavBar from '../components/NavBar'
import { IProduct } from "../interfaces"
import * as color from "../colores"
import Loading from "../components/Loading"
import { useContext, useState } from "react"
import { ProductContext } from "../App"
import Footer from "../components/Footer"
import Empty from "../components/Empty"


const WebA=() => {
    const [page,setPage]=useState(1)
    const {products,loaded}=useContext(ProductContext)
    
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
                    background:"linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(222,222,222,1) 50%, rgba(212,212,212,1) 100%)",
                    minHeight:400
                    }}>
                    {loaded?
                    products.length?
                    <Grid container spacing={2} width={"90%"}>
                        {products.slice((page*6)-6,page*6).map((product)=>(
                            <Grid item xs={6} lg={4}>
                                <Card product={product}/>
                            </Grid>
                        ))}
                    </Grid>:<Empty/>
                    :<Loading/>}
                </Box>
                <Box sx={{display:`${products.length>6?"flex":"none"}`,justifyContent:"center"}}>
                    <Pagination count={Math.ceil(products.length/6)} page={page} onChange={handleChange} color="primary" />
                </Box>
            </Box>
            <Footer/>
        </Container>
    )
}

export default WebA