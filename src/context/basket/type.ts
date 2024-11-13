import { Product } from "../product/type";

export type orderPayload = { id: number; quantity: number };

export interface IBasketContext {
  basket: Product[];
  addToBasket: (product: Product) => void;
  onChangeCountInBasket: (product: Product, count: number) => void;
  onAddNewOrder: () => void;
  basketCount: number;
  showSuccess: boolean;
}
