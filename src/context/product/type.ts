export type Product = {
  category: any;
  description: string;
  id: number;
  image: string;
  name: string;
  price: number;
  qty?: number;
};

export type Category = {
  name: string;
  order: number;
};

export interface IProductContext {
  products: Product[];
  categories: Category[];
  pageCount: number;
  productsOfChosenPage: Product[];
  onPageChange?: (newPage: number) => void;
  onChangeCount?: (product: Product, count: number) => void;
  showError: boolean;
  onClear: () => void;
  applyFilter: (selectedCategory: number) => void;
}
