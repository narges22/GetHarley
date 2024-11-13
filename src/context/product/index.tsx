"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Category, IProductContext, Product } from "./type";
import { getCategories, getProducts } from "@/api/products";
import useFilter from "@/app/hooks/useFilter";

const ProductContext = createContext<IProductContext>({
  products: [],
  categories: [],
  pageCount: 0,
  productsOfChosenPage: [],
  showError: false,
  onClear: () => {},
  applyFilter: () => {},
});

interface Props {
  children?: ReactNode;
}

export function ProductContextProvider({ children }: Props) {
  const itemPerPage = 12;
  const [products, setProducts] = useState<Product[]>([]);
  // TODO seperate the filter context and add the categories there
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState<number>(1);
  const [showError, setShowError] = useState<boolean>(false);

  const pageCount = useMemo(() => {
    return products.length / 10;
  }, [products]);

  const productsOfChosenPage = useMemo(() => {
    return products.slice((page - 1) * itemPerPage, page * itemPerPage);
  }, [products, page]);

  const applyFilter = (selectedCategory: number) => {
    const originalList = localStorage.getItem("products");
    if (originalList && selectedCategory > 0) {
      const originalproductsList: Product[] = JSON.parse(originalList);
      const filteredProducts = originalproductsList.filter(
        (p) => p.category.order === selectedCategory
      );
      setProducts(filteredProducts);
    }
  };

  useEffect(() => {
    getProducts()
      .then((res) => {
        setShowError(false);
        setProducts(res);
        localStorage.setItem("products", JSON.stringify(res));
      })
      .catch((err) => {
        setShowError(true);
      });
    getCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  const onClear = () => {
    setProducts(
      products.map((item) => ({
        ...item,
        qty: 0,
      }))
    );
  };

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  const onChangeCount = (product: Product, count: number) => {
    // TODO  update the original product list qty in case of a category is selected
    setProducts(
      products.map((p) => {
        if (p.id === product.id) return { ...product, qty: count };
        return p;
      })
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        pageCount,
        productsOfChosenPage,
        onPageChange,
        onChangeCount,
        applyFilter,
        showError,
        onClear,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
