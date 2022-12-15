import { Box, Button, Typography } from "@mui/material";
import logo from "../utils/Images/logo.png";
import React from "react";
import kitara from "../utils/Images/pg3Folder/kitara.png";
import Image from "next/image";
export default function Pagina3() {
  return (
    <Box
      sx={{
        position: "relative",

        height: "50vh",
        zIndex: -5,
      }}
    >
      <div
        style={{
          zIndex: -4,
          position: "absolute",
          height: "300px",
          width: "250px",
          backgroundColor: "rgb(224,95,39)",
        }}
      ></div>
      <img
        position="absolute"
        top="8%"
        style={{
          position: "absolute",
          top: "5%",
          left: "6%",
          border: "3px solid white",
        }}
        src={kitara.src}
        height={400}
        width={300}
      />
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: "40%",
        }}
      >
        <Image src={logo.src} height={90} width={280} />
      </div>
      <div
        style={{
          height: "100%",
          width: "100%",
          zIndex: "100%",
          paddingLeft: "600px",
          paddingTop: "200px",
          paddingRight: "50px",
        }}
      >
        <Typography component="text" sx={{ fontSize: "1rem" }}>
          texto texto texto texto Texto texto texto texto texto Texto texto
          texto texto texto Texto texto texto texto texto Texto texto texto
          texto texto texto texto texto Texto Texto Texto
        </Typography>
      </div>

      <Button
        sx={{
          right: "10%",
          bottom: "20%",
          zIndex: "100%",
          position: "absolute",
          backgroundColor: "transparent",
          border: "2px solid black ",
          borderRadius: "0",
          p: "12px 30px",
          color: "black",
        }}
      >
        MAS SOBRE LA MARCA
      </Button>
    </Box>
  );
}
