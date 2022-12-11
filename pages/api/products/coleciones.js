import nc from "next-connect";

const handler = nc();

handler.get(async (req, res) => {
  const colecciones = ["The rise of nuddy", "The Resort", "Nueva colecion"];
  res.send(colecciones);
});

export default handler;
