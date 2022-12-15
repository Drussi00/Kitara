import { useEffect, useState } from "react";
import ImgKitara1 from "../utils/Images/fotoPrueba.jpg";
import ImgKitara2 from "../utils/Images/fotoPrueba2.jpg";

export const CardsKitara = ({iters=0,noModificable=true}) => {

  console.log(iters,iters%(2 + (parseInt(iters/9)*9)) === 0,iters%(2 + (parseInt(iters/9)*9)),(2 + (parseInt(iters/9)*9)),[6,8,10].includes(iters))
  return (
    <div className={`card-kitara mt-4 ${noModificable?false:"noMargin"}`} style={{width:noModificable?"248px":[6,8,10].includes(iters)?"25%":iters%(4 + (parseInt(iters/9)*9)) === 0 ?"30%":iters%(2 + (parseInt(iters/9)*9)) === 0?"30%":iters%(9 + (parseInt((iters-1)/9)*9)) === 0?"30%":"25%"}}>
      <div className="card-kitara-container-img">
      <img  src={ImgKitara1.src} className='card-kitara-img img-1' alt='img-product' />
      <img  src={ImgKitara2.src} className='card-kitara-img img-2' alt='img-product-hover' />
      </div>
      <h3 className='card-kitara-title'>
      Metropolitan Iconic
      </h3>
      <p className='card-kitara-parrafo'>
    ${ new Intl.NumberFormat().format(parseInt(200000))}
      </p>
    </div>
  )
}
