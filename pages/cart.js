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
import { BsChatLeft } from "react-icons/bs";
import { useContext, useState } from "react";
import { AiOutlineArrowUp,AiOutlineArrowDown } from "react-icons/ai";
import { Store } from "../utils/Store";
// import axios from "axios";
// import { useSnackbar } from "notistack";

import { useRouter } from "next/router";
import LayoutProductos from "../components/LayoutProductos";
import { CardsCarrito } from "../components/CardsCarrito";

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
  const [Scroll, setScroll] = useState(false)
  const isDesktop = useMediaQuery("(min-width:600px)");
  return (
    <LayoutProductos title="Shopping Cart">
      <Box
        style={{
          marginTop: "120px",
          marginLeft: "80px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "25px",
              letterSpacing: "2px",
              marginBottom: "90px",
            }}
          >
            CESTA (#)
          </h2>
          <CardsCarrito />
          <CardsCarrito />
          <CardsCarrito />
          <CardsCarrito />
          <CardsCarrito />
          <CardsCarrito />
        </div>
        <div className="d-flex flex-column" style={{paddingTop:"120px",flex:1}}>
          <Box className="d-flex flex-column carrito-position">
            <a className="carrito-arrow bg-white" href="#header" onClick={()=>setScroll(false)}>
              <AiOutlineArrowUp fontSize={25} color={!Scroll?"grey":"black"} />
            </a>
            <a className="carrito-arrow bg-white" href="#footer" onClick={()=>setScroll(true)}>
              <AiOutlineArrowDown fontSize={25} color={Scroll?"grey":"black"}/>
            </a>
          </Box>
          <Box className="d-flex carrito-tarjeta-chat ">
            <button className="carrito-tarjeta-chat-button bg-white">
              <BsChatLeft fontSize={25} style={{ marginRight: "13px" }} />
              CHAT
            </button>
          </Box>

          <Box className="d-flex flex-row carrito-tarjeta-pago">
            <p className="carrito-tarjeta-pago-parrafo">TOTAL</p>
            <div className="d-flex flex-column">
              <p className="carrito-tarjeta-pago-parrafo">439.700 COP</p>
              <p className="carrito-tarjeta-pago-parrafo gray">
                * IVA INCLUIDO
              </p>
            </div>
            <button className="carrito-tarjeta-pago-button">CONTINUAR</button>
          </Box>
        </div>
      </Box>
    </LayoutProductos>
  );
}
export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
