import { Box, CardMedia, Divider, IconButton, Typography } from "@mui/material"
import { IProduct } from "../interfaces"
import InfoIcon from '@mui/icons-material/Info';
import * as color from "../colores"

interface Props{
    product:IProduct
}

const Card: React.FC<Props> = ({ product }) => {
    return(
        <Box sx={{
            display:"flex",
            bgcolor:"white",
            borderRadius:3,
            flexDirection:{xs:"column",md:"row"},
            justifyContent:{md:"space-between"},
            alignItems:{xs:"center",md:"normal"},
            boxShadow:"rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;"}}
            >

            <CardMedia
                component="img"
                image={product.image_url}
                sx={{height:200,objectFit:"contain",width:{xs:"100%",md:"50%"}}}
            />

            <Divider sx={{marginX:2,display:{xs:"flex",md:"none"}}}/>
            <Divider flexItem orientation="vertical" sx={{display:{xs:"none",md:"flex"}}}/>

            <Box 
                sx={{
                display:"flex",
                alignItems:{xs:"center",md:"flex-start"},
                width:{xs:"100%",md:"50%"},
                p:1,
                flexDirection:"column"}}>

                <Typography 
                    variant="h5" 
                    fontWeight={500} 
                    sx={{ml:{xs:0,md:1},
                    mt:1,
                    color:color.grisosc}}>
                        {product.name}
                </Typography>

                <Box sx={{
                    bgcolor:color.azulosc,
                    ml:{xs:0,md:1},
                    p:0.5,
                    borderRadius:2,
                    mt:1
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

                <Box sx={{
                    mt:{xs:1,md:"auto"},
                    display:"flex",
                    justifyContent:"flex-end",
                    width:{md:"100%"}
                    }}>
                    <IconButton 
                        sx={{
                            background:color.goldgradiant,
                            borderRadius:2
                        }}>
                        <InfoIcon sx={{color:color.azulosc}}/>
                        <Typography variant="body2" sx={{color:color.azulosc}}>
                            Detalles
                        </Typography>
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}

export default Card