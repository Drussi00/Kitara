import React, { useEffect, useCallback} from 'react';

const FORM_ID = 'payment-form';

export default function Product( {id }) {
  const obtenerpreference = useCallback(
    async() => {

            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src ='https://www.mercadopago.com.co/integrations/v1/web-payment-checkout.js';
            script.setAttribute('data-preference-id', id);
            const form = document.getElementById(FORM_ID);
            form.appendChild(script);
          
    }, [id],
  )
  useEffect( ()=>{
    obtenerpreference()
   },[obtenerpreference])

 
  return (
    <form id={FORM_ID} method="GET" />
  );
}