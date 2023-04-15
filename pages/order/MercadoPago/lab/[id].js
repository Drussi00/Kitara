import {
    Box,
    Card,
    Container,
    Grid,
    List,
    ListItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Link,
  } from "@mui/material";
  
  import dynamic from "next/dynamic";
  import NextLink from "next/link";
  import React, { useContext, useReducer } from "react";
  import Layout from "../../../../components/Layout";
  import classes from "../../../../utils/classes";
  import Product from "../../../../components/MercadoPago";
  import { Store } from "../../../../utils/Store";
  import { useEffect } from "react";
  import axios from "axios";
  import { useRouter } from "next/router";
import { urlFor } from "../../../../utils/image";
import Image from "next/image";
  
  function reducer(state, action) {
    switch (action.type) {
      case "FETCH_REQUEST":
        return { ...state, loading: true, error: "" };
      case "FETCH_SUCCESS":
        return { ...state, loading: false, order: action.payload, error: "" };
      case "FETCH_FAIL":
        return { ...state, loading: false, error: action.payload };
    }
  }
  
  function OrderScreen({ params }) {
    const { id: orderId } = params;
  
    const [{ order }, dispatch] = useReducer(reducer, {
      loading: true,
      order: {},
      error: "",
    });
  
    const {
      shippingAddress,
      paymentMethod,
      orderItems,
      itemsPrice,
      // taxPrice,
      shippingPrice,
      totalPrice,
      // isPaid,
      // paidAt,
      // isDelivered,
      // deliveredAt,
      data,
    } = order;
    const router = useRouter();
    const { state } = useContext(Store);
    const { userInfo } = state;
  
    useEffect(() => {
      if (!userInfo) {
        return router.push("/login");
      }
  
      const fetchOrder = async () => {
        try {
          dispatch({ type: "FETCH_REQUEST" });
          const { data } = await axios.get(`/api/orders/PayPal/${orderId}`, {
            headers: { authorization: `Bearer ${userInfo.token}` },
          });
  
          dispatch({ type: "FETCH_SUCCESS", payload: data });
        } catch (err) {
          dispatch({ type: "FETCH_FAIL", payload: err });
        }
      };
      fetchOrder();
    }, []);
  
    console.log(orderItems?.reduce((a, b) => a + (b?.price ? b.price : 0), 0))
  
    return (
      <Layout title={`Order ${orderId}`}>
        <Container sx={{mt:13}}>
          <Typography component="h1" variant="h1">
            Order {orderId}
          </Typography>
  
          <Grid container spacing={1}>
            <Grid item md={9} xs={12}>
              <Card sx={classes.section}>
                <List>
                  <ListItem>
                    <Typography component="h1" variant="h1">
                      Direccion de Envío{" "}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    {shippingAddress?.fullName}, {shippingAddress?.address},{" "}
                    {shippingAddress?.city}, {shippingAddress?.postalCode},{" "}
                    {shippingAddress?.country}
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
                  <ListItem>Status:</ListItem>
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
                          {orderItems?.filter((item)=> item.image !== undefined).map((item) => (
                            <TableRow key={item?._key}>
                              <TableCell>
                                    <Image
                                      src={urlFor(item.image)}
                                      alt={item?.name}
                                      width={50}
                                      height={50}
                                    ></Image>
                              </TableCell>
                              <TableCell>
                                    <Typography>{item?.name}</Typography>
                              </TableCell>
                              <TableCell align="right">
                                <Typography>{item?.size}</Typography>
                              </TableCell>
                              <TableCell align="right">
                                <Typography>{item?.quantity}</Typography>
                              </TableCell>
                              <TableCell align="right">
                                <Typography>
                                  {" "}
                                  $
                                  {new Intl.NumberFormat().format(
                                    parseInt(item?.price)
                                  )}
                                </Typography>
                              </TableCell>
                            </TableRow>
                          ))}
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
                    <Typography variant="h1">Resumen de Orden</Typography>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Productos:</Typography>
                      </Grid>
                      <Grid item xs={6} align="right"> 
                       
                          ${new Intl.NumberFormat().format(orderItems?.reduce((a, b) => a + (b?.price ? b.price : 0), 0))}
                       
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}></Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Impuestos: </Typography>
                      </Grid>
                      <Grid item xs={6} align="right">
                        ${new Intl.NumberFormat().format(parseInt(totalPrice - orderItems?.reduce((a, b) => a + (b?.price ? b.price : 0), 0)))}
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                          Total: 
                      
                      </Grid>
                      <Grid item xs={6} align="right">
                            $
                            {new Intl.NumberFormat().format(parseInt(totalPrice))}
                    
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Box sx={classes.fullWidth}>
                      {data?.global ? <Product id={data?.global} /> : null}
                    </Box>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    );
  }
  export function getServerSideProps({ params }) {
    return { props: { params } };
  }
  
  export default dynamic(() => Promise.resolve(OrderScreen), { ssr: false });
  