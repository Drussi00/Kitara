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
  import React, { useContext, useReducer, useState } from "react";
  import Layout from "../../components/Layout";
  import { useEffect } from "react";
  import axios from "axios";
  import { useRouter } from "next/router";
import { CardsKitara } from "../../components/cardsKitara";
import LayoutProductos from "../../components/LayoutProductos";
import client from "../../utils/client";
  
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
     const { id } = params; 
     const [productos, setProductos] = useState([]);
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const products = await client.fetch(`*[ _type == "product" && category match $query]`,
          {query: id});
          console.log(products);
          setProductos(products);
        } catch (err) {
          console.log(err.message);
        }
      };
      fetchProducts();
    }, [id]);
    // const [{ order }, dispatch] = useReducer(reducer, {
    //   loading: true,
    //   order: {},
    //   error: "",
    // });
  
    // const {
    //   shippingAddress,
    //   paymentMethod,
    //   orderItems,
    //   itemsPrice,
    //   taxPrice,
    //   shippingPrice,
    //   totalPrice,
    //   isPaid,
    //   paidAt,
    //   isDelivered,
    //   deliveredAt,
    //   data,
    // } = order;
    // const router = useRouter();
    // const { state } = useContext(Store);
    // const { userInfo } = state;
  
    // useEffect(() => {
    //   if (!userInfo) {
    //     return router.push("/login");
    //   }
  
    //   const fetchOrder = async () => {
    //     try {
    //       dispatch({ type: "FETCH_REQUEST" });
    //       const { data } = await axios.get(`/api/orders/PayPal/${orderId}`, {
    //         headers: { authorization: `Bearer ${userInfo.token}` },
    //       });
  
    //       dispatch({ type: "FETCH_SUCCESS", payload: data });
    //     } catch (err) {
    //       dispatch({ type: "FETCH_FAIL", payload: err });
    //     }
    //   };
    //   fetchOrder();
    // }, []);
  
    return (
      <LayoutProductos title={`categorias - orderId`}>
     <h1 className="text-center" style={{marginTop:"120px",textTransform:"uppercase"}}>{id} </h1>
        {productos.length === 0?<h2 className="text-center" style={{margin:"200px auto"}}>no hay productos para esta categoria</h2>:null}

        <div style={{maxWidth:"1280px",display:"flex",flexWrap:"wrap",margin:"auto",justifyContent:"space-between",width:"90%"}}>
          {
            productos.map((producto,i)=><CardsKitara iters={i+1} key={i} noModificable={false} details={producto}/>)
          }
          
        </div>
      </LayoutProductos>
    );
  }
  export function getServerSideProps({ params }) {
    return { props: { params } };
  }
  
  export default dynamic(() => Promise.resolve(OrderScreen), { ssr: false });
  