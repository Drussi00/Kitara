export default {
    name: "chaleco",
    title: "Chaleco",
    type: "document",
    fields: [
      {
        name: "name",
        title: "Name",
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
        name: "color",
        title: "Color",
        type: "string",
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
        name: "xs",
        title: "XS",
        type: "number",
      },
      {
        name: "s",
        title: "S",
        type: "number",
      },
      {
        name: "m",
        title: "M",
        type: "number",
      },
      {
        name: "l",
        title: "L",
        type: "number",
      },
      {
        name: "xl",
        title: "XL",
        type: "number",
      },
    ],
  };