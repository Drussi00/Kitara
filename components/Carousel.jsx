import { Button } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";

import Carousel from "react-bootstrap/Carousel";
import { urlFor } from "../utils/image";
import carouselF from "../utils/Images/carrousel/foto1.png";
import circular from "../utils/Images/carrousel/logoCircular.png";
function carousel() {
  return (
    <Carousel controls={false}>
      <Carousel.Item interval={2000}>
        <div
          style={{
            position: "relative",
          }}
        >
          <img
            position="absolute"
            className="d-block  imagec"
            src={carouselF.src}
            alt="First slide"
          />
          <img
            height="120px"
            width="120px"
            style={{
              right: "4%",
              bottom: "6%",
              zIndex: "100%",
              position: "absolute",
            }}
            className=""
            src={circular.src}
            alt="Logo Circular"
          />

          <Button
            sx={{
              left: "10%",
              bottom: "10%",
              zIndex: "100%",
              position: "absolute",
              backgroundColor: "transparent",
              border: "2px solid black ",
              borderRadius: "0",
              p: "15px 40px",
              color: "black",
            }}
          >
            SHOP COLLECTION
          </Button>
        </div>
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <div
          style={{
            position: "relative",
          }}
        >
          <img
            position="absolute"
            className="d-block  imagec"
            src={carouselF.src}
            alt="First slide"
          />
          <img
            height="120px"
            width="120px"
            style={{
              right: "4%",
              bottom: "6%",
              zIndex: "100%",
              position: "absolute",
            }}
            className=""
            src={circular.src}
            alt="Logo Circular"
          />

          <Button
            sx={{
              left: "10%",
              bottom: "10%",
              zIndex: "100%",
              position: "absolute",
              backgroundColor: "transparent",
              border: "2px solid black ",
              borderRadius: "0",
              p: "15px 40px",
              color: "black",
            }}
          >
            SHOP COLLECTION
          </Button>
        </div>
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <div
          style={{
            position: "relative",
          }}
        >
          <img
            position="absolute"
            className="d-block  imagec"
            src={carouselF.src}
            alt="First slide"
          />
          <img
            height="120px"
            width="120px"
            style={{
              right: "4%",
              bottom: "6%",
              zIndex: "100%",
              position: "absolute",
            }}
            className=""
            src={circular.src}
            alt="Logo Circular"
          />

          <Button
            sx={{
              left: "10%",
              bottom: "10%",
              zIndex: "100%",
              position: "absolute",
              backgroundColor: "transparent",
              border: "2px solid black ",
              borderRadius: "0",
              p: "15px 40px",
              color: "black",
            }}
          >
            SHOP COLLECTION
          </Button>
        </div>
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default carousel;
