"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IBasketContext, orderPayload } from "./type";
import { Product } from "../product/type";
import { addNewOrder, purchaseOrder } from "@/api/orders";
import { useProducts } from "../product";

const BasketContext = createContext<IBasketContext>({
  basket: [],
  addToBasket: () => {},
  onChangeCountInBasket: () => {},
  onAddNewOrder: () => {},
  basketCount: 0,
  showSuccess: false,
});

interface Props {
  children?: ReactNode;
}

export function BasketContextProvider({ children }: Props) {
  const [basket, setBasket] = useState<Product[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const { onClear } = useProducts();

  const basketCount: number = useMemo(() => {
    return basket.reduce((acc, b) => {
      if (b.qty) return acc + b.qty;
      return acc;
    }, 0);
  }, [basket]);

  const addToBasket = (product: Product) => {
    setBasket([...basket, { ...product, qty: 1 }]);
  };

  const onChangeCountInBasket = (product: Product, count: number) => {
    setBasket(
      basket.map((p) => {
        if (p.id === product.id) return { ...product, qty: count };
        return p;
      })
    );
  };

  const onAddNewOrder = async () => {
    const payload: orderPayload[] = basket.map((item) => {
      return {
        id: item.id,
        quantity: item.qty || 0,
      };
    });
    try {
      const orderResposne = await addNewOrder({ products: payload });
      if (orderResposne.id) {
        const result = await purchaseOrder(orderResposne.id);
        console.log("in here");
        setShowSuccess(true);
        setBasket([]);
        onClear();
        setTimeout(() => {
          setShowSuccess(false);
        }, 2000);
      }
    } catch (err) {
      // TODO handle error by showing a toast
      console.log(err);
    }
  };

  return (
    <BasketContext.Provider
      value={{
        basket,
        addToBasket,
        onChangeCountInBasket,
        onAddNewOrder,
        basketCount,
        showSuccess,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}

export const useBasket = () => useContext(BasketContext);
