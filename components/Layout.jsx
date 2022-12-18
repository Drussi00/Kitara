import { createTheme } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import Dropdown from "react-bootstrap/Dropdown";
import CloseIcon from "@mui/icons-material/Close";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import OutlinedInput from "@mui/material/OutlinedInput";
import logo from "../utils/Images/logo.png";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  Link,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

import Head from "next/head";
import NextLink from "next/link";
import classes from "../utils/classes";
import { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import jsCookie from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import { useSnackbar } from "notistack";
import { getError } from "../utils/error";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import Image from "next/image";

////////////////////////////////////////////////////////////////
export default function Layout({ title, description, children }) {
  const [moneda, setmoneda] = useState("default");
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const [location, setLocation] = useState(false);
  const {
    cart,
    userInfo,
    currency: { curre },
  } = state;
  useEffect(() => {
    const metod = () => {
      setLocation(
        window.location.pathname.includes("/order/MercadoPago") ||
          window.location.pathname.includes("/order/PayPal") ||
          window.location.pathname.includes("/placeorder")
      );
    };
    metod();
  }, []);

  const theme = createTheme({
    components: {
      MuiLink: {
        defaultProps: {
          underline: "hover",
        },
      },
    },
    typography: {
      h1: {
        fontSize: "1.2rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    palette: {
      primary: {
        main: "#000000",
      },
      secondary: {
        main: "#ffffff",
      },
    },
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const loginMenuCloseHandler = (e) => {
    setAnchorEl(null);
    router.push(e);
  };
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: "USER_LOGOUT" });
    jsCookie.remove("userInfo");
    jsCookie.remove("cartItems");
    jsCookie.remove("shippingAddress");
    jsCookie.remove("paymentMethod");
    router.push("/");
  };

  const [sidbarVisible, setSidebarVisible] = useState(false);
  const sidebarOpenHandler = () => {
    setSidebarVisible(true);
  };
  const sidebarCloseHandler = () => {
    setSidebarVisible(false);
  };

  const { enqueueSnackbar } = useSnackbar();
  const [categories, setCategories] = useState([]);
  const [coleciones, setcoleciones] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        enqueueSnackbar(getError(err), { variant: "error" });
      }
    };
    fetchCategories();
    const fetchColeciones = async () => {
      try {
        const { data } = await axios.get(`/api/products/coleciones`);
        setcoleciones(data);
      } catch (err) {
        enqueueSnackbar(getError(err), { variant: "error" });
      }
    };
    fetchColeciones();
  }, [enqueueSnackbar]);

  const isDesktop = useMediaQuery("(min-width:600px)");

  const [query, setQuery] = useState("");
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}&category=Shop%20All`);
  };
  const sortHandler = (e) => {
    dispatch({ type: "SAVE_CURRENCY", payload: e.target.value });
    jsCookie.set("curre", JSON.stringify(e.target.value));
    setmoneda(e.target.value);
  };
  useEffect(() => {
    curre === "default" ? setmoneda("default") : setmoneda("Usd");
  }, [curre]);
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
  };

  const names = [
    "ALL WOMAN",
    "CHAQUETA METROPOLITANA ICONIC",
    "CHAQUETA CASUAL",
    "CHAQUETA DISTRICT",
    "HOODIES",
    "T-SHIRTS",
  ];
  const coctel = ["CAMISAS", "VESTIDOS"];
  return (
    <>
      <Head>
        <title>{title ? `${title} - kitara` : "kitara"}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box>
          <AppBar position="static" sx={classes.appbar}>
            <Toolbar sx={classes.toolbar}>
              <Box display="flex" gap="1rem">
                <NextLink className="link" href={"/"} passHref>
                  <Link>
                    <Typography
                      align="center"
                      color="black"
                      variant="h1"
                      component="h1"
                    >
                      HOME
                    </Typography>
                  </Link>
                </NextLink>
                <Dropdown>
                  <Dropdown.Toggle
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                      color: "black",
                      "&:hover": { color: "black" },
                    }}
                    variant=""
                    id="dropdown-basic"
                    className=""
                  >
                    Shop
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    style={{ backgroundColor: "white", border: "none" }}
                  >
                    {names.map((category) => (
                      <NextLink
                        key={category}
                        href={`/search?category=${category}`}
                        passHref
                        sx={{}}
                      >
                        <ListItem
                          component="a"
                          onClick={sidebarCloseHandler}
                          sx={{
                            fontWeight: "normal",
                            "&:hover": { color: "black" },
                          }}
                        >
                          <ListItemText primary={category}></ListItemText>
                        </ListItem>
                      </NextLink>
                    ))}
                    <Dropdown className="coleciones2">
                      <Dropdown.Toggle
                        variant=""
                        id="dropdown-basic"
                        className=""
                      >
                        COCTEL
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                        style={{ backgroundColor: "white", border: "none" }}
                      >
                        {coctel.map((colecion) => (
                          <NextLink
                            key={colecion}
                            href={`/search?colecion=${colecion}&category=Shop+All`}
                            passHref
                          >
                            <ListItem
                              sx={{
                                fontWeight: "normal",
                                "&:hover": { color: "black" },
                              }}
                              component="a"
                              onClick={sidebarCloseHandler}
                            >
                              <ListItemText primary={colecion}></ListItemText>
                            </ListItem>
                          </NextLink>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Dropdown.Menu>
                </Dropdown>

                <NextLink className="link" href={"/lab"} passHref>
                  <Link>
                    <Typography color="black" variant="h1" component="h1">
                      THE LAB
                    </Typography>
                  </Link>
                </NextLink>
                <NextLink className="link" href={"/brand"} passHref>
                  <Link>
                    <Typography color="black" variant="h1" component="h1">
                      THE BRAND
                    </Typography>
                  </Link>
                </NextLink>
              </Box>
              <Box>
                {" "}
                <NextLink href="/" passHref>
                  <Image
                    src={logo.src}
                    width="250px"
                    height="60px"
                    sx={{
                      display: "flex",
                    }}
                  />
                </NextLink>
              </Box>
              <Box display="flex" gap="1rem">
                <NextLink className="link" href={"/brand"} passHref>
                  <Link>
                    <Typography color="black" variant="h1" component="h1">
                      2ND CHANCE
                    </Typography>
                  </Link>
                </NextLink>
                <NextLink className="link" href={"/brand"} passHref>
                  <Link>
                    <Typography color="black" variant="h1" component="h1">
                      GUIA DE TALLAS
                    </Typography>
                  </Link>
                </NextLink>
                <NextLink className="link" href={"/login"} passHref>
                  <Link>
                    <Typography color="black" variant="h1" component="h1">
                      LOGIN
                    </Typography>
                  </Link>
                </NextLink>
              </Box>
            </Toolbar>
          </AppBar>

          <Container
            disableGutters={true}
            component="main"
            maxWidth="false"
            sx={classes.main}
          >
            {children}
          </Container>

          <Box component="footer" margin="30px 0" padding="0 30px">
            <Typography
              sx={{ textAlign: "center", margin: "auto" }}
              component="h3"
              fontSize={20}
              width="300px"
            >
              SUSCRIBETE A NUESTRO BOLETIN DE NOTICIAS
            </Typography>
            <Box display="flex" flexDirection="row" marginTop="30px">
              <Box display="flex" flexDirection="column" width="30%">
                <Typography component="h4">@KITARASTUDIO_</Typography>
                <Typography
                  component="a"
                  marginTop={2}
                  className="link-Style-none"
                >
                  Contacto
                </Typography>
                <Typography
                  component="a"
                  marginTop={2}
                  className="link-Style-none"
                >
                  About
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column" width="40%" textAlign="center" paddingX={5}>
              <form style={{marginBottom:"10px"}}>
                <input type="email" className="input-registration" placeholder="Direccion de correo Electronico" style={{fontSize:"14px"}}/>
                <button className="btn btn-dark button-boostrap-modified-borders">
                  SUSCRIBIRSE
                </button>
              </form>
                <Typography component="p" width="80%" margin="auto">
                  Promociones, nuevos productos y ofertas. Directamente a tu
                  bandeja de entrada
                </Typography>
              </Box>
              <Box display="flex" flexDirection="row" width="30%">
                <Box display="flex" flexDirection="column" width="50%">
                  <Typography component="h4">SERVICIOS</Typography>
                  <Typography
                    component="a"
                    marginTop={2}
                    className="link-Style-none"
                  >
                    Detalles del producto
                  </Typography>
                  <Typography
                    component="a"
                    marginTop={2}
                    className="link-Style-none"
                  >
                    Size Guide
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column" width="50%">
                  <Typography component="h4">POLITICAS</Typography>
                  <Typography
                    component="a"
                    marginTop={2}
                    className="link-Style-none"
                  >
                    Termino y Condiciones
                  </Typography>
                  <Typography
                    component="a"
                    marginTop={2}
                    className="link-Style-none"
                  >
                    Privacy Politcy
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
