import { Box, CardMedia, Divider, IconButton, Tooltip, Typography } from "@mui/material"
import { IProduct } from "../interfaces"
import Details from "./Details"
import * as color from "../colores"
import { mil } from "../App"

interface Props {
    product: IProduct
}

const Card: React.FC<Props> = ({ product }) => {
    return (
        <Box sx={{
            display: "flex",
            bgcolor: "white",
            borderRadius: 3,
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { md: "space-between" },
            alignItems: { xs: "center", md: "normal" },
            boxShadow: "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;"
            }}
        >

            <CardMedia
                component="img"
                image={product.image_url}
                sx={{ height: { xs: 150, md: 200 }, objectFit: "contain", maxWidth: { xs: "100%", md: "45%" }, m: 1 }}
            />

            <Divider sx={{ marginX: 2, display: { xs: "flex", md: "none" } }} />
            <Divider flexItem orientation="vertical" sx={{ display: { xs: "none", md: "flex" } }} />

            <Box
                sx={{
                    display: "flex",
                    alignItems: { xs: "center", md: "flex-start" },
                    width: { xs: "100%", md: "50%" },
                    p: 1,
                    flexDirection: "column"
                }}>

                <Typography
                    fontWeight={500}
                    sx={{
                        ml: { xs: 0, md: 1, fontSize: 10 },
                        color: color.grisosc
                    }}>
                    {product._id}
                </Typography>

                <Tooltip title={product.name} placement="top">
                    <Typography
                        variant="h6"
                        fontWeight={500}
                        sx={{
                            ml: { xs: 0, md: 1 },
                            mt: 0,
                            color: color.grisosc
                        }}>
                        {product.name.length > 14 ? product.name.slice(0, 14) + "..." : product.name}
                    </Typography>
                </Tooltip>

                <Box sx={{
                    ml: { xs: 0, md: 1 },
                    height: { xs: 75, md: 80 },
                    width: "90%",
                }}>
                    <Typography variant="body2">{product.description.length > 80 ? product.description.slice(0, 55) + "..." : product.description}</Typography>
                </Box>

                <Box sx={{
                    mt: { xs: 1, md: "auto" },
                    display: "flex",
                    justifyContent: "space-between",
                    width: { xs: "90%", md: "100%" }
                }}>

                    <Box sx={{
                        bgcolor: color.azulosc,
                        p: 0.5,
                        borderRadius: 2,
                    }}>
                        <Typography
                            variant="h6"
                            sx={{
                                color: "white",
                                background: color.goldgradiant,
                                backgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}
                        >
                            ${mil(product.price)}
                        </Typography>
                    </Box>

                    <Details product={product} />
                </Box>
            </Box>
        </Box>
    )
}

export default Card