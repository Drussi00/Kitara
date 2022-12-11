import "bootstrap/dist/css/bootstrap.min.css";

import Carousel from "react-bootstrap/Carousel";

import { urlFor } from "../utils/image";

function carousel({ images }) {
  return (
    <Carousel controls={false}>
      <Carousel.Item interval={2000}>
        <img
          className="d-block  imagec"
          src={urlFor(images[0].image[0])}
          alt="First slide"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block imagec  "
          src={urlFor(images[1].image[0])}
          alt="Second slide"
        />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block imagec"
          src={urlFor(images[2].image[0])}
          alt="Third slide"
        />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block imagec "
          src={urlFor(images[3].image[0])}
          alt="Third slide"
        />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default carousel;
