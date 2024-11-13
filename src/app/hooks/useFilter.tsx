import { useProducts } from "@/context/product";
import { useCallback, useState } from "react";

const useFilter = () => {
  const { applyFilter } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState(0);

  const updateCategory = (category: number) => {
    console.log({ category });
    setSelectedCategory(category);
    applyFilter(category);
  };
  return {
    selectedCategory,
    updateCategory,
  };
};
export default useFilter;
