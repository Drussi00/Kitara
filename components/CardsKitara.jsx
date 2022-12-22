import React from "react";
import { urlFor } from "../utils/image";
import { useRouter } from "next/router";

export const CardsKitara = ({
  iters = 0,
  noModificable = true,
  details = {},
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`product/${details.slug.current}`);
  };
  return (
    <div
      onClick={handleClick}
      className={`card-kitara mt-4 ${noModificable ? false : "noMargin"}`}
      style={{
        width: noModificable
          ? "248px"
          : [6, 8, 10].includes(iters)
          ? "25%"
          : iters % (4 + parseInt(iters / 9) * 9) === 0
          ? "30%"
          : iters % (2 + parseInt(iters / 9) * 9) === 0
          ? "30%"
          : iters % (9 + parseInt((iters - 1) / 9) * 9) === 0
          ? "30%"
          : "25%",
      }}
    >
      <div className="card-kitara-container-img">
        <img
          src={urlFor(details.image[0])}
          className="card-kitara-img img-1"
          alt="img-product"
        />
        {details.image.lenght > 1 ? (
          <img
            src={urlFor(details.image[1])}
            className="card-kitara-img img-2"
            alt="img-product"
          />
        ) : (
          <img
            src={urlFor(details.image[0])}
            className="card-kitara-img img-2"
            alt="img-product"
          />
        )}
      </div>
      <h3 className="card-kitara-title">{details.name}</h3>
      <p className="card-kitara-parrafo">
        ${new Intl.NumberFormat().format(details.price)}
      </p>
    </div>
  );
};
