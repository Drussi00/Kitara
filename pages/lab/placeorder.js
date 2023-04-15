import {
    Button,
    Card,
    CircularProgress,
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
  } from "@mui/material";
  import Image from "next/image";
  import { useRouter } from "next/router";
  import React, { useContext, useEffect, useState } from "react";
  import NextLink from "next/link";
  import CheckoutWizard from "../../components/CheckoutWizard";
  import Layout from "../../components/Layout";
  import classes from "../../utils/classes";
  import { Store } from "../../utils/Store";
  import { useSnackbar } from "notistack";
  import { getError } from "../../utils/error";
  import axios from "axios";
  import jsCookie from "js-cookie";
  import dynamic from "next/dynamic";
import { urlFor } from "../../utils/image";
  
  function PlaceOrderScreen() {
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const {
      userInfo,
      cart: { cartItems, shippingAddress, paymentMethod },
      currency: { curre },
      lab_product
    } = state;
  
    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
    const itemsPrice =
      curre === "default"
        ? round2(cartItems.reduce((a, c) => a + c.price * c.quantity, 0))
        : round2(cartItems.reduce((a, c) => a + c.priceusd * c.quantity, 0));
  
    const shippingPrice = itemsPrice > 200 ? 0 : 15;
    const taxPrice = round2((parseInt(lab_product.chaleco ?lab_product.chaleco.price:0)+parseInt(lab_product.mangas?.manga_derecha?lab_product.mangas.manga_derecha.price:0 )+parseInt(lab_product.mangas?.manga_izquierda?lab_product.mangas.manga_izquierda.price:0)+parseInt(lab_product.capota ? lab_product.capota.price:0))*0.15);
    const totalPrice = round2((parseInt(lab_product.chaleco ?lab_product.chaleco.price:0)+parseInt(lab_product.mangas?.manga_derecha?lab_product.mangas.manga_derecha.price:0 )+parseInt(lab_product.mangas?.manga_izquierda?lab_product.mangas.manga_izquierda.price:0)+parseInt(lab_product.capota ? lab_product.capota.price:0)) + taxPrice);
  
    const size = async () => {
      let tallaXS;
      let tallaS;
      let tallaM;
      let tallaL;
      let unitario;
      cartItems.map((item) => {
        unitario = item;
        if (item.size === "XS") {
          tallaXS = item.countInStockXS - item.quantity;
        } else {
          if (item.size === "S") {
            tallaS = item.countInStockS - item.quantity;
          } else {
            if (item.size === "M") {
              tallaM = item.countInStockM - item.quantity;
            } else {
              if (item.size === "L") {
                tallaL = item.countInStockL - item.quantity;
              }
            }
          }
        }
      });
      try {
        await axios.put(
          "/api/products/tallas",
          { unitario, tallaXS, tallaS, tallaM, tallaL },
          { headers: { authorization: `Bearer ${userInfo.token}` } }
        );
        await axios.put(
          "/api/orders/MercadoPago/response",
          { unitario },
          { headers: { authorization: `Bearer ${userInfo.token}` } }
        );
      } catch (err) {
        console.log(err);
      }
    };
    useEffect(() => {
      if (!paymentMethod) {
        router.push("/lab/payment");
      }

    }, [cartItems, paymentMethod, router]);
  
    const placeOrderHandler = async () => {
      size();
      try {
        setLoading(true);
          const { data } = await axios.post(
            "/api/orders/MercadoPago/lab",
            {
              orderItems: [
                {...lab_product.chaleco,
                    description:lab_product.chaleco?.name
                },
                {...lab_product.capota,
                    description:"capota " + lab_product.capota?.name
                },
                {...lab_product.mangas?.manga_derecha,
                    description:"manga derecha " + lab_product.mangas?.manga_derecha?.name
                },
                {...lab_product.mangas?.manga_izquierda,
                    description:"mangas izquierda " + lab_product.mangas?.manga_izquierda?.name
                }
              ],
              shippingAddress,
              paymentMethod,
              itemsPrice,
              shippingPrice,
              taxPrice,
              totalPrice,
            },
            {
              headers: {
                authorization: `Bearer ${userInfo.token}`,
              },
            }
          );
          console.log(data);
          dispatch({ type: "LAB_CLEAR" });
          jsCookie.set("lab_product",JSON.stringify({}));
          jsCookie.remove("paymentMethod");
          setLoading(false);
  
          router.push(`/order/MercadoPago/lab/${data}`);
      } catch (err) {
        setLoading(false);
        enqueueSnackbar(getError(err), { variant: "error" });
      }
    };

  
    return (
      <Layout title="Place Order">
        <Container sx={{mt:13}}>
          <CheckoutWizard activeStep={3}></CheckoutWizard>
          <Typography component="h1" variant="h1">
            Crear Orden
          </Typography>
  
          <Grid container spacing={1}>
            <Grid item md={9} xs={12}>
              <Card sx={classes.section}>
                <List>
                  <ListItem>
                    <Typography component="h1" variant="h1">
                      Direccion
                    </Typography>
                  </ListItem>
                  <ListItem>
                    {shippingAddress.fullName}, {shippingAddress.address},{" "}
                    {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                    {shippingAddress.country}
                  </ListItem>
                  <ListItem>
                    <Button
                      onClick={() => router.push("/lab/shipping")}
                      variant="contianed"
                      color="secondary"
                    >
                      Editar
                    </Button>
                  </ListItem>
                </List>
              </Card>
              <Card sx={classes.section}>
                <List>
                  <ListItem>
                    <Typography component="h1" variant="h1">
                      Metodo de pago
                    </Typography>
                  </ListItem>
                  <ListItem>{paymentMethod}</ListItem>
                </List>
              </Card>
              <Card sx={classes.section}>
                <List>
                  <ListItem>
                    <Typography component="h1" variant="h1">
                      Productos
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Imagen</TableCell>
                            <TableCell>Producto</TableCell>
                            <TableCell align="right">Talla</TableCell>
                            <TableCell align="right">Cantidad</TableCell>
                            <TableCell align="right">Precio</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                           (lab_product.chaleco) ?<TableRow>
                            <TableCell>
                              <NextLink href={`/lab`} passHref>
                                <Link>
                                  <Image
                                    src={urlFor(lab_product.chaleco.image)}
                                    alt={lab_product.chaleco.name}
                                    width={50}
                                    height={50}
                                  ></Image>
                                </Link>
                              </NextLink>
                            </TableCell>
                            <TableCell>
                              <NextLink href={`/lab`} passHref>
                                <Link>
                                  <Typography>{lab_product.chaleco.name}</Typography>
                                </Link>
                              </NextLink>
                            </TableCell>
                            <TableCell align="right">
                              <Typography></Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography></Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>
                                {curre === "default"
                                  ? "$" +
                                    new Intl.NumberFormat().format(
                                      parseInt(lab_product.chaleco.price)
                                    )
                                  : new Intl.NumberFormat("en-IN", {
                                      style: "currency",
                                      currency: "USD",
                                      minimumFractionDigits: 2,
                                    }).format(parseInt(lab_product.chaleco.priceusd))}
                              </Typography>
                            </TableCell>
                          </TableRow>:null
                          }
                          {
                           (lab_product.capota) ?<TableRow>
                            <TableCell>
                              <NextLink href={`/lab`} passHref>
                                <Link>
                                  <Image
                                    src={urlFor(lab_product.capota.image)}
                                    alt={lab_product.capota.name}
                                    width={50}
                                    height={50}
                                  ></Image>
                                </Link>
                              </NextLink>
                            </TableCell>
                            <TableCell>
                              <NextLink href={`/lab`} passHref>
                                <Link>
                                  <Typography>capota {lab_product.capota.name}</Typography>
                                </Link>
                              </NextLink>
                            </TableCell>
                            <TableCell align="right">
                              <Typography></Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography></Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>
                                {curre === "default"
                                  ? "$" +
                                    new Intl.NumberFormat().format(
                                      parseInt(lab_product.capota.price)
                                    )
                                  : new Intl.NumberFormat("en-IN", {
                                      style: "currency",
                                      currency: "USD",
                                      minimumFractionDigits: 2,
                                    }).format(parseInt(lab_product.capota.priceusd))}
                              </Typography>
                            </TableCell>
                          </TableRow>:null
                          }
                                    {
                           (lab_product.mangas?.manga_izquierda) ?<TableRow>
                            <TableCell>
                              <NextLink href={`/lab`} passHref>
                                <Link>
                                  <Image
                                    src={urlFor(lab_product.mangas?.manga_izquierda.image)}
                                    alt={lab_product.mangas?.manga_izquierda.name}
                                    width={50}
                                    height={50}
                                  ></Image>
                                </Link>
                              </NextLink>
                            </TableCell>
                            <TableCell>
                              <NextLink href={`/lab`} passHref>
                                <Link>
                                  <Typography>manga izquierda {lab_product.mangas?.manga_izquierda.name}</Typography>
                                </Link>
                              </NextLink>
                            </TableCell>
                            <TableCell align="right">
                              <Typography></Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography></Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>
                                {curre === "default"
                                  ? "$" +
                                    new Intl.NumberFormat().format(
                                      parseInt(lab_product.mangas?.manga_izquierda.price)
                                    )
                                  : new Intl.NumberFormat("en-IN", {
                                      style: "currency",
                                      currency: "USD",
                                      minimumFractionDigits: 2,
                                    }).format(parseInt(lab_product.mangas?.manga_izquierda.priceusd))}
                              </Typography>
                            </TableCell>
                          </TableRow>:null
                          }
                           {
                           (lab_product.mangas?.manga_derecha) ?<TableRow>
                            <TableCell>
                              <NextLink href={`/lab`} passHref>
                                <Link>
                                  <Image
                                    src={urlFor(lab_product.mangas?.manga_derecha.image)}
                                    alt={lab_product.mangas?.manga_derecha.name}
                                    width={50}
                                    height={50}
                                  ></Image>
                                </Link>
                              </NextLink>
                            </TableCell>
                            <TableCell>
                              <NextLink href={`/lab`} passHref>
                                <Link>
                                  <Typography>manga derecha {lab_product.mangas?.manga_derecha.name}</Typography>
                                </Link>
                              </NextLink>
                            </TableCell>
                            <TableCell align="right">
                              <Typography></Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography></Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>
                                {curre === "default"
                                  ? "$" +
                                    new Intl.NumberFormat().format(
                                      parseInt(lab_product.mangas?.manga_derecha.price)
                                    )
                                  : new Intl.NumberFormat("en-IN", {
                                      style: "currency",
                                      currency: "USD",
                                      minimumFractionDigits: 2,
                                    }).format(parseInt(lab_product.mangas?.manga_derecha.priceusd))}
                              </Typography>
                            </TableCell>
                          </TableRow>:null
                          }
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </ListItem>
                </List>
              </Card>
            </Grid>
            <Grid item md={3} xs={12}>
              <Card sx={classes.section}>
                <List>
                  <ListItem>
                    <Typography variant="h1">Resumen de la Orden</Typography>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Productos:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">
                        {new Intl.NumberFormat().format(
                        parseInt(lab_product.chaleco ? lab_product.chaleco.price:0)+parseInt(lab_product.mangas?.manga_derecha?lab_product.mangas.manga_derecha.price:0 )+parseInt(lab_product.mangas?.manga_izquierda?lab_product.mangas.manga_izquierda.price:0)+parseInt(lab_product.capota ? lab_product.capota.price:0)
                      ) + " COP"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Impuestos:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">
                          {"$" +
                              new Intl.NumberFormat().format(
                                ((parseInt(lab_product.chaleco ? lab_product.chaleco.price:0)+parseInt(lab_product.mangas?.manga_derecha?lab_product.mangas.manga_derecha.price:0 )+parseInt(lab_product.mangas?.manga_izquierda?lab_product.mangas.manga_izquierda.price:0)+parseInt(lab_product.capota ? lab_product.capota.price:0))*1.15) - (parseInt(lab_product.chaleco ? lab_product.chaleco.price:0)+parseInt(lab_product.mangas?.manga_derecha?lab_product.mangas.manga_derecha.price:0 )+parseInt(lab_product.mangas?.manga_izquierda?lab_product.mangas.manga_izquierda.price:0)+parseInt(lab_product.capota ? lab_product.capota.price:0))
                              )}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Total:</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">
                          <strong>
                          {new Intl.NumberFormat().format(
                        (parseInt(lab_product.chaleco ? lab_product.chaleco.price:0)+parseInt(lab_product.mangas?.manga_derecha?lab_product.mangas.manga_derecha.price:0 )+parseInt(lab_product.mangas?.manga_izquierda?lab_product.mangas.manga_izquierda.price:0)+parseInt(lab_product.capota ? lab_product.capota.price:0))*1.15
                      ) + " COP"}
                          </strong>
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Button
                      onClick={placeOrderHandler}
                      variant="contained"
                      sx={{
                        backgroundColor: "black",
                        borderRadius: "0",
                        "&:hover": {
                          backgroundColor: "black",
                          transform: "scale(1, 1.1)",
                        },
                      }}
                      fullWidth
                      disabled={loading}
                    >
                      Crear Orden
                    </Button>
                  </ListItem>
                  {loading && (
                    <ListItem>
                      <CircularProgress />
                    </ListItem>
                  )}
                </List>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    );
  }
  export default dynamic(() => Promise.resolve(PlaceOrderScreen), { ssr: false });
  