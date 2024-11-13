"use client";
import { useBasket } from "@/context/basket";
import Grid from "@mui/material/Grid2";
import ProductItem from "../products/components/ProductList/ProductItem";
import {
  Box,
  Button,
  Snackbar,
  SnackbarContent,
  Typography,
} from "@mui/material";
import Link from "next/link";
import styles from "./index.module.scss";

const Basket = () => {
  const { basket, onAddNewOrder, showSuccess } = useBasket();

  console.log({ showSuccess });
  if (showSuccess) {
    const action = (
      <Button variant="text" color="secondary" size="small">
        <Link href="/products">continue shopping</Link>
      </Button>
    );
    return (
      <Box sx={{ py: 5 }}>
        <SnackbarContent
          className={styles.successSnack}
          message="Your order was successfully purchased."
          // severity="success"
          action={action}
        />
      </Box>
    );
  }

  if (basket.length === 0) {
    return (
      <Typography
        sx={{
          py: 5,
          display: "flex",
          justifyContent: "center",
        }}
        className={styles.empty}
      >
        Basket is empty <Link href="/products">back to products</Link>
      </Typography>
    );
  }

  return (
    <Grid container rowSpacing={1}>
      {basket.map((item) => {
        return <ProductItem key={item.id} p={item} />;
      })}
      {basket.length > 0 && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" color="secondary" onClick={onAddNewOrder}>
            Confirm and purchase{" "}
          </Button>
        </Box>
      )}
    </Grid>
  );
};
export default Basket;
