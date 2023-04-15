import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import client from "../utils/client";
import LayoutProductos from "../components/LayoutProductos";
import { CardsKitara } from "../components/cardsKitara";
export default function SearchScreen() {
  const router = useRouter();
  const {
    value = "",
    category = ""
  } = router.query;


  const [productos, setProductos] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      let products = []
      try {
        if(category){
          products = await client.fetch(`*[ _type == "product" && category == $query]`,{query: category});
        }else if(value){
          products = await client.fetch(`*[ _type == "product" && name match $query || description match $query]`,{query: value + "*"});
        }else{
          products = []
        }
        
        setProductos(products);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchProducts();
  }, [value,category]);

  return (
    <LayoutProductos title={`categorias - orderId`}>
        <h1 className="text-center" style={{marginTop:"120px"}}>Se encontraron {productos.length} Resultados de {value} </h1>
        {productos.length === 0?<h2 className="text-center" style={{margin:"200px auto"}}>no se encontro ningun resultado</h2>:null}

        <div style={{maxWidth:"1280px",display:"flex",flexWrap:"wrap",margin:"auto",justifyContent:"space-between",width:"90%"}}>
        {productos.map((product,i)=><CardsKitara iters={i+1} key={i} details={product} noModificable={false}/>)}

          
        </div>
      </LayoutProductos>
  );
}
