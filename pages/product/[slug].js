import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  List,
  ListItem,
  Typography,
  Divider,
  Container,
  useMediaQuery,
  Link,
} from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import { useContext, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import classes from "../../utils/classes";
import client from "../../utils/client";
import { urlFor, urlForThumbnail } from "../../utils/image";
import { Store } from "../../utils/Store";
import axios from "axios";
import { useRouter } from "next/router";
import LayoutProductos from "../../components/LayoutProductos";
import { RxBookmark } from "react-icons/rx";
import { RxBookmarkFilled } from "react-icons/rx";
export default function ProductScreen(props) {
  const router = useRouter();
  const { slug } = props;
  const { dispatch } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    product: null,
    loading: true,
    error: "",
  });
  const [clicked, setclicked] = useState(true);
  const { product, loading, error } = state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await client.fetch(
          `
            *[_type == "product" && slug.current == $slug][0]`,
          { slug }
        );
        console.log(product);
        setState({ ...state, product, loading: false });
      } catch (err) {
        setState({ ...state, error: err.message, loading: false });
      }
    };
    fetchData();
  }, [slug]);
  const [size, setsize] = useState("");
  const [quantity, setquantity] = useState(0);

  const addQuantity = async () => {
    if (size !== "") {
      if (size === "S" && quantity < product.s) {
        setquantity(quantity + 1);
        console.log(quantity);
      } else if (size === "M" && quantity < product.m) {
        setquantity(quantity + 1);
        console.log(quantity);
      } else if (size === "L" && quantity < product.l) {
        setquantity(quantity + 1);
      } else {
        enqueueSnackbar("Maxima cantidad alcanzada", { variant: "error" });
      }
    } else {
      enqueueSnackbar("Selecione talla", { variant: "error" });
    }
  };
  const decQuantity = async () => {
    if (size !== "") {
      if (size === "S" && quantity > 0) {
        setquantity(quantity - 1);
        console.log(quantity);
      } else if (size === "M" && quantity > 0) {
        setquantity(quantity - 1);
        console.log(quantity);
      } else if (size === "L" && quantity > 0) {
        setquantity(quantity - 1);
      } else {
        enqueueSnackbar("La cantidad debe ser mayor a 0", { variant: "error" });
      }
    } else {
      enqueueSnackbar("Selecione talla", { variant: "error" });
    }
  };
  const buyNowHandler = async () => {
    // const { data } = await axios.get(`/api/products/${product._id}`);

    if (quantity === 0) {
      enqueueSnackbar("Seleciona talla", { variant: "error" });

      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        _key: product._id,
        name: product.name,
        S: product.s,
        M: product.m,
        L: product.l,
        slug: product.slug.current,
        price: product.price,
        image: urlForThumbnail(product.image && product.image[0]),
        quantity,
        size,
      },
    });
    enqueueSnackbar(`${product.name} Agregada al Carrito`, {
      variant: "success",
    });
    router.push("/cart");
  };
  const addToCartHandler = async () => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    console.log(data);
    if (quantity === 0) {
      enqueueSnackbar("Seleciona talla", { variant: "error" });

      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        _key: product._id,
        name: product.name,
        XS:product.xs,
        XL:product.xl,
        S: product.s,
        M: product.m,
        L: product.l,
        slug: product.slug.current,
        price: product.price,
        image: urlForThumbnail(product.image && product.image[0]),
        quantity,
        size,
      },
    });
    enqueueSnackbar(`${product.name} added to the cart`, {
      variant: "success",
    });
    router.push("/");
  };
  const [index, setIndex] = useState(0);
  const isDesktop = useMediaQuery("(min-width:600px)");
  const [selectedXs, setselecteXs] = useState(false);
  const [selectedS, setselectedS] = useState(false);
  const [selectedM, setselectedM] = useState(false);
  const [selectedL, setselectedL] = useState(false);
  const [selectedXL, setselectedXL] = useState(false);
  return (
    <LayoutProductos>
      <Container sx={{ mt: 4 }}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert variant="error">{error}</Alert>
        ) : (
          <Box>
            <Grid container spacing={6}>
              <Grid item md={4} xs={12} sx={{ marginTop: isDesktop?"70px":0 }}>
                <Button
                  sx={{
                    mt: 15,
                    width: "100%",
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: "0",
                    p: 1,
                    mb: 5,
                  }}
                >
                  COMO SE ARMA TU KITARA
                </Button>
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    width: "100%",
                    fontSize: "1rem",
                    mb: 1,
                    fontWeight: "bold",
                  }}
                >
                  MATERIALES Y CUIDADOS
                </Typography>
                <Typography
                  variant="text"
                  component="text"
                  sx={{ mt: 10, width: "100%", fontSize: ".8rem" }}
                >
                  ALGUNA DESCRIPCIÓN DE LA PRENDA , ALGUNA DESCRIPCIÓN DE LA
                  PRENDA ALGUNA DESCRIPCIÓN DE LA PRENDA ALGUNA DESCRIPCIÓN DE
                  LA PRENDA
                </Typography>
              </Grid>
              <Grid item md={4} xs={12} sx={{ marginTop: isDesktop?"70px":0 }}>
                <Box
                  display={"flex"}
                  sx={{
                    justifyContent: "center",
                    border: "1px solid black",
                    p: 2,
                  }}
                >
                  <Image
                    className="big-image"
                    src={urlFor(product.image && product.image[index])}
                    key={product.image._key}
                    alt={product.name}
                    width={450}
                    height={700}
                  />
                </Box>
              </Grid>
              <Grid item md={4} xs={12} sx={{ marginTop: isDesktop?"50px":0 }}>
                <List>
                  <ListItem className="nopadLeft">
                    {clicked ? (
                      <RxBookmark
                        fontSize="2.5rem"
                        onClick={() => {
                          setclicked(!clicked);
                        }}
                      />
                    ) : (
                      <RxBookmarkFilled
                        fontSize="2.5rem"
                        onClick={() => {
                          setclicked(!clicked);
                        }}
                      />
                    )}
                  </ListItem>
                  <ListItem sx={{ marginTop: isDesktop?"100px":0 }}>
                    <Typography
                      variant="h1"
                      component="h1"
                      sx={{ fontSize: "1.2rem" }}
                    >
                      {product.name}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography sx={{ fontSize: "1.2rem", opacity: ".9" }}>
                      {" "}
                      $
                      {new Intl.NumberFormat().format(parseInt(product.price)) +
                        " COP"}
                    </Typography>
                  </ListItem>
                  <Divider sx={classes.line} />
                  <ListItem
                    paddingBottom={"50px"}
                    sx={{ paddingBottom: "16px" }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontFamily: " coolvetica, sans-serif",
                      }}
                    >
                      Talla: {size}
                    </Typography>
                  </ListItem>
                  <listItem>
                    <Grid container spacing={2}>
                     {state.product.xs > 0 && <Grid item>
                        <button
                          size="small"
                          variant=""
                          onClick={() => {
                            setsize("XS");
                            setquantity(1);
                            setselecteXs(true);
                            setselectedS(false);
                            setselectedM(false);
                            setselectedL(false);
                            setselectedXL(false);
                          }}
                          style={selectedXs ? classes.selected : classes.but}
                        >
                          XS
                        </button>
                      </Grid>}
                      {state.product.s > 0 && <Grid item>
                        <button
                          size="small"
                          variant=""
                          onClick={() => {
                            setsize("S");
                            setquantity(1);
                            setselecteXs(false);
                            setselectedS(true);
                            setselectedM(false);
                            setselectedL(false);
                            setselectedXL(false);
                          }}
                          style={selectedS ? classes.selected : classes.but}
                        >
                          S
                        </button>
                      </Grid>}
                      {state.product.m > 0 &&  <Grid item>
                        <button
                          size="small"
                          variant=""
                          onClick={() => {
                            setsize("M");
                            setquantity(1);
                            setselecteXs(false);
                            setselectedS(false);
                            setselectedM(true);
                            setselectedL(false);
                            setselectedXL(false);
                          }}
                          style={selectedM ? classes.selected : classes.but}
                        >
                          M
                        </button>
                      </Grid>}
                      {state.product.l > 0 &&  <Grid item>
                        <button
                          size="small"
                          variant=""
                          onClick={() => {
                            setsize("L");
                            setselecteXs(false);
                            setselectedS(false);
                            setselectedM(false);
                            setselectedL(true);
                            setselectedXL(false);
                            setquantity(1);
                          }}
                          style={selectedL ? classes.selected : classes.but}
                        >
                          L
                        </button>
                      </Grid>}
                      {state.product.xl > 0 && <Grid item>
                        <button
                          size="small"
                          variant=""
                          onClick={() => {
                            setsize("L");
                            setselecteXs(false);
                            setselectedS(false);
                            setselectedM(false);
                            setselectedL(false);
                            setselectedXL(true);
                            setquantity(1);
                          }}
                          style={selectedXL ? classes.selected : classes.but}
                        >
                          XL
                        </button>
                      </Grid>}
                    </Grid>
                  </listItem>
                  <Divider
                    sx={{
                      mt: 5,
                      border: "1px solid white",
                      borderTop: "1px solid black",
                      height: "2px",
                      opacity: "1",
                      width: "97%",
                    }}
                  />
                  <ListItem>
                    {" "}
                    <NextLink href={"/"} passHref>
                      <Link
                        sx={{
                          color: "black",

                          textDecoration: "none",
                          "&:hover": {
                            color: "black",
                            textDecoration: "underline",
                          },
                        }}
                      >
                        GUIA DE TALLAS
                      </Link>
                    </NextLink>
                  </ListItem>
                  <ListItem>
                    <Button
                      sx={classes.blackline}
                      onClick={addToCartHandler}
                      fullWidth
                      variant=""
                    >
                      Agregar al carrito
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button
                      onClick={buyNowHandler}
                      fullWidth
                      variant="contained"
                      sx={classes.buyNow}
                    >
                      Comprar ahora
                    </Button>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </LayoutProductos>
  );
}

export function getServerSideProps(context) {
  return {
    props: { slug: context.params.slug },
  };
}
