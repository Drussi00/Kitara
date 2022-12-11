import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import { useForm, Controller } from "react-hook-form";
import NextLink from "next/link";
import Form from "../components/Form";
import {
  Box,
  Button,
  Container,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useSnackbar } from "notistack";
import axios from "axios";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";
import jsCookie from "js-cookie";
import { getError } from "../utils/error";
////////////////////////////////////////////////////////////////

export default function LoginScreen() {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();
  const { redirect } = router.query;
  useEffect(() => {
    if (userInfo) {
      router.push(redirect || "/");
    }
  }, [router, userInfo, redirect]);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { enqueueSnackbar } = useSnackbar();
  const submitHandler = async ({ email, password }) => {
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      dispatch({ type: "USER_LOGIN", payload: data });
      jsCookie.set("userInfo", JSON.stringify(data));
      router.push(redirect || "/");
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
  const isDesktop = useMediaQuery("(min-width:600px)");
  return (
    <Layout title="Login">
      <Container>
        <Box sx={{ paddingBottom: isDesktop ? "220px" : "200px" }}>
          {" "}
          <Form onSubmit={handleSubmit(submitHandler)}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontFamily: " coolvetica, sans-serif",
                fontSize: "2rem",
              }}
              component="h1"
              variant="h1"
            >
              Iniciar Sesion
            </Typography>
            <List>
              <ListItem>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="email"
                      label="Email"
                      inputProps={{ type: "email" }}
                      error={Boolean(errors.email)}
                      helperText={
                        errors.email
                          ? errors.email.type === "pattern"
                            ? "El email no es valido"
                            : "El email es obligatorio"
                          : ""
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 6,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="password"
                      label="Contraseña"
                      inputProps={{ type: "password" }}
                      error={Boolean(errors.password)}
                      helperText={
                        errors.password
                          ? errors.password.type === "minLength"
                            ? "La contraseña debe tener mas de 5 caracteres"
                            : "Contraseña requerida"
                          : ""
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{
                    backgroundColor: "black",
                    borderRadius: "0 ",

                    "&:hover": {
                      transform: "scale(1, 1.1)",
                      backgroundColor: "black",
                    },
                  }}
                >
                  Iniciar Sesion
                </Button>
              </ListItem>
              <ListItem>
                ¿Todavia no tienes una cuenta?
                <NextLink
                  href={`/register?redirect=${redirect || "/"}`}
                  passHref
                >
                  <Link
                    sx={{
                      paddingLeft: "10px",
                      color: "black",
                      "&:hover": {
                        color: "black",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Registrate
                  </Link>
                </NextLink>
              </ListItem>
            </List>
          </Form>
        </Box>
      </Container>
    </Layout>
  );
}
