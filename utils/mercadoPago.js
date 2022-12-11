import mercadopago from "mercadopago";
// Crea un objeto de preferencia

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

export default mercadopago;