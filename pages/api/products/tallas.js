import axios from "axios";
import nc from "next-connect";
import config from "../../../utils/config";

const handler = nc();

handler.put(async (req, res) => {
  const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;
  try {
    await axios.post(
      `https://${config.projectId}.api.sanity.io/v1/data/mutate/${config.dataset}`,
      {
        mutations: [
          {
            patch: {
              id: req.body.unitario._key,

              set: {
                xs: req.body.tallaXS,
                s: req.body.tallaS,
                m: req.body.tallaM,
                l: req.body.tallaL,
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
    res.status(200);
  } catch (error) {
    res.status(400);
  }
});

export default handler;
