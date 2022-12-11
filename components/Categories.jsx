import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import nuddy from "/utils/Images/nuddy.png";
import React from "react";
import classes from "../utils/classes";

export default function Categories() {
  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <div>
      <Box display="flex" sx={classes.productosIndex}>
        <Typography
          sx={{
            fontWeight: "bold",
            fontFamily: " helvetica, sans-serif",
            fontSize: "0.8rem",
          }}
        >
          Envío gratis a todo el país por compras superiores a $200.000
        </Typography>
      </Box>
      <Container justify="center" alignItems="center">
        <Box
          display="flex"
          justifyContent="center"
          textAlign="center"
          sx={{
            flexWrap: "no-wrap",

            width: "100%",
            height: "130px",
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              opacity: ".1",
              zIndex: "-5",
              position: "absolute",
              top: isDesktop ? "13px" : "50px",
              fontSize: isDesktop ? "6rem" : "4rem",

              fontWeight: "400",
              fontStyle: "normal",
            }}
          >
            Essentials
          </Typography>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              position: "relative",
              top: isDesktop ? "15px" : "32px",
              fontSize: isDesktop ? "1.8rem" : "1.2rem",
              fontWeight: "600",
            }}
          >
            Nuddy Minds
          </Typography>
        </Box>
        <Box>
          <Grid container spacing={2} sx={{ justifyContent: "center" }}>
            <Grid item className="nuddyBear">
              <img
                src={nuddy.src}
                style={{
                  display: "flex",

                  width: isDesktop ? "330px" : "100%",
                  height: "518px",
                }}
              />
            </Grid>
            <Grid item md={7}>
              <Grid container spacing={2} sx={{ justifyContent: "center" }}>
                <Grid item>
                  <img
                    src="https://i.etsystatic.com/30139968/c/1981/1581/0/102/il/8d9b27/3121799274/il_340x270.3121799274_8kd9.jpg"
                    style={{
                      width: isDesktop ? "320px" : "334px",
                      height: "250px",
                    }}
                  />
                </Grid>
                <Grid item>
                  <img
                    src="https://i.etsystatic.com/30139968/c/1981/1581/0/102/il/8d9b27/3121799274/il_340x270.3121799274_8kd9.jpg"
                    style={{
                      width: isDesktop ? "320px" : "340px",
                      height: "250px",
                    }}
                  />
                </Grid>
                <Grid item>
                  <img
                    src="https://i.etsystatic.com/30139968/c/1981/1581/0/102/il/8d9b27/3121799274/il_340x270.3121799274_8kd9.jpg"
                    style={{
                      width: isDesktop ? "320px" : "340px",
                      height: "250px",
                    }}
                  />
                </Grid>
                <Grid item>
                  <img
                    src="https://i.etsystatic.com/30139968/c/1981/1581/0/102/il/8d9b27/3121799274/il_340x270.3121799274_8kd9.jpg"
                    style={{
                      width: isDesktop ? "320px" : "340px",
                      height: "250px",
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
