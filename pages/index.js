import { CircularProgress, Alert, Box } from "@mui/material";
import Layout from "../components/Layout";
import client from "../utils/client";
import { useState, useEffect } from "react";
import Carousel from "../components/Carousel";
import { CarrouselKitaraCards } from "../components/CarrouselKitaraCards";
import Pagina3 from "../components/Pagina3";
// import Favoritos from "../components/Favoritos";
// import ProductosIndex from "../components/ProductosIndex";

// import Categories from "../components/Categories";
// import Influencer from "../components/Influencer";
// import Newsletter from "../components/Newsletter";

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
        // const products = await client.fetch(`*[_type == 'product']`);
        // const images = await client.fetch(`*[_type == 'images']`);
        // setimages(images);
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
          <Pagina3 />
        <Carousel />
        <CarrouselKitaraCards />
        </Box>
      )}
    </Layout>
  );
}
