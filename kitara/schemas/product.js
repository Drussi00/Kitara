export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "priceusd",
      title: "Priceusd",
      type: "number",
    },
    {
      name: "image",
      title: "Image",
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotspot: true,
      },
    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "favorito",
      title: "Favorito",
      type: "string",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
    },
    {
      name: "colecion",
      title: "Colecion",
      type: "string",
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
      name: "materiales",
      title: "Materiales",
      type: "string",
    },
    {
      name: "cantidadmateriales",
      title: "cantidadMateriales",
      type: "string",
    },
    {
      name: "envio",
      title: "envio",
      type: "string",
    },
  ],
};
