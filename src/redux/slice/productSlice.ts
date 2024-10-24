import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { enableMapSet } from "immer";
import { Product, ProductData } from "../../types";
import { getProduct } from "../../services/product.services";

enableMapSet();

type ProductState = {
  products: Product[];
};

const initialState: ProductState = {
  products: getProduct() || [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<{ product: ProductData }>) => {
      const { product } = action.payload;
      const id = state.products.length;
      state.products = [
        ...state.products,
        {
          ...product,
          id: id,
          price: Number(product.price),
          stock: Number(product.stock),
        },
      ];
    },
    deleteProduct: (state, action: PayloadAction<{ id: number }>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
    },
    updateProduct: (
      state,
      action: PayloadAction<{ updatedProduct: Product }>
    ) => {
      state.products = state.products.map((product) => {
        if (product.id === action.payload.updatedProduct.id) {
          return action.payload.updatedProduct;
        } else {
          return product;
        }
      });
    },
  },
});

export const { setProducts, addProduct, deleteProduct, updateProduct } =
  productSlice.actions;
export default productSlice.reducer;
