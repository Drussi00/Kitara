import React from "react";
import NextLink from "next/link";
import {
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { urlForThumbnail } from "../utils/image";

import classes from "../utils/classes";

const productItem = ({ product }) => {
  return (
    <Box raised={true} sx={classes.card}>
      <NextLink href={`/product/${product.slug.current}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            image={urlForThumbnail(product.image && product.image[0])}
            title={product.name}
            sx={{ backgroundColor: "#F3F3F3", borderRadius: "20px" }}
          ></CardMedia>
        </CardActionArea>
      </NextLink>
      <CardContent>
        <Typography
          component="h5"
          variant="h5"
          align="center"
          sx={{ fontFamily: " coolvetica, sans-serif" }}
        >
          {product.name}
        </Typography>{" "}
        <Typography align="center" sx={classes.typo}>
          ${new Intl.NumberFormat().format(parseInt(product.price))}
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </Box>
  );
};

export default productItem;
