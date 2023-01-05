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
import logo from "../utils/Images/icon-match.png";
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
import { Footer } from "./Footer";

export default function LayoutSomos({ title, description, children }) {
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


  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: "USER_LOGOUT" });
    jsCookie.remove("userInfo");
    jsCookie.remove("cartItems");
    jsCookie.remove("shippingAddress");
    jsCookie.remove("paymentMethod");
    router.push("/");
  };


  const isDesktop = useMediaQuery("(min-width:600px)");


  const [query, setQuery] = useState("");
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
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
              <IconButton
                size="large"
                edge="start"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setDrawer(true)}
                className="logo-navbar"
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{position:"relative",top:"40px"}}>
                <NextLink href="/" passHref>
                  <Image src={logo.src} width="250px" height="80px" />
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
                  onKeyPress={(e) =>{
                    if(e.key === 'Enter'){
                      router.push(`/search?value=${query}`);
                      setQuery("")
                    }
                  }}
                  style={{ paddingBottom: "23px" }}
                />
               {!userInfo &&  <NextLink className="link" href={"/login"} passHref>
                  <Link style={{ alignSelf: "center",fontSize:"24px",marginLeft:"20px" }}>LOG IN</Link>
                </NextLink>
                }
                <IconButton edge="start" onClick={()=>router.push(`/cart`)}>
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
