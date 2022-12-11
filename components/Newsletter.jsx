import {
  Box,
  Button,
  List,
  ListItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { useSnackbar } from "notistack";
const Newsletter = () => {
  const { enqueueSnackbar } = useSnackbar();
  const isDesktop = useMediaQuery("(min-width:600px)");
  const [email, setEmail] = useState("");
  const [checked, setchecked] = useState(true);

  useEffect(() => {
    const emailInput = document.getElementById("newsletter");

    emailInput.disabled = checked;
    return () => {};
  }, [checked]);

  const subscribe = async () => {
    try {
      const response = await axios.post("/api/newsletter", { email });
      console.log(response);
    } catch (err) {
      console.log(err.response);
      enqueueSnackbar("No se ha podido subir tu aplicacion revisa tu correo ", {
        variant: "error",
      });
    }
  };
  return (
    <Box
      display="flex"
      justifyContent={"center"}
      sx={{ backgroundColor: "#f1f1f1", paddingBottom: "30px" }}
    >
      <List sx={{ width: "100%" }}>
        <ListItem sx={{ justifyContent: "center" }}>
          <Typography
            component="h1"
            variant="h1"
            sx={{ fontWeight: "bold", fontSize: "2rem" }}
          >
            Newsletter
          </Typography>
        </ListItem>
        <ListItem sx={{ justifyContent: "center" }}>
          <Typography
            component=""
            variant="text"
            sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
          >
            ¡Mantente actualizado sobre lanzamientos limitados, noticias,
            eventos!
          </Typography>
        </ListItem>
        <ListItem sx={{ justifyContent: "center" }}>
          <div
            className="input-group"
            style={{ width: isDesktop ? "40%" : "100%" }}
          >
            <input
              style={{ borderRadius: "0" }}
              onClick={() =>
                checked
                  ? enqueueSnackbar(
                      "Debes aceptar los terminos y condiciones primero",
                      {
                        variant: "error",
                      }
                    )
                  : null
              }
              id="newsletter"
              type="text"
              className="form-control"
              placeholder="Agrega tu correo 
              electrónico "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <span className="input-group-btn">
              <Button
                className="btn bottomH1"
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "0",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                    transform: "scale(1.1, 1.1)",
                  },
                }}
                type="button"
                onClick={(e) => {
                  subscribe(e), setEmail("");
                }}
              >
                Suscríbete
              </Button>
            </span>
          </div>
        </ListItem>
        <ListItem
          sx={{
            justifyContent: "center",
            width: isDesktop ? "50%" : "100%",
            margin: "auto",
          }}
        >
          <Checkbox
            onClick={() => {
              setchecked(!checked);
            }}
            sx={{
              "& .MuiSvgIcon-root": { fontSize: 28 },
              marginLeft: isDesktop ? "56px" : 0,
            }}
          />
          <div style={{ height: "40px", width: isDesktop ? "1400px" : null }}>
            <div style={{ height: "40px", width: isDesktop ? "90%" : null }}>
              <Typography
                sx={{
                  fontSize: isDesktop ? "0.7rem " : "0.9px",
                }}
                align="right"
              >
                Sí, me gustaría recibir newsletters de Nuddy Minds. Al
                registrarme en el boletín, acepto la información de protección
                de datos de Nuddy Minds y doy mi consentimiento para la
                recopilación, el almacenamiento y el procesamiento de datos allí
                descritos.
              </Typography>
            </div>
          </div>
        </ListItem>
      </List>
    </Box>
  );
};

export default Newsletter;
