export default {
    name: "capota",
    title: "Capota",
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
            title: "Chaleco",
            name: "chaleco",
            type: "reference",
            to: [{ type: "chaleco" }],
            options: {
              disableNew: true,
            },
          },
      ],
    };