"use client";
import { useProducts } from "@/context/product";
import Grid from "@mui/material/Grid2";
import ProductItem from "./ProductItem";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import useFilter from "@/app/hooks/useFilter";

const ProductList = () => {
  const { productsOfChosenPage, showError } = useProducts();
  const { selectedCategory } = useFilter();

  if (productsOfChosenPage.length === 0 && showError) {
    return (
      <Typography
        sx={{
          py: 2,
          textAlign: "center",
        }}
      >
        OPS something went wrong!
      </Typography>
    );
  }
  return (
    <Grid container rowSpacing={1}>
      {/*  TODO optimize performance */}
      {productsOfChosenPage.map((p) => {
        return <ProductItem key={p.id} p={p} />;
      })}
    </Grid>
  );
};

export default ProductList;
