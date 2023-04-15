import { Box, Button, Typography,useMediaQuery} from "@mui/material";
import logo from "../utils/Images/logo.png";
import React from "react";
import kitara from "../utils/Images/pg3Folder/kitara.png";
import Image from "next/image";
export default function Pagina3() {
  
  const isDesktop = useMediaQuery("(min-width:700px)");
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: isDesktop?"row":"column",
        alignItems: isDesktop?"":"center",
        justifyContent:"space-between",
        zIndex: -5,
        marginTop:isDesktop?"0":"40px"
      }}
    >
      <Box position="relative">
        <div
          style={{
            zIndex: -4,
            position: "absolute",
            height: "300px",
            width: "250px",
            top:"-12%",
            backgroundColor: "rgb(224,95,39)",
          }}
        ></div>
        <img
          style={{
            border: "3px solid white",
            marginLeft:"50px"
          }}
          src={kitara.src}
          height={400}
          width={300}
        />
      </Box>
      <Box sx={{display:"flex",flexDirection:"column", justifyContent:"space-between",alignItems: isDesktop?"":"center",}}>
      <div style={{marginLeft:isDesktop?"50px":0,margin:isDesktop?"0":"30px 0"}}>
          <Image src={logo.src} height={90} width={280} />
        </div>
          <Box sx={{width:"70%",margin:isDesktop?"0":"0px 0 30px",marginLeft:isDesktop?"20%":"0"}}>
          <Typography component="text" sx={{ fontSize: "1rem",margin:"auto" }}>
            texto texto texto texto Texto texto texto texto texto Texto texto
            texto texto texto Texto texto texto texto texto Texto texto texto
            texto texto texto texto texto Texto Texto Texto
          </Typography>
          </Box>
          <Button
          sx={{
            backgroundColor: "transparent",
            border: "2px solid black ",
            borderRadius: "0",
            p: "12px 30px",
            color: "black",
            marginRight:isDesktop?"12%":0,
            alignSelf:isDesktop?"self-end":"center"
          }}
        >
          MAS SOBRE LA MARCA
        </Button>

       
      </Box>
    </Box>
  );
}
