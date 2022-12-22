import mercadopago from "../../../../utils/mercadoPago";
import nc from "next-connect";
import { isAuth } from "../../../../utils/auth";
import config from "../../../../utils/config";
import axios from "axios";
const handler = nc();
handler.use(isAuth);
handler.post(async (req, res) => {
  console.log("entro")
  const projectId = config.projectId;
  const dataset = config.dataset;
  const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;
  const orderItems = req.body.orderItems.map((item)=>{
    return {
    image:item.image,
    size:item.size,
    quantity:item.quantity,
    price:item.price
  }
})

try {
    const { data } = await axios.post(
      `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
      {
        mutations: [
        {
          create: {
            _type: "order",
            createdAt: new Date().toISOString(),
            ...req.body,
            orderItems,
            userName: req.user.name,
            user: {
              _type: "reference",
              _ref: req.user._id,
            },
            
          },
        },
      ],
    },
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokenWithWriteAccess}`,
      },
    }
    );
    
    let preference = {
    metadata: { id_shop: data.results[0].id },
    items: req.body.orderItems.map((producto) => {
      return {
        title: producto.name,
        unit_price: parseInt(producto.price * 1.15),
        quantity: producto.quantity,
        description: producto.size,
      };
    }),
  };


    const response = await mercadopago.preferences.create(preference);
    console.log(response);
    // {
    //   global: response.body.id,
    // }
    await axios.post(
      `https://${config.projectId}.api.sanity.io/v1/data/mutate/${config.dataset}`,
      {
        mutations: [
          {
            patch: {
              id: data.results[0].id,
              set: {
                data: {
                  global: response.body.id
                },
              },
            },
          },
        ],
      },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${tokenWithWriteAccess}`,
        },
      }
    );
    res.status(201).send(data.results[0].id);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error en la peticion" });
  }
});

export default handler;
