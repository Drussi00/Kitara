import nc from "next-connect";

const handler = nc();

handler.get(async (req, res) => {
  const categories = ["Shop All", "Hoodies", "T-Shirt", "Longs"];
  res.send(categories);
});

export default handler;
