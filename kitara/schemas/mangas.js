export default {
    name: "mangas",
    title: "Mangas",
    type: "document",
    fields: [
      {
        name: "name",
        title: "Name",
        type: "string",
        required: true,
      },
      {
        name: "color",
        title: "Color",
        type: "string",
        required: true,
      },
      {
        name: "price",
        title: "Price",
        type: "number",
        required: true,
      },
      {
        name: "priceusd",
        title: "Priceusd",
        type: "number",
        required: true,
      },
      {
        name: "image",
        title: "Image",
        type: "image",
        options: {
          hotspot: true,
        },
        required: true,
      },
      {
        name: "horientacion",
        title: "Horientacion",
        type: "string",
        options: {
          list: [
            { title: "Derecha", value: "derecha" },
            { title: "Izquierda", value: "izquierda" },
          ],
        },
        required: true,
      },
      {
        name: "tipo",
        title: "Tipo",
        type: "string",
        options: {
          list: [
            { title: "Iconic", value: "iconic" },
            { title: "Mariposa", value: "mariposa" },
          ],
        },
        required: true,
      },
    ],
  };