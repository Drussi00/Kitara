import { Box, Typography } from "@mui/material";
import React from "react";

export const Footer = () => {
  return (
    <Box component="footer" margin="30px 0" padding="0 30px" id="footer">
      <Typography
        sx={{ textAlign: "center", margin: "auto" }}
        component="h3"
        fontSize={20}
        width="300px"
      >
        SUSCRIBETE A NUESTRO BOLETIN DE NOTICIAS
      </Typography>
      <Box
        display="flex"
        flexDirection="row"
        marginTop="30px"
        flexWrap="wrap"
        className="center-flex-mobile"
      >
        <Box
          display="flex"
          flexDirection="column"
          width="30%"
          minWidth="250px"
          className="center-flex-mobile  w-100-mobile"
        >
          <Typography component="h4" className="text-mobile-center">
            @KITARASTUDIO_
          </Typography>
          <Typography
            component="a"
            marginTop={2}
            className="link-Style-none text-mobile-center"
          >
            Contacto
          </Typography>
          <Typography
            component="a"
            marginTop={2}
            className="link-Style-none text-mobile-center"
          >
            About
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          width="40%"
          textAlign="center"
          paddingX={5}
          minWidth="339px"
          className="center-flex-mobile  w-100-mobile"
        >
          <form
            style={{
              marginBottom: "10px",
              display: "flex",
              justifyContent: "center",
            }}
            className="mt-mobile"
          >
            <input
              type="email"
              className="input-registration"
              placeholder="Direccion de correo Electronico"
              style={{ fontSize: "14px" }}
            />
            <button className="btn btn-dark button-boostrap-modified-borders">
              SUSCRIBIRSE
            </button>
          </form>
          <Typography component="p" width="80%" margin="auto">
            Promociones, nuevos productos y ofertas. Directamente a tu bandeja
            de entrada
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          width="30%"
          flexWrap="wrap"
          className="center-flex-mobile w-100-mobile"
        >
          <Box
            display="flex"
            flexDirection="column"
            width="50%"
            minWidth="200px"
          >
            <Typography component="h4" className="text-mobile-center mt-mobile">
              SERVICIOS
            </Typography>
            <Typography
              component="a"
              marginTop={2}
              className="link-Style-none text-mobile-center"
            >
              Detalles del producto
            </Typography>
            <Typography
              component="a"
              marginTop={2}
              className="link-Style-none text-mobile-center"
            >
              Size Guide
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            width="50%"
            minWidth="200px"
          >
            <Typography component="h4" className="text-mobile-center mt-tablet">
              POLITICAS
            </Typography>
            <Typography
              component="a"
              marginTop={2}
              className="link-Style-none text-mobile-center"
            >
              Termino y Condiciones
            </Typography>
            <Typography
              component="a"
              marginTop={2}
              className="link-Style-none text-mobile-center"
            >
              Privacy Politcy
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
