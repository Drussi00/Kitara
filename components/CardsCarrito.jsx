import React, { useContext } from 'react'
import { Store } from "../utils/Store";
export const CardsCarrito = ({product}) => {
  const { dispatch } = useContext(Store);


  const cartModificate = (modified) => {

    if(modified === "add") {
      dispatch({
        type: "CART_AUMENTAR_ITEM",
        payload: {
          id: product._key,
          size:product.size
        },
      });
    }

    if(modified === "remove") {
      dispatch({
        type: "CART_DISMINUIR_ITEM",
        payload: {
          id: product._key
        },
      });
    }

  };

  const removeItemHanlder = () => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: {_key:product._key} });
  };

  return (
    <div className="card-carrito">
          <h3 className="card-carrito__title">{product.name}</h3>
          <div className="d-flex flex-row">
            <div className="w-50">
              <img src={product.image} className="card-carrito__img"/>
            </div>
            <div className="d-flex flex-column justify-content-between w-50 ps-4">
              <div className="d-flex flex-column">
                <p className="card-carrito__parrafo">COLOR : MAGENTA</p>
                <p className="card-carrito__parrafo mb-1">TALLA : {product.size}</p>
                <div  className="d-flex flex-row">
                  <button className="card-carrito__parrafo border border-0 bg-white me-3 u-pointer" onClick={()=>cartModificate("add")}>+</button>
                  <p className="card-carrito__parrafo mt-3">{product.quantity}</p>
                  <button className="card-carrito__parrafo border border-0 bg-white ms-3 u-pointer" onClick={()=>cartModificate("remove")}>-</button>
                </div>
              </div>
              <div className="d-flex flex-column">
              <p className="card-carrito__parrafo">{new Intl.NumberFormat().format(product.price)} COP</p>
              <button className="card-carrito__parrafo bg-white" style={{width:"118px"}} onClick={removeItemHanlder}> ELIMINAR </button>
              </div>
            </div>
          </div>
        </div>
  )
}
