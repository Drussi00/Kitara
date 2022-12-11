import nc from "next-connect";
import transporter from "../../../utils/nodemailer";
import client from "../../../utils/client";
import axios from "axios";
import config from "../../../utils/config";
const handler = nc();
handler.post(async (req, res) => {
  const {
    type,
    data: { id },
  } = req.body;
  const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;

  try {
    if (id !== "123456789") {
      const compra = await axios.get(
        `https://api.mercadopago.com/v1/payments/${id}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
          },
        }
      );

      const order = await client.fetch(
        `*[_type == "order" && _id == $id_shop]`,
        {
          id_shop: compra.data.metadata.id_shop,
        }
      );
      const user = await client.fetch(`*[_type == "user" && _id == $id_user]`, {
        id_user: order[0]?.user._ref,
      });
      if (
        order &&
        type === "payment" &&
        compra.data.status === "approved" &&
        compra.data.status_detail === "accredited"
      ) {
        console.log(order[0]?.isPaid);

        await axios.post(
          `https://${config.projectId}.api.sanity.io/v1/data/mutate/${config.dataset}`,
          {
            mutations: [
              {
                patch: {
                  id: compra.data.metadata.id_shop,
                  set: {
                    isPaid: true,
                    paymentResult: compra.data.status_detail,
                    paymentMethod: compra.data.order.type,
                    paidAt: new Date(),
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

        await transporter.sendMail({
          from: `"inputlatam@gmail.com" <${process.env.CORREO_SECRET}>`, // sender address
          to: [user[0].correo, "daniel.russi@hotmail.com"], // list of receivers
          subject: `inputlatam@gmail.com -> ticket entrada al evento`, // Subject line
          text: "", // plain text body
          html: `
          <b>el siguiente qr se debe mostrar exclusivamente al guardia para poder hacer valida la entrada con qr </b>
          <br />
          <br />
          <br />
          
          `, // html body
        });
      }
    }
    res.status(200).send("OK");
  } catch (error) {
    console.log(error);
  }
});

export default handler;
