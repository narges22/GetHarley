"use client";
import { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useProducts } from "@/context/product";
import useFilter from "@/app/hooks/useFilter";

const Filters = () => {
  const { categories } = useProducts();
  const { selectedCategory, updateCategory } = useFilter();
  const onCategoryChange = (e: any) => {
    updateCategory(e.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, p: 3 }}>
      <FormControl fullWidth>
        <InputLabel id="categories_label">Catgories</InputLabel>
        <Select
          labelId="categories_label"
          id="category select"
          value={selectedCategory}
          label="Age"
          onChange={onCategoryChange}
        >
          <MenuItem key={`zero`} value={0}>
            All
          </MenuItem>
          {categories.map((item) => {
            return (
              <MenuItem key={`${item.order}`} value={item.order}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filters;
