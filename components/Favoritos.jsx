import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";

import FavoritosCard from "./FavoritosCard";
export default function Favoritos({ favorito }) {
  const mobileArr = favorito.slice(0, 1);
  const isDesktop = useMediaQuery("(min-width:600px)");

  useEffect(() => {}, [isDesktop]);
  return (
    <Box>
      <Typography
        sx={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center" }}
        variant="h1"
        component="h1"
      >
        Our Favorites
      </Typography>
      <Grid
        width="65%"
        paddingTop={5}
        container
        spacing={1}
        alignItems="center"
        justifyconten="center"
        margin="auto"
      >
        {isDesktop
          ? favorito.map((fav) => {
              return (
                <Grid item md={3} xs={12} key={fav._key}>
                  <FavoritosCard product={fav} />
                </Grid>
              );
            })
          : mobileArr.map((fav) => {
              return (
                <Grid item md={3} xs={12} key={fav.key}>
                  <FavoritosCard product={fav} />
                </Grid>
              );
            })}
      </Grid>
    </Box>
  );
}
