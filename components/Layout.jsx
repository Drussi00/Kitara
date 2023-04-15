import { createTheme } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import logo from "../utils/Images/logo.png";
import {
  AppBar,
  Box,
  Collapse,
  Container,
  CssBaseline,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ThemeProvider,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

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
import Image from "next/image";
import { Footer } from "./Footer";

////////////////////////////////////////////////////////////////
export default function Layout({ title, description, children }) {
  const [moneda, setmoneda] = useState("default");
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const [location, setLocation] = useState(false);
  const {
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
  const [collapse, setCollapse] = useState(false);
  const [coctelList, setCoctel] = useState(false);
  const [drawer, setDrawer] = useState(false);
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

  const isDesktop = useMediaQuery("(min-width:800px)");

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
    {names:"ALL WOMAN",link:"woman"},
    {names:"CHAQUETA METROPOLITANA ICONIC",link:"metropolitana"},
    {names:"CHAQUETA CASUAL",link:"casual"},
    {names:"CHAQUETA DISTRICT",link:"district"},
    {names:"HOODIES",link:"hoodies"},
    {names:"T-SHIRTS",link:"t-shirts"}
  ];
  const coctel = [{names:"CAMISAS",link:"camisas"}, {names:"VESTIDOS",link:"vestidos"}];
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
                      sx={{ display: isDesktop ? "" : "none" }}
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
                      display: isDesktop ? "flex" : "none",
                      alignItems:"center",
                    }}
                    variant=""
                    id="dropdown-basic"
                    className=""
                  >
                    SHOP
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    style={{ backgroundColor: "white", border: "none" }}
                  >
                    {names.map((category) => (
                      <NextLink
                        key={category.names}
                        href={`/search?category=${category.link}`}
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
                          <ListItemText primary={category.names}></ListItemText>
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
                            key={colecion.names}
                            href={`/search?category=${colecion.link}`}
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
                              <ListItemText primary={colecion.names}></ListItemText>
                            </ListItem>
                          </NextLink>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Dropdown.Menu>
                </Dropdown>

                <NextLink className="link" href={"/lab"} passHref>
                  <Link sx={{ display: isDesktop ? "" : "none" }}>
                    <Typography color="black" variant="h1" component="h1">
                      THE LAB
                    </Typography>
                  </Link>
                </NextLink>
                <NextLink className="link" href={"/quienes-somos"} passHref>
                  <Link sx={{ display: isDesktop ? "" : "none" }}>
                    <Typography color="black" variant="h1" component="h1">
                      THE BRAND
                    </Typography>
                  </Link>
                </NextLink>
              </Box>
              <IconButton
                color="default"
                aria-label="open drawer"
                edge="start"
                onClick={()=>setDrawer(!drawer)}
                sx={{ mr: 2, position: "absolute",left:"30px",display: isDesktop ? "none" : "block" }}
              >
                <MenuIcon color="black" />
              </IconButton>
              <Box margin="auto">
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
              <Box gap="1rem" sx={{ display: isDesktop ? "flex" : "none" }}>
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
          <Drawer
            sx={{minWidth:300,backgroundColor:"rgb(241, 236, 236)"}}
            variant="persistent"
            anchor="left"
            open={drawer}
          >
             <IconButton
                color="default"
                aria-label="open drawer"
                edge="start"
                onClick={()=>setDrawer(!drawer)}
                sx={{ mr: 2, position: "absolute",left:"30px",top:"15px" }}
              >
                <MenuIcon color="black" />
              </IconButton>
              <Box sx={{width:"300px",display:"flex",flexDirection:"column",marginTop:"50px"}}>
              <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={"HOME"} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>setCollapse(!collapse)}>
                      <ListItemText primary={"SHOP"} />
                      {collapse ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    </ListItemButton>
                  </ListItem>
                  <Collapse component="li" in={collapse} timeout="auto" unmountOnExit >
                    
                    <List disablePadding>
                    {names.map((category) => (
                      <NextLink
                        key={category.names}
                        href={`/search?category=${category.link}`}
                        passHref
                        sx={{}}
                      >
                        <ListItem  sx={{paddingLeft:"30px"}}>
                          <ListItemButton>
                            <ListItemText primary={category.names} />
                          </ListItemButton>
                        </ListItem>
                      </NextLink>
                    ))}
                    </List>
                  </Collapse>
                  <ListItem  disablePadding>
                    <ListItemButton>
                    <NextLink className="link" href={"/lab"} passHref>
                      <ListItemText primary={"THE LAB"}  />
                    </NextLink>
                    </ListItemButton>
                  </ListItem>
                  <ListItem  disablePadding>
                    <ListItemButton>
                    <NextLink className="link" href={"/quienes-somos"} passHref>
                      <ListItemText primary={"THE BRAND"} />
                      </NextLink>
                    </ListItemButton>
                  </ListItem>
                  <ListItem  disablePadding>
                    <ListItemButton>
                      <ListItemText primary={"2ND CHANCE"} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem  disablePadding>
                    <ListItemButton>
                      <ListItemText primary={"GUIA DE TALLAS"} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={"LOGIN"} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>setCoctel(!coctelList)}>
                      <ListItemText primary={"COCTEL"} />
                      {coctelList ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    </ListItemButton>
                  </ListItem>
                  <Collapse component="li" in={coctelList} timeout="auto" unmountOnExit >
                    <List disablePadding>
                    {coctel.map((category) => (
                      <NextLink
                        key={category.names}
                        href={`/search?category=${category.link}`}
                        passHref
                        sx={{}}
                      >
                        <ListItem  sx={{paddingLeft:"30px"}}>
                          <ListItemButton>
                            <ListItemText primary={category.names} />
                          </ListItemButton>
                        </ListItem>
                      </NextLink>
                    ))}
                      </List>
                  </Collapse>
              </List>
              </Box>
              
          </Drawer>
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
