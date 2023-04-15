import {
  Box,
  useMediaQuery,
} from "@mui/material";
import dynamic from "next/dynamic";
import { BsChatLeft } from "react-icons/bs";
import { useContext, useState } from "react";
import { AiOutlineArrowUp,AiOutlineArrowDown } from "react-icons/ai";
import { Store } from "../utils/Store";
// import axios from "axios";
// import { useSnackbar } from "notistack";

import { useRouter } from "next/router";
import LayoutProductos from "../components/LayoutProductos";
import { CardsCarrito } from "../components/CardsCarrito";
import { totalCost } from "../utils/functions/cart";

function CartScreen() {
  const router = useRouter();
  const {
    state: {
      cart: { cartItems },
    }
  } = useContext(Store);
  
  const [Scroll, setScroll] = useState(false);
  const isDesktop = useMediaQuery("(min-width:800px)");
  return (
    <LayoutProductos title="Shopping Cart">
      <Box
        style={{
          marginTop: "120px",
          marginLeft: isDesktop?"80px":0,
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "100px",
          flexDirection: isDesktop?"row":"column",
        }}
      >
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
          <h2
            style={{
              fontSize: "25px",
              letterSpacing: "2px",
              marginBottom: isDesktop?"40px":0,
            }}
          >
            CESTA (#)
          </h2>
          {cartItems.map((item) => (<CardsCarrito product={item}/>))}
        </div>
        <div className="d-flex flex-column" style={{paddingTop:isDesktop?"120px":"70px",flex:1}}>
          {isDesktop?<Box className="d-flex flex-column carrito-position">
            <a className="carrito-arrow bg-white" href="#header" onClick={()=>setScroll(false)}>
              <AiOutlineArrowUp fontSize={25} color={!Scroll?"grey":"black"} />
            </a>
            <a className="carrito-arrow bg-white" href="#footer" onClick={()=>setScroll(true)}>
              <AiOutlineArrowDown fontSize={25} color={Scroll?"grey":"black"}/>
            </a>
          </Box>:null}
          <Box className="d-flex carrito-tarjeta-chat ">
            <button className="carrito-tarjeta-chat-button bg-white">
              <BsChatLeft fontSize={25} style={{ marginRight: "13px" }} />
              CHAT
            </button>
          </Box>

          <Box className="d-flex flex-row carrito-tarjeta-pago flex-wrap">
            <p className="carrito-tarjeta-pago-parrafo">TOTAL</p>
            <div className="d-flex flex-column">
              <p className="carrito-tarjeta-pago-parrafo">{new Intl.NumberFormat().format(totalCost())} COP</p>
              <p className="carrito-tarjeta-pago-parrafo gray">
                * IVA INCLUIDO
              </p>
            </div>
            <button className="carrito-tarjeta-pago-button" onClick={() => {router.push("/shipping")}}>CONTINUAR</button>
          </Box>
        </div>
      </Box>
    </LayoutProductos>
  );
}
export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
