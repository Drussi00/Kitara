import { CircularProgress, Alert, Box, Typography } from "@mui/material";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import Carousel from "../components/Carousel";
import { CarrouselKitaraCards } from "../components/CarrouselKitaraCards";
import Pagina3 from "../components/Pagina3";
import client from "../utils/client";

export default function Home() {
  const [state, setState] = useState({
    products: [],
    error: "",
    loading: true,
  });
  // // const [, setimages] = useState({ images: [] });
  const { loading, error, products } = state;
  // const favorito = products.filter((product) => product.favorito === "si");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await client.fetch(`*[_type == 'product']`);
        console.log(products)
        setState({ products, loading: false });
      } catch (error) {
        setState({ loading: false, error: error.message });
      }
    };
    fetchData();
  }, []);
  // const filteredT = products.filter(
  //   (product) => product.category === "T-Shirt"
  // );
  // const filteredH = products.filter(
  //   (product) => product.category === "Hoodies"
  // );
  // const filteredC = products.filter((product) => product.category === "Cargo");
  // const filteredS = products.filter((product) => product.category === "Shorts");

  return (
    <Layout>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Box>
          <Carousel />
          <Typography component="h3" textAlign="center" className="my-5">
          AUTHENTICITY DOES NOT EQUAL DIFFERENT. AUTHENTICITY IS REALNESS, GENUINENESS AND ACTUALITY
          </Typography>

          <video autoplay="autoplay" loop="loop" muted defaultMuted playsinline  oncontextmenu="return false;"  preload="auto"  id="miVideo" width="100%" className="mb-5" controls>
          <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4">
          </source>
          </video>


          <Pagina3 />
          <Typography component="h3" textAlign="center" sx={{margin:"80px 0 40px"}} fontSize={40}>
          FORMAS DE USAR TU KITARA
          </Typography>
        <CarrouselKitaraCards products={state.products}/>
        </Box>
      )}
    </Layout>
  );
}
