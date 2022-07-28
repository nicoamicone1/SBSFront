import { Box, Container, Grid, Typography } from "@mui/material"
import Card from "../components/Card"
import NavBar from '../components/NavBar'
import { IProduct } from "../interfaces"
import * as color from "../colores"

interface Props{
    products:IProduct[]
}


const WebA: React.FC<Props> = ({ products }) => {
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
                    background:"linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(222,222,222,1) 50%, rgba(212,212,212,1) 100%)"}}>
                    <Grid container spacing={2} width={"90%"}>
                        {products.map((product)=>(
                            <Grid item xs={6} sm={4}>
                                <Card product={product}/>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default WebA