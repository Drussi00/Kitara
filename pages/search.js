import "bootstrap/dist/css/bootstrap.min.css";
import {
  Alert,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  Grid,
  MenuItem,
  Select,
  Typography,
  Pagination,
  useMediaQuery,
  Link,
} from "@mui/material";
import NextLink from "next/link";
import { Box } from "@mui/system";
import axios from "axios";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import classes from "../utils/classes";
import client from "../utils/client";
import { urlForThumbnail } from "../utils/image";
import { Store } from "../utils/Store";
import FavoritosCard from "../components/FavoritosCard";
import LayoutProductos from "../components/LayoutProductos";
import { CardsKitara } from "../components/cardsKitara";
export default function SearchScreen() {
  const isDesktop = useMediaQuery("(min-width:600px)");
  const [pageSize, setpageSize] = useState(0);

  useEffect(() => {
    setpageSize(isDesktop ? 9 : 3);
  }, [isDesktop]);

  const router = useRouter();
  const {
    value = ""
  } = router.query;
  const [state, setState] = useState({
    categories: [],
    products: [],
    error: "",
    loading: true,
    productsView: [],
    productsLengt: 0,
  });
  const [title, settitle] = useState("shop all");

  const [productos, setProductos] = useState([]);
  const [pageU, setpage] = useState(1);
  useEffect(() => {
    settitle(value);
    const fetchProducts = async () => {
      try {
        const products = await client.fetch(`*[ _type == "product" && name match $query || description match $query]`,
        {query: value + "*"});
        console.log(products);
        setProductos(products);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchProducts();
  }, [value]);

  const filterSearch = ({
    category,
    sort,
    searchQuery,
    price,
    rating,
    colecion,
  }) => {
    const path = router.pathname;
    const { query } = router;
    if (searchQuery) query.searchQuery = searchQuery;
    if (category) query.category = category;
    if (sort) query.sort = sort;
    if (price) query.price = price;
    if (rating) query.rating = rating;
    if (colecion) query.colecion = colecion;
    router.push({
      pathname: path,
      query: query,
    });
  };
  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
    settitle(e.target.value);
  };
  // const colecionHandler = (e) => {
  //   filterSearch({ colecion: e.target.value });
  // };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };

  const {
    state: { cart },
    dispatch,
  } = useContext(Store);

  const { enqueueSnackbar } = useSnackbar();
  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      enqueueSnackbar("Sorry. Product is out of stock", { variant: "error" });
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        _key: product._id,
        name: product.name,
        countInStock: product.countInStock,
        slug: product.slug.current,
        price: product.price,
        image: urlForThumbnail(product.image),
        quantity,
      },
    });
    enqueueSnackbar(`${product.name} added to the cart`, {
      variant: "success",
    });
    router.push("/cart");
  };
  const handlePageChange = (e, page) => {
    setpage(page);
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setState({
      productsView: products.slice(from, to),
      loading: false,
      products,
      productsLengt,
    });
  };

  return (
    <LayoutProductos title={`categorias - orderId`}>
        <h1 className="text-center" style={{marginTop:"120px"}}>Se encontraron {productos.length} Resultados de {value} </h1>
        {productos.length === 0?<h2 className="text-center" style={{margin:"200px auto"}}>no se encontro ningun resultado</h2>:null}

        <div style={{maxWidth:"1280px",display:"flex",flexWrap:"wrap",margin:"auto",justifyContent:"space-between",width:"90%"}}>
        {productos.map((product,i)=><CardsKitara iters={i+1} key={i} details={product} noModificable={false}/>)}

          
        </div>
      </LayoutProductos>
  );
}
