"use client";
import { useProducts } from "@/context/product";
import styles from "../index.module.scss";
import { Box, Button, IconButton, Typography } from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import IndeterminateCheckBoxRoundedIcon from "@mui/icons-material/IndeterminateCheckBoxRounded";
import Grid from "@mui/material/Grid2";
import { useBasket } from "@/context/basket";
import { Product } from "@/context/product/type";

interface IProps {
  p: Product;
}
const ProductItem = ({ p }: IProps) => {
  const { onChangeCount } = useProducts();
  const { addToBasket, onChangeCountInBasket } = useBasket();
  return (
    <Grid
      key={p.id}
      size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
      className={styles.product}
    >
      <Box>
        <img src={p.image} alt="image" />
      </Box>
      <Typography>{p.name}</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography>£{p.price}</Typography>
        <Typography>{p.category.name}</Typography>
      </Box>
      {p.qty ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            color="secondary"
            onClick={() => {
              if (p.qty) {
                onChangeCount?.(p, p.qty - 1);
                onChangeCountInBasket(p, p.qty - 1);
              }
            }}
          >
            <IndeterminateCheckBoxRoundedIcon />
          </IconButton>
          {p.qty}
          <IconButton
            color="secondary"
            onClick={() => {
              if (p.qty) {
                onChangeCount?.(p, p.qty + 1);
                onChangeCountInBasket(p, p.qty + 1);
              }
            }}
          >
            <AddBoxRoundedIcon />
          </IconButton>
        </Box>
      ) : (
        <Button
          variant="contained"
          fullWidth
          color={"secondary"}
          sx={{ mt: 2 }}
          onClick={() => {
            addToBasket(p);
            onChangeCount?.(p, 1);
          }}
        >
          {/* TODO show loading when adding the product to basket */}
          {/* <CircularProgress size="20px" /> */}
          Add to Basket
        </Button>
      )}
    </Grid>
  );
};
export default ProductItem;
