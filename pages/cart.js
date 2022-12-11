import Layout from "../components/Layout";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Link,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import dynamic from "next/dynamic";
import Image from "next/image";
import NextLink from "next/link";
import { useContext } from "react";
import { Store } from "../utils/Store";
// import axios from "axios";
// import { useSnackbar } from "notistack";

import { useRouter } from "next/router";

function CartScreen() {
  const router = useRouter();
  const {
    state: {
      cart: { cartItems },
      currency: { curre },
    },
    dispatch,
  } = useContext(Store);

  // const { enqueueSnackbar } = useSnackbar();
  // const updateCartHanlder = async (item, quantity, size) => {
  //   const { data } = await axios.get(`/api/products/${item._id}`);

  //   dispatch({
  //     type: "CART_ADD_ITEM",
  //     payload: {
  //       _key: item._key,
  //       name: item.name,
  //       countInStockS: item.s,
  //       countInStockM: item.m,
  //       countInStockL: item.l,
  //       slug: item.slug,
  //       price: item.price,
  //       image: item.image && item.image[0],
  //       quantity,
  //       size,
  //     },
  //   });
  //   enqueueSnackbar(`${item.name} Updated in the cart`, {
  //     variant: "success",
  //   });
  // };
  const removeItemHanlder = async (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  const isDesktop = useMediaQuery("(min-width:600px)");
  return (
    <Layout title="Shopping Cart">
      <Container>
        <Box sx={{ paddingBottom: isDesktop ? "420px" : "0 " }}>
          <Typography
            sx={{ fontWeight: "bold", fontFamily: " coolvetica, sans-serif" }}
            component="h1"
            variant="h1"
          >
            Carrito de compras
          </Typography>
          {cartItems.length === 0 ? (
            <Box sx={{ paddingBottom: isDesktop ? "0" : "400px" }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontFamily: " coolvetica, sans-serif",
                }}
              >
                El Carrito de compras esta vacio{" "}
              </Typography>
              <NextLink href="/search" passHref>
                <Link>Sigue comprando </Link>
              </NextLink>
            </Box>
          ) : (
            <Grid
              container
              spacing={1}
              sx={{ paddingBottom: isDesktop ? "0" : "130px" }}
            >
              <Grid item md={9} xs={12}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            fontFamily: " coolvetica, sans-serif",
                          }}
                        >
                          Imagen
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            fontFamily: " coolvetica, sans-serif",
                          }}
                        >
                          Producto
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            fontFamily: " coolvetica, sans-serif",
                          }}
                          align="right"
                        >
                          Talla
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            fontFamily: " coolvetica, sans-serif",
                          }}
                          align="right"
                        >
                          Cantidad
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            fontFamily: " coolvetica, sans-serif",
                          }}
                          align="right"
                        >
                          Precio
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            fontFamily: " coolvetica, sans-serif",
                          }}
                          align="right"
                        >
                          Eliminar
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item._key}>
                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={50}
                                  height={50}
                                ></Image>
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link
                                sx={{
                                  "&:hover": {
                                    color: "black",
                                    textDecoration: "underline",
                                  },
                                }}
                              >
                                <Typography>{item.name}</Typography>
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell align="right">
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link
                                sx={{
                                  "&:hover": {
                                    color: "black",
                                  },
                                }}
                              >
                                <Typography>{item.size}</Typography>
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell align="right">
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link
                                sx={{
                                  "&:hover": {
                                    color: "black",
                                  },
                                }}
                              >
                                <Typography>{item.quantity}</Typography>
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>
                              {curre === "default"
                                ? "$" +
                                  new Intl.NumberFormat().format(
                                    parseInt(item.price)
                                  )
                                : new Intl.NumberFormat("en-IN", {
                                    style: "currency",
                                    currency: "USD",
                                    minimumFractionDigits: 2,
                                  }).format(parseInt(item.priceusd))}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              variant="contained"
                              sx={{
                                backgroundColor: "black",
                                borderRadius: "0 ",
                                "&:hover": {
                                  backgroundColor: "black",
                                  transform: "scale(1.1, 1.1)",
                                },
                              }}
                              onClick={() => removeItemHanlder(item)}
                            >
                              x
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid
                item
                md={3}
                xs={12}
                sx={{ paddingBottom: isDesktop ? "0" : "20px" }}
              >
                <Card>
                  <List>
                    <ListItem>
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontFamily: " helvetica, sans-serif",
                          }}
                          variant="h2"
                        >
                          Subtotal (
                          {cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                          items):{" "}
                        </Typography>{" "}
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontFamily: " helvetica, sans-serif",
                          }}
                          variant="h2"
                        >
                          {curre === "default"
                            ? "$" +
                              new Intl.NumberFormat().format(
                                parseInt(
                                  cartItems.reduce(
                                    (a, c) => a + c.quantity * c.price,
                                    0
                                  )
                                )
                              )
                            : new Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: "USD",
                                minimumFractionDigits: 2,
                              }).format(
                                parseInt(
                                  cartItems.reduce(
                                    (a, c) => a + c.quantity * c.priceusd,
                                    0
                                  )
                                )
                              )}{" "}
                        </Typography>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <Button
                        onClick={() => {
                          router.push("/shipping");
                        }}
                        fullWidth
                        sx={{
                          backgroundColor: "black",
                          borderRadius: "0 ",
                          "&:hover": {
                            backgroundColor: "black",
                            transform: "scale(1, 1.1)",
                          },
                        }}
                        variant="contained"
                      >
                        Checkout
                      </Button>
                    </ListItem>
                  </List>
                </Card>
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
    </Layout>
  );
}
export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
