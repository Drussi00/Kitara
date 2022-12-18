import React from 'react'
import ImgKitara1 from "../utils/Images/fotoPrueba.jpg";
export const CardsCarrito = () => {
  return (
    <div className="card-carrito">
          <h3 className="card-carrito__title">CHAQUETA DISTRICT</h3>
          <div className="d-flex flex-row">
            <div className="w-50">
              <img src={ImgKitara1.src} className="card-carrito__img"/>
            </div>
            <div className="d-flex flex-column justify-content-between w-50 ps-4">
              <div className="d-flex flex-column">
                <p className="card-carrito__parrafo">COLOR : MAGENTA</p>
                <p className="card-carrito__parrafo mb-1">TALLA : S</p>
                <div  className="d-flex flex-row">
                  <button className="card-carrito__parrafo border border-0 bg-white me-3">+</button>
                  <p className="card-carrito__parrafo mt-3">1</p>
                  <button className="card-carrito__parrafo border border-0 bg-white ms-3">-</button>
                </div>
              </div>
              <div className="d-flex flex-column">
              <p className="card-carrito__parrafo">200.000 COP</p>
              <button className="card-carrito__parrafo bg-white" style={{width:"118px"}}> ELIMINAR </button>
              </div>
            </div>
          </div>
        </div>
  )
}
