"use client";

import Filters from "@/components/Filters";
import PaginationWrapper from "./components/Pagination";
import ProductList from "./components/ProductList";

const Products = () => {
  return (
    <div>
      <Filters />
      <ProductList />
      <PaginationWrapper />
    </div>
  );
};
export default Products;
