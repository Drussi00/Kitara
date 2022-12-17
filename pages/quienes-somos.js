import { Box, Container, Typography } from "@mui/material";
import React from "react";
import LayoutSomos from "../components/LayoutSomos";
import Build from "../utils/Images/Build-Image1.png";
import Office from "../utils/Images/office.png";
import DosChicas from "../utils/Images/dos-chicas.png";

const QuienesSomos = () => {
  return (
    <LayoutSomos>
      <Box style={{ width: "40%", maxWidth: "100%" }}>
        <h2
          style={{
            marginTop: "180px",
            fontSize: "30px",
            marginLeft: "5%",
            fontWeight: "bold",
          }}
        >
          NUESTRA MARCA
        </h2>
        <p
          style={{
            marginTop: "30px",
            fontSize: "20px",
            marginLeft: "5%",
            fontWeight: 400,
          }}
        >
          Texto texto texto texto texto Texto texto texto texto texto Texto
          texto texto texto texto Texto texto texto texto texto Texto texto
          texto texto texto texto texto texto Texto texto texto texto texto
          Texto texto texto texto texto texto texto texto texto Texto texto
          texto texto texto Texto texto texto texto texto texto texto texto
          texto Texto texto texto texto texto Texto texto texto texto texto
        </p>
      </Box>
      <Box className="d-flex flex-row-reverse">
        <Box style={{ width: "40%", marginTop: "-145px", marginRight: "60px" }}>
          <h2
            style={{
              marginTop: "30px",
              marginBottom: "20px",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            NUESTRA INSPIRACIÓN
          </h2>
          <div className="d-flex flex-row">
            <div className="w-50">
              <img src={Build.src} className="w-100" />
              <h4 className="text-center">Title</h4>
              <p className="text-center">
                texto Texto texto texto texto texto texto texto texto
              </p>
            </div>
            <div className="w-50 ps-3">
              <img
                src={Office.src}
                className="w-100"
                style={{ height: "100%" }}
              />
            </div>
          </div>
          <p
            style={{
              marginTop: "30px",
              fontSize: "20px",
              marginLeft: "5%",
              fontWeight: 400,
              textAlign: "end",
            }}
          >
            Texto texto texto texto texto Texto texto texto texto texto Texto
            texto texto texto texto Texto texto texto texto texto Texto texto
            texto texto texto texto texto texto Texto texto texto texto texto
            Texto texto texto texto texto
          </p>
        </Box>
      </Box>
      <Box className="d-flex flex-row">
        <Box style={{ width: "40%", marginTop: "-145px", marginLeft: "5%" }}>
          <h2
            style={{
              marginTop: "30px",
              marginBottom: "20px",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            NUESTRA INSPIRACIÓN
          </h2>
          <p
            style={{
              marginTop: "30px",
              fontSize: "20px",
              fontWeight: 400,
            }}
          >
            Texto texto texto texto texto Texto texto texto texto texto Texto
            texto texto texto texto Texto texto texto texto texto Texto texto
            texto texto texto texto texto texto Texto texto texto texto texto
            Texto texto texto texto texto
          </p>
          <div className="d-flex flex-row">
            <div className="w-50">
              <img src={Build.src} className="w-100" />
              <h4 className="text-center">Title</h4>
              <p className="text-center">
                texto Texto texto texto texto texto texto texto texto
              </p>
            </div>
            <div className="w-50 ps-3">
              <img
                src={Office.src}
                className="w-100"
                style={{ height: "100%" }}
              />
            </div>
          </div>
        </Box>
      </Box>
      <Box className="d-flex flex-row-reverse" sx={{mb:"160px"}}>
        <img src={DosChicas.src} style={{width:"20%",marginRight: "5%",marginTop:"-160px"}}/>
      </Box>
    </LayoutSomos>
  );
};

export default QuienesSomos;
