import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ProductData } from "../types";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/stores";
import { addProduct } from "../redux/slice/productSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductDataSchema = z.object({
  title: z.string(),
  image: z.string(),
  stock: z
    .number()
    .min(1, { message: "Product stock must be greater than zero" }),
  price: z
    .number()
    .min(1, { message: "Product price must be greater than zero" }),
  description: z.string(),
});

const AddProductPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [productData, setProductData] = useState<ProductData>({
    title: "",
    image: "",
    stock: "",
    price: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { products } = useSelector((state: RootState) => state.products);
  const navigate = useNavigate();
  // useEffect(() => {
  //   console.log(productData);
  // }, [productData]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const validate = ProductDataSchema.safeParse(productData);
      if (!validate.success) {
        console.log(validate.error.issues);
        let newErrors = {};
        validate.error.issues.forEach((error) => {
          newErrors = { ...newErrors, [error.path[0]]: error.message };
        });
        setErrors(newErrors);
      } else {
        dispatch(addProduct({ product: productData }));
        setErrors({});
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log(products);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "stock" || name === "price") {
      setProductData((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
    } else {
      setProductData((state) => ({ ...state, [name]: value }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      setProductData((state) => ({
        ...state,
        image: Array.from(file)[0].name.toString(),
      }));
    }
  };

  return (
    <div className="mx-4">
      <p className="font-bold text-xl mb-4">Add Product</p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col py-4 border border-black border-dashed text-center cursor-pointer">
          <label htmlFor="image" className="text-gray-500">
            {productData.image ? productData.image : "Choose image"}
          </label>
          <input
            id="image"
            type="file"
            name="image"
            onChange={handleFileChange}
            className="border border-black px-4 py-2 hidden"
            accept="image/png, image/jpg, image/jpeg"
          />
          {errors.image && (
            <span className="text-red-500 italic">{errors.image}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="title">Product title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={productData.title}
            onChange={handleInputChange}
            className="border border-black px-4 py-2"
            // required
          />
          {errors.title && (
            <span className="text-red-500 italic">{errors.title}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">description</label>
          <input
            id="description"
            type="text"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            className="border border-black px-4 py-2"
            required
          />
          {errors.description && (
            <span className="text-red-500 italic">{errors.description}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="stock">stock</label>
          <input
            id="stock"
            type="number"
            name="stock"
            value={productData.stock || ""}
            onChange={handleInputChange}
            className="border border-black px-4 py-2"
            min={1}
            required
          />
          {errors.stock && (
            <span className="text-red-500 italic">{errors.stock}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="price">price</label>
          <input
            id="price"
            type="number"
            name="price"
            value={productData.price || ""}
            onChange={handleInputChange}
            className="border border-black px-4 py-2"
            min={1}
            required
          />
          {errors.price && (
            <span className="text-red-500 italic">{errors.price}</span>
          )}
        </div>
        <button type="submit" className="bg-black px-4 py-2 text-white mt-6">
          Send
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
