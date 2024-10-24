export type Product = {
  id: number;
  title: string;
  image: string;
  stock: number;
  price: number;
  description: string;
};

export type ProductData = Omit<Product, "id" | "stock" | "price"> & {
  stock: string | null;
  price: string | null;
};
