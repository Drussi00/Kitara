import React, { useContext } from "react";
import NextLink from "next/link";
import {
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { urlForThumbnail } from "../utils/image";

import classes from "../utils/classes";
import { Store } from "../utils/Store";

const ProductItem = ({ product }) => {
  const { state } = useContext(Store);
  const { currency } = state;

  return (
    <div sx={classes.card}>
      <NextLink href={`/product/${product.slug.current}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            image={urlForThumbnail(product.image && product.image[0])}
            title={product.name}
            sx={{ backgroundColor: "#F3F3F3" }}
          ></CardMedia>
        </CardActionArea>
      </NextLink>
      <CardContent sx={{ backgroundColor: "black" }}>
        <Typography
          component="h5"
          variant="h5"
          align="center"
          sx={{ color: "white" }}
          className="bottomH1"
        >
          {product.name}
        </Typography>{" "}
        <Typography align="center" sx={classes.typo}>
          {currency.curre === "default"
            ? "$" + new Intl.NumberFormat().format(parseInt(product.price))
            : new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
              }).format(parseInt(product.priceusd))}
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </div>
  );
};

export default ProductItem;
