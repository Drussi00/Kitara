export default {
    name: "extensiones",
    title: "Extensiones",
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
      }
    ],
  };