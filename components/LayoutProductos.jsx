import { createTheme } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import Dropdown from "react-bootstrap/Dropdown";
import CardGiftcardSharpIcon from "@mui/icons-material/CardGiftcardSharp";
import { SlBag } from "react-icons/sl";
import CloseIcon from "@mui/icons-material/Close";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import IconButton from "@mui/material/IconButton";
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
  InputBase,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  TextField,
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

export default function LayoutProductos({ title, description, children }) {
  const [drawer, setDrawer] = useState(false);
  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setDrawer(false)}
      onKeyDown={() => setDrawer(false)}
    >
      <IconButton
        size="large"
        edge="start"
        aria-label="menu"
        sx={{ ml: 1 }}
        onClick={() => setDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <List>
        {[
          { name: "ALL WOMAN", url: "" },
          { name: "NEW ARRIVALS", url: "" },
          { name: "CHAQUETA METROPOLITANA ICONIC", url: "" },
          { name: "CHAQUETA CASUAL", url: "" },
          { name: "CHAQUETA DISTRICT", url: "" },
          { name: "HOODIES", url: "" },
          { name: "T-SHIRTS", url: "" },
          { name: "COCTEL", url: "" },
        ].map((text, index) => (
          <ListItem key={text.name} disablePadding>
            <ListItemButton>
              <ListItemText primary={text.name} className="fontWeight-400" />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List sx={{ marginTop: "15px" }}>
        {[
          { name: "THE LAB", url: "" },
          { name: "THE BRAND", url: "" },
          { name: "2ND CHANCE", url: "" },
        ].map((text, index) => (
          <ListItem key={text.name} disablePadding>
            <ListItemButton>
              <ListItemText primary={text.name} className="fontWeight-400" />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List sx={{ marginTop: "15px" }}>
        {[
          { name: "+INFO", url: "" },
          { name: "CONTACTANOS", url: "" },
        ].map((text, index) => (
          <ListItem key={text.name} disablePadding>
            <ListItemButton>
              <ListItemText primary={text.name} className="fontWeight-400" />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

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

  return (
    <>
      <Head>
        <title>{title ? `${title} - kitara` : "kitara"}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box>
          <SwipeableDrawer
            anchor={"left"}
            open={drawer}
            onClose={() => setDrawer(false)}
            onOpen={() => setDrawer(true)}
          >
            {list()}
          </SwipeableDrawer>
          <AppBar position="static" sx={classes.appbar}>
            <Toolbar sx={classes.toolbar}>
              <Box display="flex">
                <IconButton
                  size="large"
                  edge="start"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={() => setDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
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
                <TextField
                  id="standard-search"
                  label="BUSCAR"
                  variant="standard"
                  style={{ paddingBottom: "23px" }}
                />
                <NextLink className="link" href={"/login"} passHref>
                  <Link style={{ alignSelf: "center" }}>LOG IN</Link>
                </NextLink>
                <IconButton edge="start">
                  <SlBag
                    fontSize="24px"
                    color="black"
                    style={{ marginBottom: "3px" }}
                  />
                </IconButton>
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
              <Box
                display="flex"
                flexDirection="column"
                width="40%"
                textAlign="center"
                paddingX={5}
              >
                <form style={{ marginBottom: "10px" }}>
                  <input
                    type="email"
                    className="input-registration"
                    placeholder="Direccion de correo Electronico"
                    style={{ fontSize: "14px" }}
                  />
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
