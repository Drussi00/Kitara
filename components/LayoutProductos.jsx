import { useContext, useEffect, useState } from "react";
import { createTheme } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import { SlBag } from "react-icons/sl";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import IconButton from "@mui/material/IconButton";
import logo from "../utils/Images/logo.png";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  ThemeProvider,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import Head from "next/head";
import NextLink from "next/link";
import classes from "../utils/classes";
import { Store } from "../utils/Store";
import jsCookie from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import { useSnackbar } from "notistack";
import { getError } from "../utils/error";
import Image from "next/image";
import { Footer } from "./Footer";

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

  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart,
    userInfo,
    currency: { curre },
  } = state;
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
    jsCookie.set("cartItems",JSON.stringify([]));
    jsCookie.remove("shippingAddress");
    jsCookie.remove("paymentMethod");
    router.push("/");
  };



  const { enqueueSnackbar } = useSnackbar();

  const isDesktop = useMediaQuery("(min-width:600px)");

  const [query, setQuery] = useState("");
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}&category=Shop%20All`);
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
          <AppBar position="static" sx={classes.appbar} id="header">
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
                  name="search"
                  onChange={queryChangeHandler}
                  value={query}
                  style={{ paddingBottom: "23px" }}
                />
               {!userInfo &&  <NextLink className="link" href={"/login"} passHref>
                  <Link style={{ alignSelf: "center",fontSize:"24px",marginLeft:"20px" }}>LOG IN</Link>
                </NextLink>
                }
                <IconButton edge="start">
                  <SlBag
                    fontSize="36px"
                    color="black"
                    style={{ marginBottom: "5px" }}
                  />
                  <p style={{position:"absolute",top:"22px",fontSize:"19px",color:"black"}}>{cart.cartItems.length}</p>
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

          <Footer />
        </Box>
      </ThemeProvider>
    </>
  );
}
