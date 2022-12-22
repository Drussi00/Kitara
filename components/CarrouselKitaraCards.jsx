import { CardsKitara } from "./cardsKitara";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState } from "react";
import { useEffect } from "react";

export const CarrouselKitaraCards = ({products}) => { 
  const [Width, setWidth] = useState(window.innerWidth);
  const settings = {
    dots: false,
    infinite: true,
    speed: 350,
    slidesToShow:
    Width > 1348
    ? 5
    : Width > 1200
    ? 4
    : Width > 945
    ? 3
    : Width > 630
    ? 2
    : 1,
    slidesToScroll: 1,
    rows:1
  };

  const cambiarTamaño = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", cambiarTamaño);
    return () => {
      window.removeEventListener("resize", cambiarTamaño);
    };
  });

  return (
    <>
    <div style={{width:Width>630?"90%":"73%",margin:"auto"}}>
      <Slider {...settings} adaptiveHeight={true} centerPadding="90px">
        {products.map((product)=><CardsKitara details={product}/>)}
      </Slider>
    </div>
    </>
  );
};
