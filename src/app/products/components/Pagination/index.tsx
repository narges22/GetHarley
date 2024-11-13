"use client";
import { useProducts } from "@/context/product";
import { Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";

const PaginationWrapper = () => {
  const { pageCount, onPageChange } = useProducts();
  const onChange = (event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange?.(page);
  };
  if (!pageCount || pageCount === 0) return null;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        py: 5,
      }}
    >
      <Pagination count={pageCount} color="primary" onChange={onChange} />
    </Box>
  );
};
export default PaginationWrapper;
