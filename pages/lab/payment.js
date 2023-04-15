import {
    Box,
    Button,
    Container,
    FormControl,
    FormControlLabel,
    List,
    ListItem,
    Radio,
    RadioGroup,
    Typography,
    useMediaQuery,
  } from "@mui/material";
  import jsCookie from "js-cookie";
  import { useRouter } from "next/router";
  import { useSnackbar } from "notistack";
  import React, { useContext, useEffect, useState } from "react";
  import CheckoutWizard from "../../components/CheckoutWizard";
  import Form from "../../components/Form";
  import Layout from "../../components/Layout";
  import { Store } from "../../utils/Store";
  
  export default function PaymentScreen() {
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState("");
    const { state, dispatch } = useContext(Store);
    const {
      cart: { shippingAddress },
      currency: { curre },
    } = state;
  
    useEffect(() => {
      if (!shippingAddress.address) {
        router.push("/shipping");
      } else {
        setPaymentMethod(jsCookie.get("paymentMethod") || "");
      }
    }, [router, shippingAddress]);
  
    const submitHandler = (e) => {
      e.preventDefault();
      if (!paymentMethod) {
        enqueueSnackbar(" Es obligatorio elegir un metodo de pago ", {
          variant: "error",
        });
      } else {
        dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethod });
        jsCookie.set("paymentMethod", paymentMethod);
        router.push("/lab/placeorder");
      }
    };
    const isDesktop = useMediaQuery("(min-width:600px)");
    return (
      <Layout title="Payment Method">
        <Container sx={{ paddingBottom: isDesktop ? "200px" : "150px",mt:13 }}>
          <Box>
            <CheckoutWizard activeStep={2}></CheckoutWizard>
            <Form onSubmit={submitHandler}>
              <Typography
                sx={{ fontWeight: "bold", fontFamily: " coolvetica, sans-serif" }}
                component="h1"
                variant="h1"
              >
                Metodo de pago
              </Typography>
              <List>
                <ListItem>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="Payment Method"
                      name="paymentMethod"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <FormControlLabel
                        sx={{ display: curre === "default" ? "none" : null }}
                        label="PayPal"
                        value="PayPal"
                        control={<Radio />}
                      ></FormControlLabel>
                      <FormControlLabel
                        sx={{ display: curre === "default" ? null : "none" }}
                        label="MercadoPago"
                        value="MercadoPago"
                        control={<Radio />}
                      ></FormControlLabel>
                    </RadioGroup>
                  </FormControl>
                </ListItem>
                <ListItem>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "black",
                      borderRadius: "0 ",
                      "&:hover": {
                        transform: "scale(1,1 1.1)",
                      },
                    }}
                  >
                    Continuar
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    fullWidth
                    type="button"
                    variant="contained"
                    color="secondary"
                    onClick={() => router.push("/shipping")}
                  >
                    Devolverse
                  </Button>
                </ListItem>
              </List>
            </Form>
          </Box>
        </Container>
      </Layout>
    );
  }
  