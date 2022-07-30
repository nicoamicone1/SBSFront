import {
  Box,
  Container,
  Grid,
  Typography,
  Pagination,
  Button,
  List,
  ListItem,
  CardMedia,
  IconButton,
  Divider,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import NavBar from "../components/NavBar";
import * as color from "../colores";
import Loading from "../components/Loading";
import { useContext, useEffect, useState } from "react";
import { ProductContext, mil } from "../App";
import swal from "sweetalert2";
import { IProduct } from "../interfaces";
import axios from "axios";
import { api } from "../App";
import EditCreate from "../components/EditCreate";
import Footer from "../components/Footer";
import SearchInput from "../components/SearchInput";
import Empty from "../components/Empty";

const WebB = () => {
  const [page, setPage] = useState(1);
  const { products, setProducts, loaded } = useContext(ProductContext);
  const [dummy, setDummy] = useState<IProduct[]>(products);

  const handleDelete = (product: IProduct) => {
    swal
      .fire({
        title: "Seguro que desea eliminar el producto?",
        text: `Está por eliminar ${product.name}`,
        icon: "warning",
        confirmButtonText: "Eliminar",
        confirmButtonColor: "#8c0900",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      })
      .then((res) => {
        if (res.isConfirmed) {
          axios
            .delete(`${api}/products/${product._id}`)
            .then((res) => {
              if (res.status === 200) {
                swal.fire({
                  title: "Producto Borrado con Éxito",
                  icon: "success",
                  confirmButtonText: "Ok",
                });
              }
            })
            .then(() => {
              axios(`${api}/products`).then((res) =>
                setProducts(() => res.data)
              );
            })
            .catch(() => {
              swal.fire({
                title: "Error al borrar el producto",
                icon: "error",
                confirmButtonText: "Ok",
              });
            });
        }
      });
  };
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(() => value);
  };

  const GridItem = (product?: IProduct, initial?: boolean) => {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={2}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                border: "1px solid gray",
                p: 0.5,
                height: 30,
                ml: 1,
                borderTop: `${!initial && 0}`,
              }}
            >
              <Typography
                noWrap
                sx={{ fontSize: { xs: "0.70rem", sm: "0.80rem" } }}
              >
                {initial ? "ID" : product!._id}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                border: "1px solid gray",
                p: 0.5,
                height: 30,
                borderTop: `${!initial && 0}`,
                borderLeft: 0,
              }}
            >
              {initial ? (
                <Typography sx={{ fontSize: { xs: "0.70rem", sm: "0.80rem" } }}>
                  Foto
                </Typography>
              ) : (
                <CardMedia
                  component="img"
                  image={product!.image_url}
                  sx={{ objectFit: "contain" }}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                border: "1px solid gray",
                p: 0.5,
                height: 30,
                borderTop: `${!initial && 0}`,
                borderLeft: 0,
              }}
            >
              <Typography
                noWrap
                sx={{ fontSize: { xs: "0.70rem", sm: "0.80rem" } }}
              >
                {initial ? "Nombre" : product!.name}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                border: "1px solid gray",
                p: 0.5,
                height: 30,
                borderTop: `${!initial && 0}`,
                borderLeft: 0,
              }}
            >
              <Typography
                noWrap
                sx={{ fontSize: { xs: "0.70rem", sm: "0.80rem" } }}
              >
                {initial ? "Precio" : `$ ${mil(product!.price)}`}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                border: "1px solid gray",
                p: 0.5,
                height: 30,
                alignItems: "center",
                borderTop: `${!initial && 0}`,
                borderLeft: 0,
              }}
            >
              {initial ? (
                <Typography sx={{ fontSize: { xs: "0.70rem", sm: "0.80rem" } }}>
                  Editar
                </Typography>
              ) : (
                <EditCreate product={product!} />
              )}
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                border: "1px solid gray",
                p: 0.5,
                height: 30,
                alignItems: "center",
                mr: 1,
                borderTop: `${!initial && 0}`,
                borderLeft: 0,
              }}
            >
              {initial ? (
                <Typography sx={{ fontSize: { xs: "0.70rem", sm: "0.80rem" } }}>
                  Eliminar
                </Typography>
              ) : (
                <IconButton
                  color="error"
                  onClick={() => handleDelete(product!)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };

  useEffect(() => {
    if (products.length % 10 === 0) page > 1 && setPage((prev) => prev - 1);
    setDummy(() => products);
  }, [products]);
  return (
    <Container maxWidth={false} sx={{ p: { xs: 0 }, height: "100vh" }}>
      <NavBar />

      <Box sx={{ mt: 2 }}>
        <Box
          sx={{
            bgcolor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pb: 2,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              ml: "5%",
              fontWeight: 400,
              background: color.goldgradiant,
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Productos
          </Typography>
          <Box sx={{ mr: "5%" }}>
            <EditCreate create />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingY: 2,
            flexDirection: "column",
            background:
              "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(222,222,222,1) 50%, rgba(212,212,212,1) 100%)",
          }}
        >
          <Box
            sx={{
              mb: 2,
              width: "100%",
              display: "flex",
              visibility: `${
                loaded && !products.length ? "hidden" : "visible"
              }`,
              justifyContent: "center",
            }}
          >
            <SearchInput products={products} setDummy={setDummy} />
          </Box>
          {loaded ? (
            products.length ? (
              <Box sx={{ height: 450, width: "100%" }}>
                {GridItem(undefined, true)}
                {dummy
                  .slice(page * 10 - 10, page * 10)
                  .map((product) => GridItem(product, false))}
              </Box>
            ) : (
              <Empty />
            )
          ) : (
            <Loading />
          )}
        </Box>
        <Box
          sx={{
            display: `${products.length > 10 ? "flex" : "none"}`,
            justifyContent: "center",
          }}
        >
          <Pagination
            count={Math.ceil(products.length / 10)}
            page={page}
            onChange={handleChange}
            color="primary"
          />
        </Box>
      </Box>
      <Footer />
    </Container>
  );
};

export default WebB;
